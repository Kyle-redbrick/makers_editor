import React from "react";
import {useState, useEffect} from "react";
import {FormattedMessage, injectIntl, useIntl} from "react-intl";
import * as request from "../../../Common/Util/HTTPRequest";
import PopUp, {showPopUp} from "../../../Common/Component/PopUp";
import "./index.scss";

const Contact = props => {
  return (
    <div className="contact">
      <div className="contact__inner">
        <div className="contact__info">
          <h3 className="contact__title">
            <FormattedMessage id="ID_INTRO_CONTACT_TITLE" />
          </h3>
          <p className="contact__child-title">
            <FormattedMessage id="ID_INTRO_CONTACT_CHILD_TITLE" />
          </p>
        </div>

        <div className="contact__form">
          <div className="contact__from-inner">
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(Contact);

const Form = () => {
  const intl = useIntl();
  const onClickLink = type => {};

  const onClickSubmit = async () => {
    const params = "";
    const res = await request.sendContact(params);
    if (res) {
      showPopUp(
        <PopUp.OneButton
          title={
            res.success
              ? intl.formatMessage({id: "ID_INTRO_CONTACT_2_SUCCESS"})
              : res.reason
          }
          buttonName={"OK"}
        />,
        {darkmode: true},
      );
    }
  };
  return (
    <div className="contact_form">
      <SelectBox
        num={1}
        title="Subject"
        list={["Registration", "Project Features", "Partnership", "Other"]}
      />
      <div className="contact_form_row">
        <InputText num={2} title="First Name" />
        <InputText num={3} title="E-mail" />
      </div>
      <div className="contact_form_row">
        <InputText num={4} title="Phone Number" />
        <InputText num={5} title="Institution/Organization" />
      </div>
      <SelectBox
        num={6}
        title="How did you find ‘Astro Coding Go!’?"
        list={[
          "Print Flyer",
          "E-mail Marketing",
          "Internet Search",
          "Online Ads",
          "Referral",
          "Other (please specify)",
        ]}
      />
      <TextArea num={7} title="Inquiry" />
      <label htmlFor="agree" className="contact_checkbox">
        <input type="checkbox" id="agree" />I agree to the{" "}
        <span onClick={() => onClickLink("term")}>Terms of Use</span> and{" "}
        <span onClick={() => onClickLink("policy")}>Privacy Policy</span>
      </label>
      <button
        className={`contact_submit_btn ${false ? "active" : ""}`}
        type="submit"
        onClick={onClickSubmit}
      >
        Send Message
      </button>
    </div>
  );
};

const TitleArea = ({num, title}) => {
  return (
    <p className="contact_title">
      {num}. {title}
    </p>
  );
};

const SelectBox = ({num, title, list}) => {
  return (
    <div>
      <TitleArea num={num} title={title} />
      <div className="contact_select_list">
        {list.map(item => (
          <label key={item} htmlFor={item} className="contact_select_label">
            <input type="radio" id={item} name={title} value={item} />
            {item}
            <span className="contact_select_check_mark" />
          </label>
        ))}
      </div>
    </div>
  );
};

const InputText = ({num, title}) => {
  return (
    <div className="contact_form_input">
      <TitleArea num={num} title={title} />
      <input className="contact_input" type="text" />
    </div>
  );
};

const TextArea = ({num, title}) => {
  return (
    <div>
      <TitleArea num={num} title={title} />
      <textarea className="contact_textarea" />
    </div>
  );
};

/* TODO 첫번째 form */
// const FormFirst = ({
//   institutionName,
//   setInstitutionName,
//   setEnrollStudentsNum,
//   setInquery,
//   setViewIndex,
//   viewIndex,
// }) => {
//   const [enableBtn, setEnableBtn] = useState(false);

//   const onChange = e => {
//     const {value, id} = e.target;

//     switch (id) {
//       case "institutionName":
//         setInstitutionName(value);
//         if (institutionName.length > 0) {
//           setEnableBtn(true);
//         } else {
//           setEnableBtn(false);
//         }
//         break;
//       case "enrollStudents":
//         setEnrollStudentsNum(value);
//         break;
//       case "note":
//         setInquery(value);
//         break;
//       default:
//         break;
//     }
//   };

//   const onClickNextBtn = () => {
//     setViewIndex(2);
//   };

//   return (
//     <>
//       <div className="contact__form-sort">
//         {[1, 2].map(id => (
//           <span
//             key={id}
//             className={`contact__from-sort-list ${
//               viewIndex === id ? "active" : ""
//             }`}
//           >
//             {id}
//           </span>
//         ))}
//       </div>

//       <div className="contact__form-input-box">
//         <div className="contact__form-content">
//           <span className="contact__form-input-title required">
//             <FormattedMessage id="ID_INTRO_CONTACT_1_INSTITUTION_NAME" />
//           </span>
//           <input
//             id="institutionName"
//             type="text"
//             className="contact__form-input"
//             maxLength="50"
//             onChange={onChange}
//           />
//         </div>

//         <div className="contact__form-content">
//           <span className="contact__form-input-title">
//             <FormattedMessage id="ID_INTRO_CONTACT_1_STUDENTS_COUNT" />
//           </span>
//           <input
//             id="enrollStudents"
//             type="text"
//             className="contact__form-input"
//             maxLength="50"
//             onChange={onChange}
//           />
//         </div>

//         <div className="contact__form-content">
//           <span className="contact__form-input-title">
//             <FormattedMessage id="ID_INTRO_CONTACT_1_NOTE" />
//           </span>
//           <textarea
//             id="note"
//             className="contact__form-textarea"
//             maxLength="1500"
//             onChange={onChange}
//           />
//         </div>
//       </div>

//       <div className="contact__form-bottom">
//         {/* TODO 활성화 시 클래스 active 추가 */}
//         <button
//           type="button"
//           className={`contact__from-next ${enableBtn ? "active" : ""}`}
//           onClick={onClickNextBtn}
//         >
//           <FormattedMessage id="ID_INTRO_CONTACT_BUTTON_NEXT" />
//         </button>
//       </div>
//     </>
//   );
// };

// /* TODO 두번째 form */
// const FormSecond = ({
//   institutionName,
//   enrollStudents,
//   note,
//   intl,
//   setViewIndex,
// }) => {
//   const [openDropdown, setOpenDropdown] = useState(false);
//   const [enableBtn, setEnableBtn] = useState(false);
//   let countryCode = localStorage.getItem("lang") == "ja" ? "+81" : "+1";

//   const [params, setParams] = useState({
//     institutionName: institutionName,
//     enrollStudents: enrollStudents,
//     note: note,
//     familyName: "",
//     givenName: "",
//     title: intl.formatMessage({id: "ID_INTRO_CONTACT_2_SELECT"}),
//     phone: "",
//     email: "",
//   });

//   useEffect(() => {
//     if (
//       params.familyName.length > 1 &&
//       params.givenName.length > 1 &&
//       params.phone.length > 5 &&
//       params.email.length > 5 &&
//       params.title !== "Select"
//     ) {
//       setEnableBtn(true);
//     } else {
//       setEnableBtn(false);
//     }
//   }, [params]);

//   const onClickBtns = async id => {
//     switch (id) {
//       case "backBtn":
//         setViewIndex(1);
//         break;
//       case "sendBtn":

//         break;
//       default:
//         break;
//     }
//   };

//   const onClickDropdown = () => {
//     setOpenDropdown(!openDropdown);
//   };

//   const onclickDropdown = item => {
//     setParams(params => ({...params, title: item}));
//   };

//   const onChange = e => {
//     const {value, id} = e.target;

//     switch (id) {
//       case "familyName":
//         setParams(params => ({...params, familyName: value}));
//         break;
//       case "givenName":
//         setParams(params => ({...params, givenName: value}));
//         break;
//       case "phone":
//         setParams(params => ({...params, phone: countryCode + value}));
//         break;
//       case "email":
//         setParams(params => ({...params, email: value}));
//         break;
//       default:
//         break;
//     }
//   };

//   const onChangeCountryCode = countryCode => {
//     countryCode = countryCode;
//   };

//   return (
//     <>
//       <div className="contact__form-sort">
//         <span className="contact__from-sort-list">1</span>
//         <span className="contact__from-sort-list active">2</span>
//       </div>

//       <div className="contact__form-input-box">
//         <div className="contact__form-flex-box contact__form-flex-box--name">
//           <div className="contact__form-content contact__form-content--name">
//             <span className="contact__form-input-title required">
//               <FormattedMessage id="ID_INTRO_CONTACT_2_FIRST_NAME" />
//             </span>
//             <input
//               id="familyName"
//               type="text"
//               className="contact__form-input"
//               maxLength="50"
//               onChange={onChange}
//             />
//           </div>

//           <div className="contact__form-content contact__form-content--name">
//             <span className="contact__form-input-title required">
//               <FormattedMessage id="ID_INTRO_CONTACT_2_LAST_NAME" />
//             </span>
//             <input
//               id="givenName"
//               type="text"
//               className="contact__form-input"
//               maxLength="50"
//               onChange={onChange}
//             />
//           </div>
//         </div>

//         <div className="contact__form-content" onClick={onClickDropdown}>
//           <span className="contact__form-input-title required">
//             <FormattedMessage id="ID_INTRO_CONTACT_2_TITLE" />
//           </span>
//           <div className="contact__form-select">
//             <span className="contact__form-select-title">
//               {params.title}
//               <img alt="펼쳐보기 아이콘" src={DownArrowIcon} />
//             </span>

//             <div
//               className={
//                 "contact__form-select-dropdown" + (openDropdown ? " on" : "")
//               }
//             >
//               <ul className="contact__form-select-dropdown-list">
//                 <li
//                   className="contact__form-select-dropdown-item"
//                   onClick={() =>
//                     onclickDropdown(
//                       intl.formatMessage({
//                         id: "ID_INTRO_CONTACT_2_TEACHER",
//                       }),
//                     )
//                   }
//                 >
//                   <FormattedMessage id="ID_INTRO_CONTACT_2_TEACHER" />
//                 </li>
//                 <li
//                   className="contact__form-select-dropdown-item"
//                   onClick={() =>
//                     onclickDropdown(
//                       intl.formatMessage({
//                         id: "ID_INTRO_CONTACT_2_ADMINISTRATOR",
//                       }),
//                     )
//                   }
//                 >
//                   <FormattedMessage id="ID_INTRO_CONTACT_2_ADMINISTRATOR" />
//                 </li>
//                 <li
//                   className="contact__form-select-dropdown-item"
//                   onClick={() =>
//                     onclickDropdown(
//                       intl.formatMessage({
//                         id: "ID_INTRO_CONTACT_2_TECHNOLOGY",
//                       }),
//                     )
//                   }
//                 >
//                   <FormattedMessage id="ID_INTRO_CONTACT_2_TECHNOLOGY" />
//                 </li>
//                 <li
//                   className="contact__form-select-dropdown-item"
//                   onClick={() =>
//                     onclickDropdown(
//                       intl.formatMessage({
//                         id: "ID_INTRO_CONTACT_2_OTHER",
//                       }),
//                     )
//                   }
//                 >
//                   <FormattedMessage id="ID_INTRO_CONTACT_2_OTHER" />
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         <div className="contact__form-content">
//           <span className="contact__form-input-title required">
//             <FormattedMessage id="ID_INTRO_CONTACT_2_PHONE_NUMBER" />
//           </span>
//           <div className="contact__from-select-input">
//             <PhoneDropDown
//               countryCode={countryCode}
//               handleSelectItem={onChangeCountryCode}
//               handleInputChange={onChange}
//             />
//           </div>
//         </div>

//         <div className="contact__form-content contact__form-content--name">
//           <span className="contact__form-input-title required">
//             <FormattedMessage id="ID_INTRO_CONTACT_2_EMAIL" />
//           </span>
//           <input
//             id="email"
//             type="text"
//             className="contact__form-input"
//             maxLength="50"
//             onChange={onChange}
//           />
//         </div>

//         <div className="contact__form-bottom contact__form-bottom--flex">
//           <button
//             type="button"
//             className="contact__form-back"
//             onClick={() => onClickBtns("backBtn")}
//           >
//             <img alt="뒤로가기 버튼" src={BackIcon} />
//             <FormattedMessage id="ID_INTRO_CONTACT_BUTTON_BACK" />
//           </button>
//           <button
//             type="button"
//             className={`contact__from-send-btn ${enableBtn ? "active" : ""}`}
//             onClick={() => onClickBtns("sendBtn")}
//           >
//             <FormattedMessage id="ID_INTRO_CONTACT_BUTTON_SEND" />
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };
