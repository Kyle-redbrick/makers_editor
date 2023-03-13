import React, { Component, PureComponent } from "react";
import { EDITORMODE, USER_TYPE } from "../../Util/Constant";
import Clipboard from "../../Util/Clipboard";
import Context from "../OOBCEditor/Component/Context";
import { LineGroup, Line } from "../OOBCEditor/Component/Line";
import { BlockGroup } from "../OOBCEditor/Component/Block";
import OOBC from "../OOBCEditor/OOBC";
import jwt_decode from "jwt-decode";
import * as request from "../../Util/HTTPRequest";
import lockImg from "../../../Image/course-content--lock.svg";
import dropdownIconUp from "../../../Image/dropdown-up.svg";
import dropdownIconDown from "../../../Image/dropdown-down.svg";
import copyIcon from "../../../Image/slide_code_copy.svg";

class CodeRenderer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFolded: true,
      isShow: false,
    };
  }

  async componentDidMount() {
    const tokenInfo = jwt_decode(localStorage.getItem("astroToken"));

    if(tokenInfo.userType === USER_TYPE.STUDENT) {
      const res = await request.getProjectShowHintState(this.props.projectId);
      this.setState({isShow: res.isShow})
    } else {
      this.setState({isShow: true})
    }
  }

  get id() {
    return this.spriteId + "_" + this.props.node.position.start.line;
  }
  get spriteId() {
    return this.props.node.meta;
  }
  get icon() {
    if (this.props.getSpriteIcon) {
      return this.props.getSpriteIcon(this.spriteId);
    } else {
      return null;
    }
  }
  get language() {
    return this.props.language;
  }
  get code() {
    return this.props.value || "";
  }

  onClickDrop = () => {
    const isFolded = !this.state.isFolded;
    this.setState({ isFolded });
  };
  onClickCopy = () => {
    Clipboard.copy(this.code);
  }

  render() {
    return (
      <div id={"codeblock-" + this.id} className="codeblock">
        <div className="codeblock_header">
          <img
            className="codeblock_header_icon"
            src={this.icon}
            alt={this.spriteId}
          />
          <div className="codeblock_header_spriteId">{this.spriteId}</div>
          <img
            className="codeblock_header_dropdown"
            src={this.state.isFolded ? dropdownIconDown : dropdownIconUp}
            alt="dropdown"
            onClick={this.onClickDrop}
          />
        </div>
        {this.state.isFolded || (
          <div className="codeblock_body">
            {this.state.isShow ?
              <Code
                id={this.id}
                isShow={this.state.isShow}
                language={this.language}
                code={this.code}
                getSpriteIcon={this.props.getSpriteIcon}
              />
              : 
              <div className="not_show_codeblock">
                <img src={lockImg} alt="" />
              </div>
            }
            {this.language !== "oobc" && <div className="codeblock_body_copy" onClick={this.onClickCopy}>
              <img src={copyIcon} alt="copy" />
            </div>}
          </div>
        )}
      </div>
    );
  }
}
export default CodeRenderer;

function Code(props) {
  const { language } = props;
  switch (language) {
    case "oobc":
      return <OOBCCode {...props} />;
    default:
      return <DefaultCode {...props} />;
  }
}
function OOBCCode(props) {
  const { code, getSpriteIcon } = props;
  try {
    const contextJSON = JSON.parse(code);
    const context = OOBC.Context.fromJSON(contextJSON);

    if (getSpriteIcon) {
      OOBC.Context.traverse(context, {
        onBlock: block => {
          if(block instanceof OOBC.GameObject) {
            block.thumbnailSrc = getSpriteIcon(block.data);
          }
        }
      });
    }

    return (
      <div className="codeblock_oobc oobceditor">
        <Context>
          <LineGroup>
            {context.getDisplayLines().map(line => (
              <Line key={line.id} line={line}>
                <BlockGroup context={context} block={line.block} />
              </Line>
            ))}
          </LineGroup>
        </Context>
      </div>
    );
  } catch (err) {
    console.warn(err);
    return null;
  }
}
class DefaultCode extends Component {

  componentDidMount() {
    this.initEditor();
  }
  initEditor() {
    this.editor = window.ace.edit(this.editorId);
    this.editor.session.setMode(`ace/mode/${EDITORMODE.JAVASCRIPT}`);
    this.editor.getSession().setUseWorker(false);
    this.editor.setTheme("ace/theme/wizschool");
    this.editor.setOptions({ maxLines: Infinity });
    this.editor.setFontSize(18);
    this.editor.setValue(this.props.code, 1);
    this.editor.setReadOnly(true);
  }
  get editorId() {
    return "codeblock_code-" + this.props.id;
  }

  render() {
    return <div id={this.editorId} className="codeblock_code" />;
  }
}
