import React, { useRef } from "react";
import * as request from "../../../../Common/Util/HTTPRequest";
import "./index.scss";

function Base(props) {
  const { id, type, title, comment, children } = props;
  return (
    <div
      className={`dreamEditor_editor_field dreamEditor_editor_field-${id} dreamEditor_editor_field-${type}`}
    >
      <div className="dreamEditor_editor_field_title">{title}</div>
      <div className="dreamEditor_editor_field_body">
        {children}
        {comment && (
          <div className="dreamEditor_editor_field_comment">{comment}</div>
        )}
      </div>
    </div>
  );
}

function Input(props) {
  const {
    id,
    type = "text",
    placeholder,
    value,
    onChange,
    children,
    title,
  } = props;
  return (
    <Base {...props} type="input">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.currentTarget.value, id);
        }}
        disabled={title === "샘플 게임 url" ? true : false}
      />
      {children}
    </Base>
  );
}

function Textarea(props) {
  const { id, placeholder, value, onChange } = props;
  return (
    <Base {...props} type="textarea">
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.currentTarget.value, id);
        }}
      />
    </Base>
  );
}
function Textarea2(props) {
  const { id, placeholder, value, onChange } = props;
  return (
    <Base {...props} type="textarea">
      <textarea
        placeholder={placeholder}
        value={JSON.stringify(value)}
        onChange={(e) => {
          onChange(e.currentTarget.value, id);
        }}
      />
    </Base>
  );
}

function Select(props) {
  const { id, value, options, onChange } = props;
  return (
    <Base {...props} type="select">
      <select
        value={value}
        onChange={(e) => {
          onChange(e.currentTarget.value, id);
        }}
      >
        {options.map((option, id) => (
          <option key={id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Base>
  );
}

const uploadFile = async ({ selectedFile, templateState = false }) => {
  const lectureInfo = JSON.parse(
    localStorage.getItem("dreamEditorSelectedElement")
  );
  const lectureId = lectureInfo.id;
  try {
    if (templateState) {
      const params = {
        lessonId: lectureId,
        fileType:
          selectedFile.name.split(".")[selectedFile.name.split(".").length - 1],
        mimeType: selectedFile.type,
      };
      const uploadResponse = await request.templateFilesUpload(params);
      const uploadData = await uploadResponse.json();
      const putUrl = uploadData.data.uploadUrl;
      const downloadUrl = uploadData.data.downloadUrl;
      const putResponse = await fetch(putUrl, {
        method: "PUT",
        headers: {
          "Content-Type": selectedFile.type,
        },
        body: selectedFile,
      });
      console.log("PUT response", putResponse);
      return downloadUrl;
    } else {
      const uploadResponse = await request.thumbnailUpload(lectureId);
      const uploadData = await uploadResponse.json();
      const putUrl = uploadData.url.uploadUrl;
      const downloadUrl = uploadData.url.downloadUrl;

      const putResponse = await fetch(putUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "image/jpeg",
        },
        body: selectedFile,
      });
      console.log("PUT response", putResponse);
      return downloadUrl;
    }
  } catch (error) {
    console.error("파일 업로드 실패:", error);
  }
};

const uploadCourseFile = async ({ selectedFile, templateState = false }) => {
  const courseInfo = JSON.parse(
    localStorage.getItem("dreamEditorSelectedElement")
  );
  const courseId = courseInfo.id;
  try {
    const uploadResponse = await request.courseThumbnailUpload(courseId);
    const uploadData = await uploadResponse.json();
    const putUrl = uploadData.url.uploadUrl;
    const downloadUrl = uploadData.url.downloadUrl;

    const putResponse = await fetch(putUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "image/jpeg",
      },
      body: selectedFile,
    });
    console.log("PUT response", putResponse);
    return downloadUrl;
  } catch (error) {
    console.error("파일 업로드 실패:", error);
  }
};

function File(props) {
  const { id, accept, value, onChange, templateState, lectureId } = props;
  const fileInputRef = useRef();
  if (templateState) {
    return (
      <Base {...props} type="file">
        <input
          id={id}
          ref={fileInputRef}
          type="file"
          accept=".jpg, .jpeg, .png, .gif, .mp4, .mov"
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            if (!selectedFile) return;
            uploadFile({ selectedFile, lectureId, templateState }).then(
              (res) => {
                onChange(res);
              }
            );
          }}
          hidden
        />
        <button
          onClick={() => {
            fileInputRef.current.click();
          }}
        >
          업로드
        </button>
        {value && (
          <span>
            {value}
            <img src={value.THUMBNAIL_ALI()} alt={value} />
          </span>
        )}
      </Base>
    );
  } else {
    return (
      <Base {...props} type="file">
        <input
          id={id}
          ref={fileInputRef}
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            if (!selectedFile) return;
            uploadFile({ selectedFile, lectureId }).then((res) => {
              onChange(res);
            });
          }}
          hidden
        />
        <button
          onClick={() => {
            fileInputRef.current.click();
          }}
        >
          업로드
        </button>
        {value && (
          <span>
            {value}
            <img src={value.THUMBNAIL_ALI()} alt={value} />
          </span>
        )}
      </Base>
    );
  }
}

function FileCourse(props) {
  const { id, value, onChange, templateState, courseId } = props;
  const fileInputRef = useRef();
  if (templateState) {
    return (
      <Base {...props} type="file">
        <input
          id={id}
          ref={fileInputRef}
          type="file"
          accept=".jpg, .jpeg, .png, .gif, .mp4, .mov"
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            if (!selectedFile) return;
            uploadCourseFile({ selectedFile, courseId, templateState }).then(
              (res) => {
                onChange(res);
              }
            );
          }}
          hidden
        />
        <button
          onClick={() => {
            fileInputRef.current.click();
          }}
        >
          업로드
        </button>
        {value && (
          <span>
            {value}
            <img src={value.THUMBNAIL_ALI()} alt={value} />
          </span>
        )}
      </Base>
    );
  } else {
    return (
      <Base {...props} type="file">
        <input
          id={id}
          ref={fileInputRef}
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            if (!selectedFile) return;
            uploadCourseFile({ selectedFile, courseId }).then((res) => {
              onChange(res);
            });
          }}
          hidden
        />
        <button
          onClick={() => {
            fileInputRef.current.click();
          }}
        >
          업로드
        </button>
        {value && (
          <span>
            {value}
            <img src={value.THUMBNAIL_ALI()} alt={value} />
          </span>
        )}
      </Base>
    );
  }
}

function OnOff(props) {
  const { id, value: isOn, /*title_on, title_off,*/ onChange } = props;

  return (
    <Base {...props} type="onoff">
      <div className={`onoff onoff-${isOn ? "on" : "off"}`}>
        <div
          className="onoff_background"
          onClick={() => {
            onChange(!isOn, id);
          }}
        >
          <div className="onoff_thumb" />
        </div>
      </div>
    </Base>
  );
}

const Field = {
  Base,
  Input,
  Textarea,
  Textarea2,
  Select,
  File,
  FileCourse,
  OnOff,
};
export default Field;
