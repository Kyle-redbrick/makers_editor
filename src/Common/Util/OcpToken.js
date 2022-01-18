import moment from "moment";
import * as request from "./HTTPRequest";

export const addOcpUser = async (email, grade, type) => {
  // (빌더에서, 1 단계 일때만 실행 ,없으면 발급 , 이메일/게스트 아이디 없으면 user table에 추가 , myocp 테이블에 해당 grade 컬럼 생성  )
  let guest =
    localStorage.getItem("ocpId") && JSON.parse(localStorage.getItem("ocpId"));
  let params = {};

  if (email) params.email = email;
  if (guest) params.guestId = guest.id;

  let res = await request.addOcpUser2(params);
  let json = await res.json();
  if (json && json.guestId) {
    let token = {
      id: json.guestId,
      expire: moment()
        .local()
        .add(3, "hours")
        .format()
    };
    localStorage.setItem("ocpId", JSON.stringify(token));
  }
  await request.addMyOcp2(
    email ? { email, grade, type } : { guestId: json.guestId, grade, type }
  );
};

export const updateOcpToken = () => {
  let guest =
    localStorage.getItem("ocpId") && JSON.parse(localStorage.getItem("ocpId"));

  if (guest) {
    if (moment().local() > moment(guest.expire)) {
      localStorage.removeItem("ocpId");
    } else {
      localStorage.setItem(
        "ocpId",
        JSON.stringify({
          ...guest,
          expire: moment()
            .local()
            .add(3, "hours")
            .format()
        })
      );
    }
  }
};

export const updateOcpTokenToEmail = async email => {
  let guest =
    localStorage.getItem("ocpId") && JSON.parse(localStorage.getItem("ocpId"));
  if (email && guest) {
    await request.updateMyOcpSync2({
      email: email,
      guestId: guest.id
    });
    localStorage.removeItem("ocpId");
  }
};

export const resetOcpToken = () => {
  localStorage.removeItem("ocpId");
};
