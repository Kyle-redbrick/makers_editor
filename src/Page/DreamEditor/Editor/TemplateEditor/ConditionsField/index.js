import React, { Component } from "react";
import { injectIntl } from "react-intl"
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import { TYPE, getSamplePayloadOf } from "../../../../Builder/Component/DreamBuilder/ConditionChecker/condition";
import Field from "../../Field";
import "./index.scss";

class ConditionsField extends Component {
  
  get conditions() {
    return this.props.value || [];
  }
  get defaultCondition() {
    return { type: TYPE.IS_PLAYING };
  }
  isPayloadNecessaryFor(conditionType) {
    return !!getSamplePayloadOf(conditionType);
  }

  onClickAdd = index => {
    const conditions = [...this.conditions];
    conditions.push(this.defaultCondition);
    this.onChangeConditions(conditions);
  }
  onClickDelete = index => {
    const conditions = [...this.conditions];
    conditions.splice(index, 1);
    this.onChangeConditions(conditions);
  }
  onChangeCondition = (index, key, value) => {
    const conditions = [...this.conditions];
    conditions[index][key] = value;
    if(key === "type") {
      conditions[index].payload = getSamplePayloadOf(conditions[index].type);
    }
    this.onChangeConditions(conditions);
  }
  onChangeConditions = conditions => {
    if(this.props.onChange) {
      this.props.onChange(conditions);
    }
  }

  render() {
    return (
      <Field.Base {...this.props} type="conditions">
        <div className="conditions">
          {this.conditions.map((condition, index) => 
            <div key={index} className="condition">
              <div className="condition_field condition_field-type">
                <select
                  value={condition.type} 
                  onChange={e => {
                    this.onChangeCondition(index, "type", e.currentTarget.value);
                  }}
                >
                  {Object.keys(TYPE).map(key => 
                    <option key={key} value={TYPE[key]}>
                      {this.props.intl.formatMessage({ id: "CONDITION_" + key })}
                    </option>
                  )}
                </select>
              </div>
              {this.isPayloadNecessaryFor(condition.type) && (
                <div className="condition_field condition_field-payload">
                  <JSONField 
                    value={condition.payload}
                    onBlur={json => {
                      this.onChangeCondition(index, "payload", json);
                    }}
                  />
                </div>
              )}
              <div
                className="condition_delete"
                onClick={() => {
                  this.onClickDelete(index)
                }}
              >
                삭제
              </div>
            </div>
          )}
          <div className="condition condition-add" onClick={this.onClickAdd}>+</div>
        </div>
      </Field.Base>
    );
  }
}

function JSONField(props) {
  return (
    <JSONInput
      width="100%"
      height="100%"
      locale={locale}
      placeholder={props.value}
      theme="light_mitsuketa_tribute"
      confirmGood={false}
      onBlur={e => {
        const json = e.jsObject;
        if(props.onBlur) {
          props.onBlur(json);
        }
      }}
      style={{
        body: {
          fontSize: "14px"
        }
      }}
    />
  );
}

export default injectIntl(ConditionsField);
