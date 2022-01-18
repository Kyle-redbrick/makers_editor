import React from "react";
import "./index.scss";
import meshIcon from "../../../../Image/builder3d/icon-32-mesh-off-white.svg";
import skyboxIcon from "../../../../Image/builder3d/icon-32-skybox-off-white.svg";
import lightIcon from "../../../../Image/builder3d/icon-32-light-off-white.svg";
import cameraIcon from "../../../../Image/builder3d/icon-32-camera-off-white.svg";
import guiIcon from "../../../../Image/builder3d/icon-32-gui-off-white.svg";
import textureGuiIcon from "../../../../Image/builder3d/icon-32-texture-gui-off-white.svg";
// import checkIcon from "../../../../Image/builder3d/icon-32-texture-gui-off-white.svg";
// import unCheckIcon from "../../../../Image/builder3d/icon-32-texture-gui-off-white.svg";

const { GAMEOBJECT, GUI, LIGHT, CAMERA } = window.BabylonConstant;

const imgSrc = type => {
  switch (type) {
    case "mesh":
      return meshIcon;
    case "skybox":
      return skyboxIcon;
    case "light":
      return lightIcon;
    case "camera":
      return cameraIcon;
    case "gui":
      return guiIcon;
    case "textureGui":
      return textureGuiIcon;
    default:
      break;
  }
};

export default function(props) {
  const {
    gameObject,
    onClickCopy,
    onClickCode,
    onClickRemove,
    onClickLock
  } = props;
  return (
    <div className="inspector">
      {gameObject ? (
        <div>
          <div className="inspector_objectBox">
            <InfoButtons
              gameObject={gameObject}
              onClickCopy={onClickCopy}
              onClickLock={onClickLock}
              onClickCode={onClickCode}
              onClickRemove={onClickRemove}
            />
            <img
              className="inspector_gameObject_img"
              src={gameObject.thumbPath}
              alt="gameObject"
            />
          </div>
          <div className="inspector_body">
            <Info {...props} />
            <Properties {...props} />
          </div>
        </div>
      ) : (
        <div>
          <div className="inspector_objectBox">
            <div className="inspector_placeholder">
              선택된 Object가 없습니다
            </div>
          </div>
          <div className="inspector_body">
            <div className="inspector_info">
              <div className="inspector_info_nameInput" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoButtons(props) {
  const {
    gameObject,
    onClickCode,
    onClickCopy,
    onClickRemove,
    onClickLock
  } = props;
  return (
    <div className="inspector_info_buttons">
      <div
        onClick={() => onClickCode(gameObject)}
        className="inspector_info_button inspector_info_button-code"
      />
      <div
        onClick={onClickCopy}
        className="inspector_info_button inspector_info_button-copy"
      />
      <div
        onClick={() => onClickRemove(gameObject)}
        className="inspector_info_button inspector_info_button-remove"
      />
      <div
        onClick={onClickLock}
        className={`inspector_info_button ${
          gameObject.isLocked
            ? "inspector_info_button-lock"
            : "inspector_info_button-unlock"
        }`}
      />
    </div>
  );
}

function Info(props) {
  const { gameObject, onBlurNameInput } = props;
  const { isLocked } = gameObject;
  return (
    <div className="inspector_info">
      <img src={imgSrc(gameObject.type)} alt="icon" />
      <input
        id="inspector_info_nameInput"
        className="inspector_info_nameInput"
        defaultValue={gameObject.name}
        onBlur={e => {
          onBlurNameInput(gameObject, e.currentTarget);
        }}
        onKeyDown={e => {
          if (e.key === "Enter") {
            const target = e.currentTarget;
            setTimeout(target.blur.bind(target), 1);
          }
        }}
        disabled={isLocked}
      />
    </div>
  );
}

function Properties(props) {
  const { gameObject } = props;
  const { type } = gameObject;
  switch (type) {
    case GAMEOBJECT.MESH:
      return (
        <div className="inspector_properties inspector_properties-mesh">
          <Position {...props} />
          <Rotation {...props} />
          <Scale {...props} />
        </div>
      );
    case GAMEOBJECT.CAMERA:
      return <CameraProperties {...props} />;
    case GAMEOBJECT.LIGHT:
      return <LightProperties {...props} />;
    case GAMEOBJECT.SKYBOX:
      return (
        <div className="inspector_properties inspector_properties-skybox">
          <Size {...props} />
        </div>
      );
    case GAMEOBJECT.TEXTURE_GUI:
      return (
        <div className="inspector_properties inspector_properties-mesh">
          <Position {...props} />
          <Rotation {...props} />
          <Scale {...props} />
          {gameObject.text !== undefined && <GUIText {...props} />}
        </div>
      );
    case GAMEOBJECT.GUI:
      return GUIProperties(props);
    case GAMEOBJECT.EMPTY:
      return (
        <div className="inspector_properties inspector_properties-empty">
          <Position {...props} />
          <Rotation {...props} />
          <Scale {...props} />
        </div>
      );
    default:
      return <></>;
  }
}
function CameraProperties(props) {
  const { gameObject } = props;
  const { subtype } = gameObject;
  switch (subtype) {
    case CAMERA.UNIVERSAL:
      return (
        <div className="inspector_properties inspector_properties-camera">
          <ActiveCamera {...props} />
          <Position {...props} />
          <Rotation {...props} />
        </div>
      );
    case CAMERA.ARCROTATE:
      return (
        <div className="inspector_properties inspector_properties-camera">
          <ActiveCamera {...props} />
          <Position {...props} />
        </div>
      );
    case CAMERA.FOLLOW:
    default:
      return (
        <div className="inspector_properties inspector_properties-camera">
          <ActiveCamera {...props} />
          <TargetObject targetType={GAMEOBJECT.MESH} {...props} />
          <Position {...props} />
          <Rotation {...props} />
        </div>
      );
  }
}
function LightProperties(props) {
  const { gameObject } = props;
  const { subtype } = gameObject;
  switch (subtype) {
    case LIGHT.POINT:
      return (
        <div className="inspector_properties inspector_properties-light">
          <Position {...props} />
          <Intensity {...props} />
          <Range {...props} />
        </div>
      );
    case LIGHT.SPOT:
      return (
        <div className="inspector_properties inspector_properties-light">
          <Position {...props} />
          <Direction {...props} />
          <Intensity {...props} />
          <Range {...props} />
        </div>
      );
    case LIGHT.HEMISPHERIC:
    case LIGHT.DIRECTIONAL:
    default:
      return (
        <div className="inspector_properties inspector_properties-light">
          <Direction {...props} />
          <Intensity {...props} />
        </div>
      );
  }
}
function GUIProperties(props) {
  const { gameObject } = props;
  const hasText =
    gameObject.subtype === GUI.BUTTON || gameObject.subtype === GUI.TEXT;
  return (
    <div className="inspector_properties inspector_properties-gui">
      <GUIPosition {...props} />
      <GUIRotation {...props} />
      <GUISize {...props} />
      {hasText && <GUIText {...props} />}
    </div>
  );
}

function Position(props) {
  const { gameObject, onChangeProperty, onBlurProperty } = props;
  const { position, isLocked } = gameObject;
  return (
    <section className="inspector_section inspector_section-position">
      <div className="inspector_section_title">Position</div>
      <div className="inspector_section_property_wrapper">
        <Property
          id="positionX"
          title="X"
          value={position.x}
          step="0.1"
          onChange={onChangeProperty}
          onBlur={onBlurProperty}
          disabled={isLocked}
        />
        <Property
          id="positionY"
          title="Y"
          value={position.y}
          step="0.1"
          onChange={onChangeProperty}
          onBlur={onBlurProperty}
          disabled={isLocked}
        />
        <Property
          id="positionZ"
          title="Z"
          value={position.z}
          step="0.1"
          onChange={onChangeProperty}
          onBlur={onBlurProperty}
          disabled={isLocked}
        />
      </div>
    </section>
  );
}
function Rotation(props) {
  const { gameObject, onChangeProperty, onBlurProperty } = props;
  const { rotation, isLocked } = gameObject;
  return (
    <section className="inspector_section inspector_section-rotation">
      <div className="inspector_section_title">Rotation</div>
      <div className="inspector_section_property_wrapper">
        <Property
          id="rotationX"
          title="X"
          value={rotation.x}
          onChange={onChangeProperty}
          onBlur={onBlurProperty}
          disabled={isLocked}
        />
        <Property
          id="rotationY"
          title="Y"
          value={rotation.y}
          onChange={onChangeProperty}
          onBlur={onBlurProperty}
          disabled={isLocked}
        />
        <Property
          id="rotationZ"
          title="Z"
          value={rotation.z}
          onChange={onChangeProperty}
          onBlur={onBlurProperty}
          disabled={isLocked}
        />
      </div>
    </section>
  );
}
function Scale(props) {
  const { gameObject, onChangeProperty, onBlurProperty } = props;
  const { scale, isLocked } = gameObject;
  return (
    <section className="inspector_section inspector_section-scale">
      <div className="inspector_section_title">Scale</div>
      <div className="inspector_section_property_wrapper">
        <Property
          id="scaleX"
          title="X"
          value={scale.x}
          step="0.1"
          onChange={onChangeProperty}
          onBlur={onBlurProperty}
          disabled={isLocked}
        />
        <Property
          id="scaleY"
          title="Y"
          value={scale.y}
          step="0.1"
          onChange={onChangeProperty}
          onBlur={onBlurProperty}
          disabled={isLocked}
        />
        <Property
          id="scaleZ"
          title="Z"
          value={scale.z}
          step="0.1"
          onChange={onChangeProperty}
          onBlur={onBlurProperty}
          disabled={isLocked}
        />
      </div>
    </section>
  );
}
function Direction(props) {
  const { gameObject, onChangeProperty, onBlurProperty } = props;
  const { direction, isLocked } = gameObject;
  return (
    <section className="inspector_section inspector_section-scale">
      <div className="inspector_section_title">Direction</div>
      <div className="inspector_section_property_wrapper">
        <Property
          id="directionX"
          title="x"
          value={direction.x}
          step="0.1"
          onChange={onChangeProperty}
          onBlur={onBlurProperty}
          disabled={isLocked}
        />
        <Property
          id="directionY"
          title="y"
          value={direction.y}
          step="0.1"
          onChange={onChangeProperty}
          onBlur={onBlurProperty}
          disabled={isLocked}
        />
        <Property
          id="directionZ"
          title="z"
          value={direction.z}
          step="0.1"
          onChange={onChangeProperty}
          onBlur={onBlurProperty}
          disabled={isLocked}
        />
      </div>
    </section>
  );
}
function Size(props) {
  const { gameObject, onChangeProperty, onBlurProperty } = props;
  const { size, isLocked } = gameObject;
  return (
    <section className="inspector_section inspector_section-size">
      <div className="inspector_section_title">Size</div>
      <div className="inspector_section_property_wrapper inspector_section-size-one-input">
        <Property
          id="size"
          title="size"
          value={size}
          step="1"
          onChange={onChangeProperty}
          onBlur={onBlurProperty}
          disabled={isLocked}
        />
      </div>
    </section>
  );
}
function Intensity(props) {
  const { gameObject, onChangeProperty, onBlurProperty } = props;
  const { intensity, isLocked } = gameObject;
  return (
    <section className="inspector_section inspector_section-intensity">
      <div className="inspector_section_title">Intensity</div>
      <Property
        id="intensity"
        title="intensity"
        value={intensity}
        step="0.01"
        onChange={onChangeProperty}
        onBlur={onBlurProperty}
        disabled={isLocked}
      />
    </section>
  );
}
function Range(props) {
  const { gameObject, onChangeProperty, onBlurProperty } = props;
  const { range, isLocked } = gameObject;
  return (
    <section className="inspector_section inspector_section-range">
      <div className="inspector_section_title">Range</div>
      <Property
        id="range"
        title="range"
        value={range}
        step="1"
        onChange={onChangeProperty}
        onBlur={onBlurProperty}
        disabled={isLocked}
      />
    </section>
  );
}
function TargetObject(props) {
  const {
    gameObjectIds,
    gameObjects,
    gameObjectId,
    gameObject,
    targetType,
    onChangeProperty
  } = props;
  const { targetId, isLocked } = gameObject;

  const options = gameObjectIds
    .filter(id => id !== gameObjectId)
    .filter(id => gameObjects[id].type === targetType)
    .map(id => ({ value: id, name: gameObjects[id].name }));

  return (
    <section className="inspector_section inspector_section-target">
      <div className="inspector_section_title">Target Object</div>
      <SelectProperty
        id="targetId"
        title="target"
        value={targetId}
        options={options}
        onChange={onChangeProperty}
        disabled={isLocked}
      />
    </section>
  );
}
function ActiveCamera(props) {
  const { gameObject, onChangeProperty } = props;
  const { isActiveCamera, isLocked } = gameObject;
  return (
    <section className="inspector_section inspector_section-target inspector_section_camera">
      <div className="inspector_section_title">Active Camera</div>
      <CheckBoxProperty
        id="isActiveCamera"
        title="active"
        value={isActiveCamera}
        onChange={onChangeProperty}
        disabled={isLocked}
      />
    </section>
  );
}

function GUIPosition(props) {
  const { gameObject, onChangeProperty, onBlurProperty } = props;
  const { position, isLocked } = gameObject;
  return (
    <section className="inspector_section inspector_section-position">
      <div className="inspector_section_title">Position</div>
      <div className="inspector_section_property_wrapper">
        <Property
          id="positionX"
          title="x"
          value={position.x}
          step="1"
          onChange={onChangeProperty}
          onBlur={onBlurProperty}
          disabled={isLocked}
        />
        <Property
          id="positionY"
          title="y"
          value={position.y}
          step="1"
          onChange={onChangeProperty}
          onBlur={onBlurProperty}
          disabled={isLocked}
        />
      </div>
    </section>
  );
}
function GUIRotation(props) {
  const { gameObject, onChangeProperty, onBlurProperty } = props;
  const { rotation, isLocked } = gameObject;
  return (
    <section className="inspector_section inspector_section-rotation">
      <div className="inspector_section_title">Rotation</div>
      <Property
        id="rotationX"
        title="rotation"
        value={rotation.x}
        onChange={onChangeProperty}
        onBlur={onBlurProperty}
        disabled={isLocked}
      />
    </section>
  );
}
function GUISize(props) {
  const { gameObject, onChangeProperty, onBlurProperty } = props;
  const { width, height, isLocked } = gameObject;
  return (
    <section className="inspector_section inspector_section-size">
      <div className="inspector_section_title">Size</div>
      <div className="inspector_section_property_wrapper">
        <Property
          id="width"
          title="width"
          value={width}
          step="1"
          onChange={onChangeProperty}
          onBlur={onBlurProperty}
          disabled={isLocked}
        />
        <Property
          id="height"
          title="height"
          value={height}
          step="1"
          onChange={onChangeProperty}
          onBlur={onBlurProperty}
          disabled={isLocked}
        />
      </div>
    </section>
  );
}
function GUIText(props) {
  const { gameObject, onChangeProperty, onBlurProperty } = props;
  const { text, isLocked } = gameObject;
  return (
    <section className="inspector_section inspector_section-guiText">
      <div className="inspector_section_title">Text</div>
      <StringProperty
        id="text"
        title="text"
        value={text}
        onChange={onChangeProperty}
        onBlur={onBlurProperty}
        disabled={isLocked}
      />
    </section>
  );
}

function Property(props) {
  const { id, title, value, step, onChange, onBlur, disabled } = props;
  return (
    <div className="inspector_property">
      <input
        className={`inspector_property_input ${
          id === "width" || id === "height" ? "size_input" : ""
        }`}
        type="number"
        value={value}
        step={step}
        onChange={e => {
          onChange(id, e.currentTarget.value);
        }}
        onBlur={e => {
          onBlur(id, e.currentTarget.value);
        }}
        onKeyDown={e => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
          }
        }}
        disabled={disabled}
      />
      {title !== "intensity" && title !== "size" && title !== "rotation" && (
        <div className={`inspector_property_title`}>{title}</div>
      )}
    </div>
  );
}
function StringProperty(props) {
  const { id, value, onChange, onBlur, disabled } = props;
  return (
    <div className="inspector_property">
      <textarea
        className={`inspector_property_input ${
          id === "text" ? "inspector_property_input_text" : ""
        }`}
        value={value}
        onChange={e => {
          onChange(id, e.currentTarget.value);
        }}
        onBlur={e => {
          onBlur(id, e.currentTarget.value);
        }}
        onKeyDown={e => {
          if (e.key === "Enter") {
            const target = e.currentTarget;
            setTimeout(target.blur.bind(target), 1);
          }
        }}
        placeholder={id === "text" && "Input text here."}
        disabled={disabled}
      />
    </div>
  );
}
function SelectProperty(props) {
  const { id, value, options, onChange, disabled } = props;
  return (
    <div
      className={`inspector_property${
        disabled ? " inspector_property-disabled" : ""
      }`}
    >
      <div className="inspector_property_select_wrapper">
        <select
          className="inspector_property_select"
          value={value}
          onChange={e => {
            onChange(id, e.currentTarget.value);
          }}
          disabled={disabled}
        >
          <option value={null}>선택안함</option>
          {options &&
            options.map(option => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}
function CheckBoxProperty(props) {
  const { id, value, onChange, disabled } = props;
  return (
    <div className="inspector_property">
      <input
        className="inspector_property_checkbox"
        id="checkbox"
        type="checkbox"
        value={value}
        onChange={e => {
          onChange(id, e.currentTarget.checked);
        }}
        checked={value || false}
        disabled={disabled}
      />
      <label htmlFor="checkbox" />
    </div>
  );
}
