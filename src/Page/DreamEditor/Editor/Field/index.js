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
  const { id, type = "text", placeholder, value, onChange, children } = props;
  return (
    <Base {...props} type="input">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => {
          onChange(e.currentTarget.value, id);
        }}
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
        onChange={e => {
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
        onChange={e => {
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

function File(props) {
  const { id, accept, value, onChange } = props;
  const fileInputRef = useRef();
  return (
    <Base {...props} type="file">
      <input
        id={id}
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={e => {
          const selectedFile = e.target.files[0];
          if (!selectedFile) return;

          const data = new FormData();
          data.append("file", selectedFile);
          request
            .dreamUpload(data)
            .then(res => res.json())
            .then(json => {
              if (json.success) {
                onChange("/" + json.key, id);
              } else {
                throw json;
              }
            })
            .catch(err => {
              alert(JSON.stringify(err));
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
          <img src={value.toDreamclassS3URL()} alt={value} />
        </span>
      )}
    </Base>
  );
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
  Select,
  File,
  OnOff
};
export default Field;
