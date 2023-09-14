import React, { Component } from "react";
import * as request from "../../../Common/Util/HTTPRequest";
import "./index.scss";

class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      selectedElement: null,
      unfolded: this.defaultUnfolded,
    };
  }

  componentDidMount() {
    this.loadSelectedElement();
    this.loadUnfolded();
    this.loadSaasCourses();
  }

  loadSaasCourses() {
    request
      .getSaasAllCourse()
      .then((res) => res.json())
      .then((courses) => {
        this.setState({ courses: courses.data.courseList });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ courses: [] });
      });
  }

  onClickRefresh = () => {
    this.loadSaasCourses();
  };

  onClickCouseAdd = () => {
    const param = {
      locale: "ko",
      title: "새로운 코스가 생성되었습니다.",
      thumbnailURL: "https://google.com",
      description: "test",
    };
    request
      .getNewCourse(param)
      .then((res) => res.json())
      .then((json) => console.log("json", json))
      .then(this.onClickRefresh());
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedElement !== this.state.selectedElement) {
      this.onChangeSelectedElement();
    }
    if (
      JSON.stringify(prevState.unfolded) !== JSON.stringify(this.state.unfolded)
    ) {
      this.onChangeUnfolded();
    }
  }

  onChangeSelectedElement() {
    if (this.props.onChangeSelectedElement) {
      this.props.onChangeSelectedElement(this.state.selectedElement);
    }
    this.saveSelectedElement();
  }

  saveSelectedElement() {
    if (this.state.selectedElement) {
      const { type, id } = this.state.selectedElement;
      localStorage.setItem(
        "dreamEditorSelectedElement",
        JSON.stringify({ type, id })
      );
    } else {
      localStorage.removeItem("dreamEditorSelectedElement");
    }
  }

  loadSelectedElement() {
    let selectedElement;
    try {
      selectedElement = JSON.parse(
        localStorage.getItem("dreamEditorSelectedElement")
      );
    } catch (err) {
      selectedElement = null;
    }
    this.setState({ selectedElement });
  }

  onChangeUnfolded() {
    this.saveUnfolded();
  }

  saveUnfolded() {
    localStorage.setItem(
      "dreamEditorUnfolded",
      JSON.stringify(this.state.unfolded)
    );
  }

  loadUnfolded() {
    let unfolded;
    try {
      unfolded =
        JSON.parse(localStorage.getItem("dreamEditorUnfolded")) ||
        this.defaultUnfolded;
    } catch (err) {
      unfolded = this.defaultUnfolded;
    }
    this.setState({ unfolded });
  }
  get defaultUnfolded() {
    return { courseIds: [], lectureIds: [] };
  }

  get list() {
    const list = [];

    const { courses = [] } = this.state;
    for (let course of courses) {
      const courseElement = this.createElement("course", course);
      list.push(courseElement);
      if (courseElement.isFolded) continue;

      for (let lecture of course.courseLessonMappings || []) {
        const lectureElement = this.createElement("lecture", lecture);
        list.push(lectureElement);
      }
    }

    return list;
  }

  createElement(type, data) {
    return {
      type,
      data,
      isSelected: this.isElementSelected(type, data),
      isFolded: this.isElementFolded(type, data),
    };
  }

  isElementSelected(type, data) {
    return (
      this.state.selectedElement &&
      type === this.state.selectedElement.type &&
      this.state.selectedElement.id === (data.id || data.lesson.id)
    );
  }

  isElementFolded(type, data) {
    switch (type) {
      case "course":
        return !this.unfoldedCourseIds.includes(data.id);
      case "lecture":
        return !this.unfoldedLectureIds.includes(data.id);
      default:
        return true;
    }
  }
  get unfoldedCourseIds() {
    return this.state.unfolded.courseIds;
  }
  get unfoldedLectureIds() {
    return this.state.unfolded.lectureIds;
  }

  onClickElement = (element) => {
    if (element === this.state.selectedElement) {
      this.setState({ selectedElement: null });
    } else {
      this.setState({
        selectedElement: {
          type: element.type,
          id: element.data.id || element.data.lesson.id,
          data: element.data,
        },
      });
    }
  };

  onClickElementFold = (element) => {
    switch (element.type) {
      case "course":
        const courseIds = [...this.unfoldedCourseIds];
        const courseIdIndex = courseIds.indexOf(element.data.id);
        if (courseIdIndex >= 0) {
          courseIds.splice(courseIdIndex, 1);
        } else {
          courseIds.push(element.data.id);
        }
        this.setState((prevState) => ({
          unfolded: { ...prevState.unfolded, courseIds },
        }));
        break;
      case "lecture":
        const lectureIds = [...this.unfoldedLectureIds];
        const lectureIdIndex = lectureIds.indexOf(element.data.id);
        if (lectureIdIndex >= 0) {
          lectureIds.splice(lectureIdIndex, 1);
        } else {
          lectureIds.push(element.data.id);
        }
        this.setState((prevState) => ({
          unfolded: { ...prevState.unfolded, lectureIds },
        }));
        break;
      default:
        break;
    }
  };

  onClickElementAdd = (element) => {
    switch (element.type) {
      case "course":
        const courseId = element.data.id;
        const newLessonOrder = element.data.courseLessonMappings.length;
        this.addLecture(courseId, newLessonOrder);

        this.saveSelectedElement(courseId);
        break;

      default:
        break;
    }
  };

  onClickElementDelete = (element) => {
    const confirmed = window.confirm("정말 삭제하시겠어요?");
    if (!confirmed) return;

    switch (element.type) {
      case "lecture":
        const lectureId = element.data.id;
        this.deleteLecture(lectureId);
        break;

      default:
        break;
    }
  };

  addLecture(courseId, newLessonOrder) {
    const order = newLessonOrder;
    request
      .addLecture()
      .then((res) => res.json())
      .then((json) =>
        request
          .connectCourseAndLecture({
            courseId,
            lessonId: json.data.lessonInfo.id,
            order,
          })
          .then((res) => res.json())
          .then((json) => {
            localStorage.setItem(
              "dreamEditorSelectedElement",
              JSON.stringify({ type: "lecture", id: json.mappingInfo.lessonId })
            );
            this.setState({
              selectedElement: {
                type: "lecture",
                id: json.mappingInfo.lessonId,
              },
            });
          })
      )
      .then(() => {
        this.loadSaasCourses();
      })
      .catch((err) => {
        console.error(err);
        window.alert(JSON.stringify(err));
      });
  }

  deleteLecture(lectureId) {
    request
      .deleteDreamLecture(lectureId)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          this.setState((prevState) => {
            for (let course of prevState.courses) {
              const index = course.courseLessonMappings.findIndex(
                (lecture) => lecture.id === lectureId
              );
              if (index >= 0) {
                course.courseLessonMappings.splice(index, 1);
              }
            }
            return true;
          });
        } else {
          throw json;
        }
      })
      .catch((err) => {
        console.error(err);
        window.alert(JSON.stringify(err));
      });
  }

  render() {
    return (
      <div className="dreamEditor_projectList">
        <div className="dreamEditor_projectList_header">
          <div className="dreamEditor_projectList_title">코스 목록</div>

          <div
            className="dreamEditor_projectList_course_add"
            onClick={this.onClickCouseAdd}
          >
            코스 추가
          </div>
          <div
            className="dreamEditor_projectList_refresh"
            onClick={this.onClickRefresh}
          >
            새로고침
          </div>
        </div>
        <div className="dreamEditor_projectList_body">
          <List
            list={this.list}
            onClickElement={this.onClickElement}
            onClickElementFold={this.onClickElementFold}
            onClickElementAdd={this.onClickElementAdd}
            onClickElementDelete={this.onClickElementDelete}
          />
        </div>
      </div>
    );
  }
}

function List(props) {
  const {
    list = [],
    onClickElement,
    onClickElementFold,
    onClickElementAdd,
    onClickElementDelete,
  } = props;
  return (
    <div className="dreamEditor_projectList_list">
      {list.map((element, index) => (
        <Element
          key={index}
          element={element}
          onClick={onClickElement}
          onClickFold={onClickElementFold}
          onClickAdd={onClickElementAdd}
          onClickDelete={onClickElementDelete}
        />
      ))}
    </div>
  );
}
function Element(props) {
  const { element, onClick, onClickFold, onClickAdd, onClickDelete } = props;
  if (!element) return null;

  let isFoldable, isAddable, isDeletable;
  switch (element.type) {
    case "course":
      isFoldable = true;
      isAddable = true;
      isDeletable = false;
      break;
    case "lecture":
      isFoldable = true;
      isAddable = true;
      isDeletable = true;
      break;
    default:
      isFoldable = false;
      isAddable = false;
      isDeletable = true;
      break;
  }

  let iconURL, title;
  switch (element.type) {
    case "course":
      const course = element.data;
      iconURL = course.iconURL;
      title = course.title;
      break;
    case "lecture":
      const lecture = element.data;
      title = lecture.lesson.title;
      break;
    default:
      title = null;
      break;
  }
  return (
    <div
      className={`dreamEditor_projectList_element dreamEditor_projectList_element-${
        element.type
      }${
        element.isSelected ? "  dreamEditor_projectList_element-selected" : ""
      }`}
      onClick={() => {
        onClick(element);
      }}
    >
      {isFoldable && element.type === "course" && (
        <div
          className="dreamEditor_projectList_element_fold"
          onClick={(e) => {
            e.stopPropagation();
            onClickFold(element);
          }}
        >
          <span>{element.isFolded ? "+" : "-"}</span>
        </div>
      )}
      {iconURL && (
        <img
          className="dreamEditor_projectList_element_icon"
          src={iconURL.toDreamclassS3URL()}
          alt="icon"
        />
      )}
      {title && (
        <div className="dreamEditor_projectList_element_title">{title}</div>
      )}
      {element.isSelected && (
        <div className="dreamEditor_projectList_element_btns">
          {isAddable && element.type === "course" && (
            <button
              className="dreamEditor_projectList_element_btn dreamEditor_projectList_element_btn-add"
              onClick={() => {
                onClickAdd(element);
              }}
            >
              추가
            </button>
          )}
          {/* {isDeletable && (
            <button
              className="dreamEditor_projectList_element_btn dreamEditor_projectList_element_btn-delete"
              onClick={() => {
                onClickDelete(element);
              }}
            >
              삭제
            </button>
          )} */}
        </div>
      )}
    </div>
  );
}

export default ProjectList;
