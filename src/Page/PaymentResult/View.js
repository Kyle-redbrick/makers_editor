import React from "react";
import moment from "moment";
import { injectIntl } from "react-intl";
import "./index.scss";
import Layout from "../../Common/Component/Layout";

function View(props) {
  const {
    apkTicket,
    onClickBuyTicket,
    ticketHistories,
    intl,
    onClickMyApkPage
  } = props;
  return (
    <Layout>
      <div className="Page--PaymentResult">
        <div className="paymentResult">
          <div className="paymentResult_header">
            <div className="paymentResult_header_title">
              {intl.formatMessage({ id: "ID_PAYMENT_RESULT_TITLE" })}
            </div>
            <div className="paymentResult_myApk" onClick={onClickMyApkPage}>
              {intl.formatMessage({ id: "ID_PAYMENT_APK_BTN" })}
            </div>
          </div>
          <section>
            <div className="paymentResult_header_ticketCount">
              {intl.formatMessage({ id: "ID_PAYMENT_APK_TICKET" })} <span>{apkTicket}{intl.formatMessage({ id: "ID_PAYMENT_APK_UNIT" })}</span>
            </div>
            <button
              className="paymentResult_header_buyTicketBtn"
              onClick={onClickBuyTicket}
            >
              {intl.formatMessage({ id: "ID_PAYMENT_APK_BUY_TICKET" })}
            </button>
          </section>

          <div className="paymentResult_ticketHistories">
            {ticketHistories.length ? (
              ticketHistories.map((ticketHistory, index) => {
                if (ticketHistory.type === "add") {
                  return (
                    <div className="paymentResult_ticketHistory" key={index}>
                      <div className="paymentResult_ticketHistory_type paymentResult_ticketHistory_type-add">
                        {intl.formatMessage({ id: "ID_PAYMENT_APK_BUY_BTN" })}
                      </div>
                      <div className="paymentResult_ticketHistory_title">
                        {intl.formatMessage({ id: "ID_PAYMENT_APK_TICKET" })} <span>{ticketHistory.tickets}{intl.formatMessage({ id: "ID_PAYMENT_APK_UNIT" })}</span>
                        <div className="paymentResult_ticketHistory_date">
                          {moment(ticketHistory.createdAt).format(
                            "YYYY-MM-DD HH:mm"
                          )}
                        </div>
                      </div>
                      <div class="paymentResult_ticketHistory_right">
                        <div className="paymentResult_ticketHistory_amount">
                          {intl.formatNumber(ticketHistory.amount)}
                        </div>
                        <div className="paymentResult_ticketHistory_tickets">
                          {`+ ${ticketHistory.tickets}`}
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="paymentResult_ticketHistory" key={index}>
                      <div className="paymentResult_ticketHistory_type paymentResult_ticketHistory_type-use">
                        {intl.formatMessage({ id: "ID_PAYMENT_APK_TICKET_USE_BTN" })}
                      </div>
                      <div className="paymentResult_ticketHistory_title">
                        "{ticketHistory.appName}" {intl.formatMessage({ id: "ID_PAYMENT_APK_MAKE_BTN" })}
                        <div className="paymentResult_ticketHistory_date">
                          {moment(ticketHistory.createdAt).format(
                            "YYYY-MM-DD HH:mm"
                          )}
                        </div>
                      </div>
                      <div class="paymentResult_ticketHistory_right">
                        <div className={`paymentResult_ticketHistory_amount `}>
                          <div
                            className={`amount__${ticketHistory.type}`}
                          ></div>
                        </div>
                        <div className="paymentResult_ticketHistory_tickets">
                          - 1
                        </div>
                      </div>
                    </div>
                  );
                }
              })
            ) : (
              <div className="history__not__exist">
                {intl.formatMessage({ id: "ID_PAYMENT_APK_DEFALT_MSG" })}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default injectIntl(View);