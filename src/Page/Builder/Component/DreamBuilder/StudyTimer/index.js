import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as request from "../../../../../Common/Util/HTTPRequest";
import PageStatus from "../../../../../Common/Util/PageStatus";
import * as dreamActions from "../../../Store/Reducer/dream";

class StudyTimer extends Component {
  
  onChangePageStatus = status => {
    if(status.willClose) {
      const studiedMinutes =
        this.props.myProject.studiedMinutes
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
    const { id: myDreamLectureProjectId } = this.props.match.params;
    request
      .saveMyDreamProject(myDreamLectureProjectId, values)
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

export default connect(
  state => ({ myProject: state.dream.myProject }),
  { updateMyDreamProject: dreamActions.updateMyDreamProject }
)(withRouter(StudyTimer));
