import React from "react";
import "./index.scss";

import Api from "./Component/Api";
import Game from "./Component/Game";
import Editor from "./Component/Editor";
import Socket from "./Component/Socket";
import LeftBar from "./Component/LeftBar";
import Preview from "./Component/Preview";
import Publish from "./Component/Publish";
import Toolbar from "./Component/Toolbar";
import SoundBox from "./Component/SoundBox";
import Inspector from "./Component/Inspector";
import ObjectBox from "./Component/ObjectBox";
import CameraView from "./Component/CameraView";
import RndProvider from "./Component/RndProvider";
import ContextMenu from "./Component/ContextMenu";
import AudioPlayer from "../Builder/Component/AudioPlayer";

export default function(props) {
  const { isLoading, pageType } = props;

  if (isLoading) {
    return (
      <div className="builder3d">
        <Loading />
      </div>
    );
  }

  return (
    <div className="builder3d">
      <Preview />
      <Layout {...props} />
      <Game />
      <Publish />
      {/* non ui components */}
      <Socket pageType={pageType} />
      <AudioPlayer />
    </div>
  );
}

function Layout(props) {
  return (
    <div className="builder3d_layout">
      <Header {...props} />
      <Body {...props} />
    </div>
  );
}
function Header(props) {
  return <div className="builder3d_layout_header" />;
}
function Body(props) {
  return (
    <div className="builder3d_layout_body">
      <Left {...props} />
      <Center {...props} />
      <Right {...props} />
      <ContextMenu />
    </div>
  );
}
function Left(props) {
  return (
    <div className="builder3d_layout_body_left">
      <LeftBar />
    </div>
  );
}
function Center(props) {
  const { showProjectList } = props;
  return (
    <div className="builder3d_layout_body_center">
      <RndContainer {...props} />
      <Toolbar showProjectList={showProjectList} />
    </div>
  );
}
function Right(props) {
  return (
    <div className="builder3d_layout_body_right">
      <Inspector />
    </div>
  );
}

function RndContainer(props) {
  return (
    <div className="builder3d_rndContainer">
      <RndProvider>
        <Api rndId="Api" />
        <Editor rndId="Editor" />
        <SoundBox rndId="SoundBox" />
        <ObjectBox rndId="ObjectBox" />
        <CameraView rndId="CameraView" />
      </RndProvider>
    </div>
  );
}

function Loading() {
  return (
    <div className="builder3d-loading">
      <div className="builder3d-loading--progress" />
      <div className="builder3d-loading--text">Loading...</div>
    </div>
  );
}
