import React from "react";
import "./index.scss";
import Layout from "../../Common/Component/Layout";
import minusImg from "../../Image/minus.svg";
import plusImg from "../../Image/plus.svg";
import kakaoImg from "../../Image/kakaopay@2x.png";
import { CircleCheckbox } from "../../Common/Component/Checkbox";
import SquareCheckbox from "../../Common/Component/Checkbox/SquareCheckbox";
export default function View(props) {
  const {
    onClickPayment,
    onClickPayMethod,
    payMethod,
    name,
    phone,
    email,
    onChangeInput,
    onClickProductCnt,
    onClickPromotionCode,
    productCnt,
    product,
    promotionCode,
    finalPrice,
    promotionCodeId,
    name_warning,
    email_warning,
    phone_warning,
    agreement01_warning,
    agreement02_warning,
    promotionCode_warning,
    discountPrice,
    intl
  } = props;
  return (
    <Layout>
      <div className="Page--Payment">
        <div className="payment__inner">
          <div className="product__title"> [APK 제작 쿠폰] 구매</div>
          <div className="payment__paragraph payment__paragraph--product">
            {product && (
              <div className="product__item">
                <div className="item__left left__coupon">
                  <div className="item__title">apk 수량</div>
                  <div className="item__count">
                    <img
                      className={`count__minus count__minus__${productCnt > 1 &&
                        "white"}`}
                      onClick={() => {
                        onClickProductCnt(productCnt - 1);
                      }}
                      alt="minus"
                      src={minusImg}
                    />

                    <div className="count__number"> {productCnt}</div>
                    <img
                      className="count__plus"
                      onClick={() => {
                        onClickProductCnt(productCnt + 1);
                      }}
                      alt="plus"
                      src={plusImg}
                    />
                  </div>
                </div>
                <div className=" item__title item__price">
                  {intl.formatNumber(product.price * productCnt)}원
                </div>
              </div>
            )}

            <div className="product__item item__promotion">
              <div className="item__left left__promotion">
                <div className=" item__title title__promotion">
                  프로모션 코드
                </div>
                <div className="promotion__code">
                  <input
                    className={`payment__input input__warning__${
                      promotionCode_warning ? "on" : "off"
                    }  input__promotion`}
                    type="text"
                    id="promotionCode"
                    value={promotionCode}
                    onChange={onChangeInput}
                    autoComplete="off"
                    disabled={promotionCodeId ? true : false}
                  />
                  {promotionCode_warning && (
                    <div className="warning__title warning__title--promotion">
                      {promotionCode_warning}
                    </div>
                  )}
                  <div
                    className="promotion__btn"
                    onClick={() => {
                      onClickPromotionCode();
                    }}
                  >
                    {promotionCodeId ? "취소" : "확인"}
                  </div>
                </div>
              </div>
              <div className=" item__title  item__price">
                - {intl.formatNumber(discountPrice)}원
              </div>
            </div>

            <div className="product__item">
              <div className="item__left">
                <div className=" item__title price">결제 예정 금액</div>
              </div>
              <div className=" item__title price  item__price">
                {intl.formatNumber(finalPrice)} 원
              </div>
            </div>
          </div>

          <h3 className="subtitle">결제자 정보 </h3>
          <div className="payment__paragraph">
            <div className={`payment__input--row`}>
              <div className=" item__title">
                결제자명<span>*</span>
              </div>
              <input
                className={`payment__input input__warning__${
                  name_warning ? "on" : "off"
                }`}
                type="text"
                id="name"
                value={name}
                onChange={onChangeInput}
                autoComplete="off"
              />
              {name_warning && (
                <div className="warning__title">{name_warning}</div>
              )}
            </div>

            <div className={`payment__input--row`}>
              <div className=" item__title">
                휴대폰 번호<span>*</span>
              </div>

              <input
                className={`payment__input input__warning__${
                  phone_warning ? "on" : "off"
                }`}
                type="tel"
                id="phone"
                value={phone}
                onChange={onChangeInput}
                autoComplete="off"
              />
              {phone_warning && (
                <div className="warning__title">{phone_warning}</div>
              )}
            </div>
            <div className={`payment__input--row`}>
              <div className=" item__title">
                이메일<span>*</span>
              </div>
              <input
                className={`payment__input input__warning__${
                  email_warning ? "on" : "off"
                }`}
                type="text"
                id="email"
                value={email}
                onChange={onChangeInput}
                autoComplete="off"
              />
              {email_warning && (
                <div className="warning__title">{email_warning}</div>
              )}
            </div>
          </div>

          <h3 className="subtitle">결제 방법 </h3>
          <div className="payment__paragraph">
            <div className="payment__method">
              <div className=" item__title">일반결제</div>
              <div className="radio__wrapper">
                <CircleCheckbox
                  value={"card"}
                  name={"paymentmethod"}
                  handleChange={onClickPayMethod}
                  isRadioBtn={true}
                  checked={payMethod === "card"}
                />
                <div className="method__text"> 신용카드</div>
              </div>
            </div>
            <div className="payment__method">
              <div className=" item__title">간편 결제</div>
              <div className="radio__wrapper">
                <CircleCheckbox
                  value={"kakaopay"}
                  name={"paymentmethod"}
                  handleChange={onClickPayMethod}
                  isRadioBtn={true}
                  checked={payMethod === "kakaopay"}
                />
                <div className="method__text">
                  <img className="method__img" src={kakaoImg} alt="method" />
                </div>
              </div>
            </div>
          </div>

          <h3 className="subtitle">이용약관 동의</h3>
          <div className="payment__paragraph payment__paragraph--terms">
            <div>
              <div className="terms__title">
                위즈랩 APK 제작 쿠폰 이용약관 동의(필수)
              </div>
              <textarea
                className="terms__textarea"
                readOnly={true}
                value={`
위즈랩 APK 쿠폰은 위즈랩에서 만든 앱을 안드로이드 설치파일(APK)로 제작하는 서비스를 이용하는데 사용합니다. 

위즈랩 APK 제작하여 외부로 보내는 경우, 이에 대한 책임은 제작자 본인에게 있습니다. 

위즈랩 운영방침과 어긋나는 APP을 제작하여 유통한 경우에는 언제든지 위즈랩 및 APK 이용이 불가능할 수 있습니다. 

1) 실정법에 위배되는 불법 콘텐츠 및 청소년과 어린이에게 유해한 내용을 담은 매체
① 유흥 알선, 포르노, 애인 대행, 성인 용품 판매 등 성인 대상 콘텐츠를 제공하는 매체
② 웹하드 및 P2P다운로드, 아이템거래 매체
③ 도박, 카지노, 경마 등과 같은 사행성 매체
④ 전자상거래 금지 품목 매체 (불법 의약품, 총기 및 도검류, 담배, 주류 등)
⑤ 사금융, 다단계, 흥신소, 심부름센터 매체
⑥ 명품 이미테이션 판매, 거래 매체
⑦ 다이어트식품, 건강식품, 의약품 판매 매체
⑧ 복권 판매 매체
⑨ 문신 매체
⑩ 기타 불법 행위를 조장하거나 타인의 법적 권리를 침해하는 콘텐츠를 제공하는 매체

2) 저작권을 침해 할 수 있는 자료를 이용한 매체
① 음원, TV, 영화 콘텐츠 등을 저작권자의 허락 없이 이용하고 배포하는 경우
② 개발자가 직접 개발한 콘텐츠가 아닌 포털(웹툰, 블로그, 카페 등), 언론, 정부 기관, 타인의 콘텐츠 등을 저작권자의 허락 없이 이용하고 배포하는 경우
③ 그 외 현재 공포 된 저작권법에 위배는 경우
④ 단, 아래와 같은 사항일 경우 예외로 게재 처리 가능하나, 게재 후 콘텐츠 변질 또는 사법기관 및 저작권자 요청 접수 시 콘텐츠에 제재를 받으실 수 있습니다.  
* 저작권자로부터 승인된 이용 허가서를 제출하는 경우
* 전체 음원, 영상이 아닌 샘플 듣기, 예고 등의 일부 편집본 일 경우
* 무료 이용, 배포가 가능한 콘텐츠 일 경우
* 매체 내 제공이 아닌 외부 링크 연결을 통해 이용에 도움을 주는 경우


4. 사용한 쿠폰에 대해서는 환불이 되지 않습니다. 사용하지 않은 쿠폰에 대해서는 구매한지 3개월 이내에만 환불이 가능합니다. 환불은 wizlab@wizschool.io 로 요청해주시기 바랍니다. 

5. 이용약관은 당사 사정에 따라 변경될 수 있습니다. 
`}
                rows={10}
              />
              <div className="terms__checkbox__wrapper">
                <div className="terms__checkbox">
                  <div>
                    <SquareCheckbox
                      id={"agreement01"}
                      handleChange={onChangeInput}
                    />

                    <div className="terms_text">
                      위 내용을 모두 확인하였습니다.
                    </div>
                  </div>
                </div>
                {agreement01_warning && (
                  <div className="warning__title warning__title--agreement">
                    {agreement01_warning}
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="terms__title">
                개인정보 수집 및 이용 동의(필수)
              </div>
              <textarea
                className="terms__textarea"
                readOnly={true}
                value={`
서비스 제공을 위해서 필요한 최소한의 개인정보입니다. 동의를 해주셔야 서비스를 이용하실 수 있으며, 동의하시지 않을 경우 서비스에 제한이 있을 수 있습니다.
- 개인정보 수집 내용 : 대금 결제/환불 서비스 제공, 주문/거래 내역 조회 서비스 제공, 전자상거래법 준수 등
- 수집이용목적 수집 항목 : 신용카드 정보, 계좌 정보, 주문/거래
- 보유기간 : 내역고객님의 개인정보는 서비스를 제공하는 기간 동안 보유 및 이용하며, 개인정보의 수집 및 이용목적이 달성되면 지체없이 파기합니다. 다만, 관계법령의 규정 및 내부지침에 의하여 고객님의 개인정보를 보관할 필요성이 있는 경우에는 아래와 같이 고객님의 개인정보를 보관할 수 있으며, 이 경우 해당 개인정보는 보관의 목적으로만 이용합니다.

※결제수단에 따른 개인정보 수집 및 이용 항목이 상이할 수 있음
              `}
                rows={10}
              />
              <div className="terms__checkbox__wrapper">
                <div className="terms__checkbox">
                  <div>
                    <SquareCheckbox
                      id={"agreement02"}
                      handleChange={onChangeInput}
                    />

                    <div className="terms_text">
                      위 내용을 모두 확인하였습니다.
                    </div>
                  </div>
                </div>
                {agreement02_warning && (
                  <div className="warning__title warning__title--agreement">
                    {agreement02_warning}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={"onSubmitBtn"} onClick={onClickPayment}>
            총 {intl.formatNumber(finalPrice)} 원 결제
          </div>
          {/* {submit_warning && <div>{submit_warning}</div>} */}
        </div>
      </div>
    </Layout>
  );
}
