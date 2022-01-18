import React from "react";
import moment from "moment";
import Layout from "../../Common/Component/Layout";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import "./index.scss";

export default function View(props) {
  const { events } = props;

  return (
    <Layout>
      <div className="Page--Event">
        <div className="Event_Inner">
          <div className="Event_Title">
            <FormattedMessage id="ID_EVENT_TITLE" />
          </div>
          <section className="Event_ItemSec">
          <div className="Event_ItemSec-item">
            {events.map((event, index) => (
              <EventItem event={event} key={index} />
            ))}
            {events.length === 0 && (
              <p className="noEventText"><FormattedMessage id="ID_EMPTY_EVENT" /></p>
            )}
          </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

const EventItem = props => {
  const { event } = props;
  return (
    <Link className="EventItem" to={`/event/${event.id}`}>
      <div className="EventItem_Img_Wrapper">
        <img src={event.thumbnail.toDreamclassS3URL()} alt="img" />
      </div>
      <div className="EventItem_Wrap">
        <div className="EventItem_Wrap-title">{event.title}</div>
        <div className="EventItem_Wrap_DateWrap">
          {`${moment(event.startAt).format("YYYY.MM.DD")} ~ ${moment(event.endAt).format("MM.DD")}`}
        </div>
      </div>
      <div className="EventItem_Wrap-category">{event.category}</div>
    </Link>
  );
};
