import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { injectIntl } from "react-intl";
import * as userInfoActions from "../../Common/Store/Reducer/UserInfo";
import * as request from "../../Common/Util/HTTPRequest";
import { URL } from "../../Common/Util/Constant";
import View from "./View";
import PopUp, { showPopUp } from "../../Common/Component/PopUp";

class Container extends Component {
  constructor(props) {
    super(props);

    this.inputValid = {
      name_warning: "",
      email_warning: "",
      phone_warning: "",
      agreement01_warning: "",
      agreement02_warning: "",
      promotionCode_warning: "",
      submit_warning: ""
    };
    this.state = {
      ...this.inputValid,
      name: "",
      phone: this.props.userinfo.phone,
      email: this.props.email,
      agreement01: false,
      agreement02: false,
      payMethod: "card",
      promotionCode: "",
      promotionCodeId: undefined,
      productCnt: 1,
      product: {},
      discountAmount: 0,
      discountRate: 0,
      finalPrice: 0,
      discountPrice: 0
    };
  }
  componentDidMount = async () => {
    if (!this.props.email) {
      this.props.history.push("/");
      return;
    }
    await this.fetchApkproduct();
    this.setState({
      finalPrice: this.calculatePrice()
    });
  };

  componentDidUpdate = prevProps => {
    if (this.props.email && !prevProps.email) {
      this.onLogin();
    }
    if (!this.props.email) {
      this.onLogout();
    }
  };
  onLogin = () => {
    this.setState({
      phone: this.props.userinfo.phone,
      email: this.props.email
    });
  };

  onLogout = () => {
    this.props.history.push("/");
  };
  fetchApkproduct = async () => {
    let res = await request.getProducts({ type: "apk" });
    let fetchedData = await res.json();
    this.setState({ product: fetchedData[0] });
  };
  onClickPayment = async () => {
    const {
      name,
      phone,
      email,
      product,
      productCnt,
      finalPrice,
      payMethod,
      promotionCodeId,
      agreement01,
      agreement02
    } = this.state;

    let params = {
      type: product.type,
      pay_method: payMethod,
      productId: product.id,
      amount: finalPrice,
      merchant_uid: email + "_" + new Date().getTime(),
      information: JSON.stringify({ tickets: productCnt }),
      isMarketingAgreement: false,
      email,
      buyerName: name,
      buyerPhone: phone,
      promotionCodeId
    };

    if (!this.confirmOfRequired()) {
      let warning = {};
      if (!name) {
        warning.name_warning = "두글자 이상 입력하세요.";
      }
      if (!email) {
        warning.email_warning = "이메일 형식을 확인하세요.";
      }
      if (!phone) {
        warning.phone_warning = "휴대폰 번호를 확인하세요.";
      }

      if (!agreement01) {
        warning.agreement01_warning = "이용 약관에 동의해주세요.";
      }

      if (!agreement02) {
        warning.agreement02_warning = "이용 약관에 동의해주세요.";
      }
      this.setState(warning);
      showPopUp(
        <PopUp.OneButton
          title={"필수입력사항을 확인해주세요"}
          buttonName={"확인"}
        />
      );
      return;
    }

    this.onSubmitPayment({ ...params, pg: this.getPgByPayMethod() });
  };
  confirmOfRequired = () => {
    const {
      name_warning,
      email_warning,
      phone_warning,
      agreement01_warning,
      agreement02_warning,
      name,
      phone,
      email,
      agreement01,
      agreement02
    } = this.state;

    if (
      !name_warning &&
      !email_warning &&
      !phone_warning &&
      !agreement01_warning &&
      !agreement02_warning &&
      name &&
      phone &&
      email &&
      agreement01 &&
      agreement02
    ) {
      this.setState({ submit_warning: "" });
      return true;
    } else {
      return false;
    }
  };
  getPgByPayMethod = () => {
    return this.state.payMethod === "card"
      ? "html5_inicis.MOIwizscho"
      : "kakaopay";
  };
  onSubmitPayment = async params => {
    const response = await request.addPayment(params);
    const payment = await response.json();
    /* TODO : try catch */
    if (!payment) return;
    this.requestIamport(payment, params);
  };
  fetchPromotionCode = async () => {
    const { promotionCode, product } = this.state;
    const res = await request.checkPromotionCodeValid({
      code: promotionCode,
      productId: product.id
    });
    const fetchedData = await res.json();
    return fetchedData;
  };
  onClickPromotionCode = async () => {
    if (this.state.promotionCodeId) {
      this.setState(
        {
          promotionCodeId: undefined,
          discountAmount: 0,
          discountRate: 0,
          promotionCode: ""
        },
        () => {
          this.setState({ finalPrice: this.calculatePrice() });
        }
      );
      return;
    }
    const data = await this.fetchPromotionCode();
    if (!data.success) {
      let message = "";
      switch (data.message) {
        case "notExist":
          message = "존재하지 않는 프로모션 코드 입니다.";
          break;
        case "rangeError":
          message = "현재 상품에서 사용할 수 없는 프로모션 코드 입니다.";
          break;
        case "alreadyUsed":
          message = "이미 사용한 프로모션 코드 입니다.";
          break;
        default:
          break;
      }
      this.setState({ promotionCode_warning: message });
    } else {
      if (data.promotionCode.discountRate) {
        this.setState({
          discountRate: data.promotionCode.discountRate / 100
        });
      } else {
        this.setState({
          discountAmount: data.promotionCode.discountAmount
        });
      }
      this.setState({
        promotionCode_warning: "",
        promotionCodeId: data.promotionCode.code,
        finalPrice: this.calculatePrice()
      });
    }
  };
  calculatePrice = () => {
    const { product, productCnt, discountRate, discountAmount } = this.state;

    this.setState({
      discountPrice: this.discountPrice()
    });
    if (discountRate > 0 || discountAmount > 0) {
      return product.price * productCnt - this.discountPrice();
    } else {
      return product.price * productCnt;
    }
  };

  discountPrice = () => {
    const { product, productCnt, discountRate, discountAmount } = this.state;
    if (discountRate > 0 || discountAmount > 0) {
      return discountRate > 0
        ? product.price * discountRate * productCnt
        : discountAmount;
    } else {
      return 0;
    }
  };
  requestIamport = (payment, params) => {
    const { name, phone, email, product } = this.state;
    params = {
      ...params,
      name: product.name,
      buyer_tel: phone,
      buyer_email: email,
      buyer_name: name,
      m_redirect_url: URL.ORIGIN + `payment/result`,
      notice_url: URL.API_SERVER + `payment/iamportNotification`
    };

    const IMP = window.IMP;
    IMP.init("imp90978512");
    IMP.request_pay(params, async rsp => {
      if (rsp.success) {
        this.props.updateUserInfo({
          apkTicket: this.props.userinfo.apkTicket + this.state.productCnt
        });
        setTimeout(() => {
          this.props.history.replace("/payment/result");
        }, 1000);
      } else {
        await request.cancelPayment({ id: payment.id }, () => {
          setTimeout(() => {
            this.props.history.replace("/payment/result");
          }, 1000);
        });
      }
    });
  };
  onClickPayMethod = e => {
    this.setState({ payMethod: e.target.value });
  };
  onClickProductCnt = number => {
    if (number > 0) {
      this.setState(
        {
          productCnt: number
        },
        () => {
          this.setState({ finalPrice: this.calculatePrice() });
        }
      );
    }
  };
  onChangeInput = e => {
    let { id, value, checked } = e.target;
    value = value.replace(" ", "");
    if (id === "agreement01" || id === "agreement02") {
      this.setState({ [id]: checked }, () => {
        this.checkInputValid(id, checked);
      });
    } else {
      this.setState({ [id]: value }, () => {
        this.checkInputValid(id, value);
      });
    }
  };
  /* input valid check */
  checkInputValid = (id, value) => {
    switch (id) {
      case "name":
        if (this.isNameValid() || value === "") {
          this.setState({ name_warning: "" });
        } else {
          this.setState({ name_warning: "두글자 이상 입력하세요." });
        }

        break;
      case "email":
        if (this.isEmailValid() || value === "") {
          this.setState({ email_warning: "" });
        } else {
          this.setState({ email_warning: "이메일 형식을 확인하세요." });
        }
        break;
      case "phone":
        if (this.isPhoneValid() || value === "") {
          this.setState({ phone_warning: "" });
        } else {
          this.setState({ phone_warning: "휴대폰 번호를 확인하세요." });
        }

        break;
      case "agreement01":
        if (value) {
          this.setState({ agreement01_warning: "" });
        } else {
          this.setState({ agreement01_warning: "이용 약관에 동의해주세요." });
        }
        break;
      case "agreement02":
        if (value) {
          this.setState({ agreement02_warning: "" });
        } else {
          this.setState({ agreement02_warning: "이용 약관에 동의해주세요." });
        }
        break;
      case "promotionCode":
        if (!value) {
          this.setState({ promotionCode_warning: "" });
        }
        break;
      default:
        break;
    }
  };
  isEmailValid = () => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(this.state.email);
  };
  isNameValid = () => {
    return this.state.name.length >= 2;
  };
  isPhoneValid = () => {
    return this.state.phone.length >= 8;
  };

  render() {
    const {
      onClickPayment,
      onClickPayMethod,
      onClickProductCnt,
      onChangeInput,
      onClickPromotionCode
    } = this;
    const {
      payMethod,
      name,
      phone,
      email,
      promotionCode,
      productCnt,
      product,
      name_warning,
      email_warning,
      phone_warning,
      agreement01_warning,
      agreement02_warning,
      promotionCode_warning,
      submit_warning,
      discountAmount,
      discountRate,
      finalPrice,
      promotionCodeId,
      discountPrice
    } = this.state;
    return (
      <View
        onClickPayment={onClickPayment}
        onClickPayMethod={onClickPayMethod}
        payMethod={payMethod}
        name={name}
        phone={phone}
        email={email}
        promotionCode={promotionCode}
        productCnt={productCnt}
        product={product}
        onClickProductCnt={onClickProductCnt}
        onChangeInput={onChangeInput}
        name_warning={name_warning}
        email_warning={email_warning}
        phone_warning={phone_warning}
        agreement01_warning={agreement01_warning}
        agreement02_warning={agreement02_warning}
        promotionCode_warning={promotionCode_warning}
        submit_warning={submit_warning}
        discountAmount={discountAmount}
        discountRate={discountRate}
        finalPrice={finalPrice}
        onClickPromotionCode={onClickPromotionCode}
        promotionCodeId={promotionCodeId}
        discountPrice={discountPrice}
        intl={this.props.intl}
      />
    );
  }
}

export default connect(
  state => ({ email: state.userinfo.email, userinfo: state.userinfo }),
  {
    updateUserInfo: userInfoActions.updateUserInfo
  }
)(injectIntl(withRouter(Container)));
