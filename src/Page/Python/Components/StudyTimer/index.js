import React, { Component } from "react";
import * as request from "../../../../Common/Util/HTTPRequest";
import PageStatus from "../../../../Common/Util/PageStatus";

class StudyTimer extends Component {
  
  onChangePageStatus = status => {
    if(status.willClose) {
      const studiedMinutes =
        this.props.studiedMinutes
        + Math.round(status.duration / 1000 / 60);
      this.saveStudiedMinutes(studiedMinutes);
    }
  }

  saveStudiedMinutes(minutes) {
    if(minutes) {
      this.save({ studiedMinutes: minutes });
    }
  }
  save(values) {
    request
      .saveMyDreamProject(this.props.myProjectId, values)
      .then(res => res.json())
      .then(json => {
        if(!json.success) {
          throw json;
        }
      })
      .catch(console.error);
  }

  render() {
    return <PageStatus onChange={this.onChangePageStatus} />;
  }
}

export default StudyTimer