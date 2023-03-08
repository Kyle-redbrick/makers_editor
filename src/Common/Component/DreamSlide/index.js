import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import AssetLibrary from "../../../Page/Builder/utils/assetLibrary";
import { htmlParserWith } from "./htmlParser";
import CodeRenderer from "./codeRenderer";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import "./index.scss";

class DreamSlide extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      projectId: ""
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevProps.myProject !== this.props.myProject) {
      this.setState({projectId: this.props.myProject.project.id})
    }
  }

  shouldComponentUpdate(nextProps) {
    if(this.props.markdown !== nextProps.markdown) {
      return true;
    }
    if(this.props.shouldRerender !== nextProps.shouldRerender && nextProps.shouldRerender) {
      return true;
    }
    return false;
  }

  getSpriteIcon = spriteId => {
    if(!spriteId) return null;

    let icon;

    if(spriteId.startsWith("textbox")) {
      icon = AssetLibrary.textboxThumb;
    } else {
      const name = spriteId.split("(")[0];
      const asset = AssetLibrary.getAssetByName(name);
      icon = asset && asset.thumb;
    }

    return icon;
  };

  render() {
    return (
      <div className="dreamslide" ref={this.props.slideRef}>
        {this.props.markdown ? (
          <ReactMarkdown
            skipHtml={false}
            allowDangerousHtml
            astPlugins={[
              htmlParserWith({ getSpriteIcon: this.getSpriteIcon })
            ]}
            renderers={{
              code: props => <CodeRenderer {...props} projectId={this.state.projectId} getSpriteIcon={this.getSpriteIcon} />
            }}
          >
            {this.props.markdown}
          </ReactMarkdown>
        ) : (
          <div className="dreamslide_placeholder">
            {this.props.intl.formatMessage({ id: "ID_DREAM_SLIDE_PLACEHOLDER"})}
          </div>
        )}
      </div>
    );
  }
}

export default connect(state => ({
  myProject: state.dream.myProject
}))(injectIntl(DreamSlide));
