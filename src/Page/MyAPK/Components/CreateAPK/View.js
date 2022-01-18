import React from "react";
import Layout from "../../../../Common/Component/Layout";
import "./index.scss";
import { FormattedMessage } from "react-intl";
import APKInfo from "./Components/APKInfo";
import APKProjectList from "./Components/APKProjectList";
import APKGuide from "./Components/APKGuide";
import APKMaking from "./Components/APKMaking";
import checkImg from "../../../../Image/check.svg";
export default function View(props) {
  const {
    projects,
    selectedProject,
    CREATINGPROCESS_TYPE,
    currentProcessType,
    apkInfo,
    history
  } = props;

  const { onClickMovableProcess, handleNextProcessType } = props;

  const getProcessContent = () => {
    let content;
    switch (currentProcessType) {
      case CREATINGPROCESS_TYPE.GUIDE:
        content = (
          <APKGuide
            handleNextProcessType={() => {
              handleNextProcessType(currentProcessType);
            }}
          />
        );
        break;
      case CREATINGPROCESS_TYPE.SELECTAPP:
        content = (
          <APKProjectList
            projects={projects}
            handleNextProcessType={payload => {
              handleNextProcessType(currentProcessType, payload);
            }}
          />
        );
        break;
      case CREATINGPROCESS_TYPE.APPINFO:
        content = (
          <APKInfo
            selectedProject={selectedProject}
            handleNextProcessType={payload => {
              handleNextProcessType(currentProcessType, payload);
            }}
          />
        );
        break;
      case CREATINGPROCESS_TYPE.MAKING:
        content = <APKMaking apkInfo={apkInfo} history={history} />;
        break;
      default:
        content = <> </>;
        break;
    }
    return content;
  };

  const precessContent = getProcessContent();

  const processTypes = Object.keys(CREATINGPROCESS_TYPE);
  const currentProcessTypeIndex = processTypes.indexOf(currentProcessType);

  return (
    <Layout>
      <div className="Page--CreateAPK">
        <section className="createAPK_header">
          <div className="createAPK_h_inner">
            <div className="createAPK_h_topWrap">
              {processTypes.map((processType, index) => {
                const isActiveProcess = index === currentProcessTypeIndex;
                const isbeforeProcess = index < currentProcessTypeIndex;
                const isLast = index === processTypes.length - 1;
                const isMovableProcess =
                  !isLast && index < currentProcessTypeIndex;
                return (
                  <div
                    key={`createAPK_h_tw_indicator-${index}`}
                    className={`createAPK_h_tw_indicator`}
                  >
                    <div
                      className={`createAPK_h_tw_indicator ${isMovableProcess &&
                        "createAPK_h_tw_indicator-movable"}`}
                      onClick={() => {
                        if (!isMovableProcess) return;
                        onClickMovableProcess(processType);
                      }}
                    >
                      <div
                        className={`createAPK_h_tw_indicator-number ${isActiveProcess &&
                          "createAPK_h_tw_indicator-number-active"} ${isbeforeProcess &&
                          "createAPK_h_tw_indicator-number-before"}`}
                      >
                        {isbeforeProcess ? (
                          <img src={checkImg} alt="check" />
                        ) : (
                          <div>{index + 1}</div>
                        )}
                      </div>
                      <div
                        className={`createAPK_h_tw_indicator-text ${isActiveProcess &&
                          "createAPK_h_tw_indicator-text-active"} ${isbeforeProcess &&
                          "createAPK_h_tw_indicator-text-before"}`}
                      >
                        <FormattedMessage
                          id={`ID_APK_CREATINGPROCESS_${processType}`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="createAPK_h_progressWrap">
              <div
                style={{
                  width: `calc(var(--innerWidth) / 4 * ${currentProcessTypeIndex +
                    1})`
                }}
                className="createAPK_h_progressWrap-progress"
              />
            </div>
          </div>
        </section>
        <section className="createAPK_process">{precessContent}</section>
      </div>
    </Layout>
  );
}
