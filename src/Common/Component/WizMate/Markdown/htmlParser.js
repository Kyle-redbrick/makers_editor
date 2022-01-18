import React from "react";
import HtmlToReact from "html-to-react";
import HtmlParser from "react-markdown/plugins/html-parser";

import playImg from "../../../../Image/builder/group-2.svg";

const iconSrcMap = {
  play: playImg
};
const iconProcessingInstruction = {
  shouldProcessNode: node => {
    return node.name === "icon";
  },
  processNode: (node, children) => {
    const { type } = node.attribs;
    const src = iconSrcMap[type];
    return <img className="inline_icon" src={src} alt={type} />;
  }
};

const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
const defaultProcessingIntructions = {
  shouldProcessNode: () => true,
  processNode: processNodeDefinitions.processDefaultNode
};

const htmlParser = HtmlParser({
  isValidNode: node => node.type !== "script",
  processingInstructions: [
    iconProcessingInstruction,
    defaultProcessingIntructions
  ]
});
export default htmlParser;
