import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as gameActions from "../../../../Store/Reducer/game";
import { EDITORMODE } from "../../../../../../Common/Util/Constant";
import ApiLibrary3d from "../../../../Util/ApiLibrary3d";
import JSEvaluator from "../../../../../Builder/utils/JSEvaluator";
import AssetLibrary from "../../../../../Builder/utils/assetLibrary";
import View from "./View";
import { injectIntl } from "react-intl";
import Parser from "../../../../../Builder/utils/parser";
import { toast } from "react-toastify";

const enableJSEval = true;
let signalNameWorker = undefined;
let signalNames = [];
let globalValueWorker = undefined;
let globalValues = [];

class Container extends Component {
  constructor(props) {
    super(props);
    this.isLive = false;
    this.ace = window.ace;
    this.langTools = undefined;
    this.completers = {};
    this.aceEditor = undefined;
    this.undoManagers = {};
    this.JSEval = new JSEvaluator();
    this.symtab = undefined;
    this.errorTimer = null;

    this.state = { tooltip: null };
  }

  getAutoCompleteApiList(apiList) {
    const captionList = apiList.map(({ caption }) => {
      return caption;
    });

    const filteredApiList = apiList.filter((item, index) => {
      return captionList.indexOf(item.caption) === index;
    });

    return filteredApiList;
  }

  componentDidMount() {
    this.setAceEditor();
    this.setCode();
    this.setWorkers();
    this.setSignalNames();
    this.setGlobalValues();
    this.setAPILibrary();
  }

  componentDidUpdate() {
    this.setCode();
    this.setSignalNames();
    this.setGlobalValues();
    this.setAceEditor();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.tooltip !== nextState.tooltip) {
      return true;
    }
    this.aceEditor.resize();
    if (this.props.currentSceneId !== nextProps.currentSceneId) {
      return true;
    }

    const currentGameObject = this.props.currentGameObject;
    const nextGameObject = nextProps.currentGameObject;
    if (currentGameObject && nextGameObject) {
      if (currentGameObject.id === nextGameObject.id) {
        return false;
      }
    } else if (!currentGameObject && !nextGameObject) {
      return false;
    }

    return true;
  }

  getCompleters = selectionType => {
    switch (selectionType) {
      case "all":
        return Object.keys(this.completers).map(key => this.completers[key]);
      case "global":
        return [this.completers[selectionType + "ValueCompleter"]];
      default:
        return [this.completers[selectionType + "Completer"]];
    }
  };

  setAceEditor() {
    this.aceEditor = this.ace.edit("ace-editor-3d");
    this.aceEditor.session.setMode(`ace/mode/${EDITORMODE.JAVASCRIPT}`);
    this.aceEditor.setTheme("ace/theme/wizschool");

    if (!this.props.currentGameObject) {
      return;
    }

    this.aceEditor.on("changeSelection", this.handleOnChangeSelection);
    this.aceEditor.on("change", this.handleOnChange);
    document
      .getElementById("ace-editor-3d")
      .addEventListener("mouseout", () => {
        document.getElementById("EditorContainer3d_tooltip").style.display =
          "none";
      });
    this.aceEditor.getSession().setUseWrapMode(false);
    this.aceEditor.setFontSize(this.getStoredFontSize());

    this.undoManagers.defaultManager = this.aceEditor.session.getUndoManager();

    this.aceEditor.setOptions({
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true
    });

    this.setAutoCompleters();

    this.aceEditor.session.on("changeMode", function(e, session) {
      if (`ace/mode/javascript-wiz` === session.getMode().$id) {
        if (!!session.$worker) {
          session.$worker.send("setOptions", [
            {
              "-W041": false,
              "-W033": false,
              "-W104": false,
              "-W118": false
            }
          ]);
        }
      }
    });
  }

  getStoredFontSize = () => {
    const fontSize = localStorage.getItem("wizFontSize");
    if (fontSize) {
      return parseInt(fontSize);
    }
    return 18;
  };

  getApiNameSet(apiList) {
    const ret = new Set();

    for (let i = 0; i < apiList.length; i++) {
      const api = apiList[i];
      const caption = api.caption;
      const idx = caption.indexOf("(");

      if (idx === -1) {
        continue;
      }

      const name = caption.substring(0, idx);
      ret.add(name);
    }

    // Additional Reserved Keyword
    ret.add("let");
    ret.add("var");
    ret.add("function");
    ret.add("switch");
    ret.add("case");
    ret.add("default");
    ret.add("global");
    ret.add("if");
    ret.add("else if");
    ret.add("else");

    return ret;
  }

  setAPILibrary() {
    this.apiList = ApiLibrary3d.getAllFunctions();
    this.autoCompleteApiList = this.getAutoCompleteApiList(this.apiList);
    this.apiNameSet = this.getApiNameSet(this.apiList);
    this.JSEval.setListOfReserved(
      this.apiList.map(api => {
        const cleanCaption = api.caption.replace(/\[.+\]/, "array");
        const tokens = cleanCaption.match(/[a-z|A-Z]+/g);
        return {
          id: tokens[0],
          type: "function",
          value: {
            /* Return value of a function */
            type: "object",
            value: {}
          },
          params: tokens.slice(1),
          requiredParamCount: api.requiredParamCount || tokens.length - 1
        };
      })
    );
  }

  setAutoCompleters() {
    this.langTools = this.ace.require("ace/ext/language_tools");
    // const TokenIterator = this.ace.require("ace/token_iterator").TokenIterator;

    //default completers
    const staticWordCompleter = {
      getCompletions: (editor, session, pos, prefix, callback) => {
        let list = this.autoCompleteApiList.map(
          ({ caption, value, newLine, selection, selectionType }) => {
            return {
              caption: caption,
              value: value,
              meta: "function",
              completer: {
                insertMatch: editor => {
                  editor.removeWordLeft();
                  editor.insert(value);
                  if (editor.curOp && !editor.curOp.command.name) {
                    editor.curOp.command.name = "mouse";
                    this.handleOnChange(undefined, editor);
                  }
                  setNewLine(editor, newLine);
                  setNewLines(editor, caption);
                  setSelectionWord(
                    editor,
                    getMatchedValue(newLine, value),
                    selection,
                    selectionType
                  );
                  // showSelectionWordList(selectionType);
                }
              }
            };
          }
        );

        function setNewLine(editor, newLine) {
          if (newLine === undefined) {
            return;
          }

          const valueRange = editor.find(newLine, {
            backwards: true,
            caseSensitive: true
          });
          if (valueRange === undefined) {
            return;
          }
          editor.selection.moveCursorToPosition(valueRange.end);
          editor.selection.clearSelection();
          editor.insert(editor.session.doc.getNewLineCharacter());
          if (editor.curOp && !editor.curOp.command.name) {
            // editor.curOp.command.name = "mouse";
            this.handleOnChange(undefined, editor);
          }
        }

        function setNewLines(editor, caption) {
          switch (caption) {
            case "switch~case":
              const afterNewLines = [
                `case "" :`,
                `break;`,
                `default :`,
                `break;`
              ];

              const afterNewLine = afterNewLines.join("");
              const valueRange = editor.find(afterNewLine, {
                backwards: false,
                caseSensitive: true
              });
              if (valueRange === undefined) {
                return;
              }

              editor.selection.moveCursorToPosition(valueRange.end);
              editor.selection.clearSelection();

              for (let i = afterNewLines.length - 1; i >= 0; i--) {
                setNewLine(editor, afterNewLines[i]);
              }
              break;
            default:
              break;
          }
        }

        function getMatchedValue(newLine, value) {
          if (newLine !== undefined) {
            return newLine;
          } else {
            return value;
          }
        }

        function setSelectionWord(editor, value, selection, selectionType) {
          if (selection === undefined) {
            return;
          }
          const valueRange = editor.find(value, {
            backwards: true,
            caseSensitive: true
          });
          if (valueRange === undefined) {
            return;
          }
          editor.selection.moveCursorToPosition(valueRange.start);
          const selectionRange = editor.find(selection, { backwards: false });
          if (selectionRange === undefined) {
            return;
          }
          editor.selection.setSelectionRange(
            selectionRange,
            isSelectionRangeReverse(selectionType)
          );
        }

        function isSelectionRangeReverse(selectionType) {
          return selectionType !== undefined;
        }

        // const showSelectionWordList = selectionType => {
        //   if (selectionType) {
        //     setTimeout(() => {
        //       this.langTools.setCompleters(this.getCompleters(selectionType));
        //       this.aceEditor.completer.showPopup(this.aceEditor);
        //       this.langTools.setCompleters(this.getCompleters("all"));
        //     }, 10); //TODO : remove delay
        //   }
        // };

        let start = prefix
          .split("")
          .reverse()
          .join("");

        const entries = this.JSEval.FindSymbol(
          start,
          {
            start: {
              line: pos.row + 1,
              column: pos.column
            },
            end: {
              line: pos.row + 1,
              column: pos.column
            }
          },
          this.symtab,
          true
        );

        if (Array.isArray(entries) === true) {
          entries.forEach(entry => {
            list.push({
              caption: entry.id,
              name: entry.id,
              value: entry.id,
              score: 1,
              meta: entry.type
            });
          });
        }

        return callback(null, list);
      }
    };

    const clearCompleterTarget = editor => {
      const start = editor.selection.getRange().start;
      const end = editor.selection.getRange().end;
      const line = editor.session.getLine(start.row);
      if (line[start.column - 1] && line[start.column - 1] !== `"`) {
        editor.removeWordLeft();
      }
      if (line[end.column] && line[end.column] !== `"`) {
        editor.removeWordRight();
      }
    };

    const soundCompleter = {
      getCompletions: (editor, session, pos, prefix, callback) => {
        const { soundIds } = this.props;
        callback(
          null,
          !soundIds
            ? null
            : soundIds.map(soundId => {
                const name = AssetLibrary.getSoundAsset(soundId).defaultName;
                return {
                  caption: name,
                  value: name,
                  meta: "Sound",
                  completer: {
                    insertMatch: editor => {
                      clearCompleterTarget(editor);
                      editor.insert(name);
                      if (editor.curOp && !editor.curOp.command.name) {
                        editor.curOp.command.name = "mouse";
                        this.handleOnChange(undefined, editor);
                      }
                      setTimeout(() => {
                        editor.completer.detach();
                      }, 10);

                      const newPos = {
                        row: pos.row,
                        column: session.getLine(pos.row).length
                      };
                      editor.selection.moveCursorToPosition(newPos);
                    }
                  }
                };
              })
        );
      }
    };

    const objectCompleter = {
      getCompletions: (editor, session, pos, prefix, callback) => {
        const { currentGameObjects } = this.props;
        callback(
          null,
          Object.keys(currentGameObjects).map(id => {
            const name = currentGameObjects[id].name;
            return {
              caption: name,
              value: name,
              meta: "Object",
              completer: {
                insertMatch: editor => {
                  clearCompleterTarget(editor);
                  editor.insert(name);
                  if (editor.curOp && !editor.curOp.command.name) {
                    editor.curOp.command.name = "mouse";
                    this.handleOnChange(undefined, editor);
                  }
                  setTimeout(() => {
                    editor.completer.detach();
                  }, 10);

                  let newLine = false;
                  const functions = session
                    .getLine(editor.selection.getRange().start.row)
                    .match(/([a-zA-Z_{1}][a-zA-Z0-9_]+)(?=\()/g);
                  if (functions && functions[0]) {
                    const f = functions[0];
                    if (f === "onOverlap") {
                      newLine = true;
                    }
                  }
                  const newPos = {
                    row: pos.row + (newLine ? 1 : 0),
                    column: session.getLine(pos.row).length
                  };
                  editor.selection.moveCursorToPosition(newPos);
                }
              }
            };
          })
        );
      }
    };

    const sceneCompleter = {
      getCompletions: (editor, session, pos, prefix, callback) => {
        const { sceneIds, scenes } = this.props;
        callback(
          null,
          sceneIds.map(id => {
            const name = scenes[id].name;
            return {
              caption: name,
              value: name,
              meta: "Scene",
              completer: {
                insertMatch: editor => {
                  clearCompleterTarget(editor);
                  editor.insert(name);
                  if (editor.curOp && !editor.curOp.command.name) {
                    editor.curOp.command.name = "mouse";
                    this.handleOnChange(undefined, editor);
                  }
                  setTimeout(() => {
                    editor.completer.detach();
                  }, 10);

                  const newPos = {
                    row: pos.row,
                    column: session.getLine(pos.row).length
                  };
                  editor.selection.moveCursorToPosition(newPos);
                }
              }
            };
          })
        );
      }
    };

    const directionCompleter = {
      getCompletions: (editor, session, pos, prefix, callback) => {
        const directions = ["left", "right", "up", "down"];
        callback(
          null,
          directions.map(name => {
            return {
              caption: name,
              value: name,
              meta: "Direction",
              completer: {
                insertMatch: editor => {
                  clearCompleterTarget(editor);
                  editor.insert(name);
                  if (editor.curOp && !editor.curOp.command.name) {
                    editor.curOp.command.name = "mouse";
                    this.handleOnChange(undefined, editor);
                  }
                  setTimeout(() => {
                    editor.completer.detach();
                  }, 10);

                  const newPos = {
                    row: pos.row + 1,
                    column: session.getLine(pos.row).length
                  };
                  editor.selection.moveCursorToPosition(newPos);
                }
              }
            };
          })
        );
      }
    };

    const keyCompleter = {
      getCompletions: (editor, session, pos, prefix, callback) => {
        const keys = [
          "left",
          "right",
          "up",
          "down",
          "shift",
          "control",
          "space",
          "enter",
          "esc",
          "f1",
          "f2",
          "f3",
          "f4",
          "f5",
          "f6",
          "f7",
          "f8",
          "f9",
          "f10",
          "f11",
          "f12"
        ];

        callback(
          null,
          keys.map(name => {
            return {
              caption: name,
              value: name,
              meta: "Key",
              completer: {
                insertMatch: editor => {
                  clearCompleterTarget(editor);
                  editor.insert(name);
                  if (editor.curOp && !editor.curOp.command.name) {
                    editor.curOp.command.name = "mouse";
                    this.handleOnChange(undefined, editor);
                  }
                  setTimeout(() => {
                    editor.completer.detach();
                  }, 10);

                  const newPos = {
                    row: pos.row + 1,
                    column: session.getLine(pos.row).length
                  };
                  editor.selection.moveCursorToPosition(newPos);
                }
              }
            };
          })
        );
      }
    };

    const colorCompleter = {
      getCompletions: (editor, session, pos, prefix, callback) => {
        const colors = window.HTML_Colors;
        const colorNames = Object.keys(colors);
        callback(
          null,
          colorNames.map(name => {
            return {
              caption: name,
              value: name,
              meta: "Color",
              completer: {
                insertMatch: editor => {
                  clearCompleterTarget(editor);
                  editor.insert(name);
                  if (editor.curOp && !editor.curOp.command.name) {
                    editor.curOp.command.name = "mouse";
                    this.handleOnChange(undefined, editor);
                  }
                  setTimeout(() => {
                    editor.completer.detach();
                  }, 10);

                  const newPos = {
                    row: pos.row,
                    column: session.getLine(pos.row).length
                  };
                  editor.selection.moveCursorToPosition(newPos);
                }
              }
            };
          })
        );
      }
    };

    const textCompleter = {
      getCompletions: (editor, session, pos, prefix, callback) => {
        const completer = this.langTools.textCompleter;
        const completions = completer.getCompletions(
          editor,
          session,
          pos,
          prefix,
          (e, items) => {
            const filteredItems = getFilteredItems(items, this.apiNameSet);
            callback(null, filteredItems);
          }
        );

        function getFilteredItems(items, apiNameSet) {
          return items.filter(item => {
            if (apiNameSet.has(item.caption)) {
              return false;
            } else if (isAlreadySignalName(item.caption)) {
              return false;
            } else if (isAlreadyGlobalValue(item.caption)) {
              return false;
            } else {
              return true;
            }
          });
        }

        function isAlreadySignalName(itemCaption) {
          for (let i = 0; i < signalNames.length; i++) {
            if (signalNames[i] === itemCaption) {
              return true;
            }
          }

          return false;
        }

        function isAlreadyGlobalValue(itemCaption) {
          for (let i = 0; i < globalValues.length; i++) {
            if (globalValues[i] === itemCaption) {
              return true;
            }
          }

          return false;
        }

        return completions;
      }
    };

    const signalCompleter = {
      getCompletions: (editor, session, pos, prefix, callback) => {
        callback(
          null,
          signalNames.map(name => {
            return {
              caption: name,
              value: name,
              meta: "Signal",
              completer: {
                insertMatch: editor => {
                  clearCompleterTarget(editor);
                  editor.insert(name);
                  if (editor.curOp && !editor.curOp.command.name) {
                    editor.curOp.command.name = "mouse";
                    this.handleOnChange(undefined, editor);
                  }
                  setTimeout(() => {
                    editor.completer.detach();
                  }, 10);

                  const newPos = {
                    row: pos.row + 1,
                    column: session.getLine(pos.row).length
                  };
                  editor.selection.moveCursorToPosition(newPos);
                }
              }
            };
          })
        );
      }
    };

    const globalValueCompleter = {
      getCompletions: (editor, session, pos, prefix, callback) => {
        callback(
          null,
          globalValues.map(function(name) {
            return {
              caption: name,
              value: name,
              meta: "Global"
            };
          })
        );
      }
    };

    this.completers = {
      staticWordCompleter,
      soundCompleter,
      objectCompleter,
      sceneCompleter,
      directionCompleter,
      keyCompleter,
      colorCompleter,
      textCompleter,
      signalCompleter,
      globalValueCompleter
    };

    this.langTools.setCompleters(this.getCompleters("all"));
  }

  setCode() {
    const { currentGameObject } = this.props;
    const code = currentGameObject ? currentGameObject.code : "";
    if (this.aceEditor.getValue() !== code) {
      this.aceEditor.setValue(code ? code : "", 1);
    }
    this.aceEditor.setReadOnly(!currentGameObject);
  }

  setWorkers() {
    if (window.Worker) {
      signalNameWorker = new Worker("/ace/worker-signal-name.js");
      globalValueWorker = new Worker("/ace/worker-global-value.js");
    }
  }

  setSignalNames() {
    if (window.Worker && signalNameWorker) {
      signalNameWorker.onmessage = function(e) {
        if (e === undefined || e.data === undefined) {
          return;
        }
        signalNames = e.data;
      };

      const { currentGameObjects, gameObjectIds } = this.props;
      signalNameWorker.postMessage({
        sprites: currentGameObjects,
        spriteIds: gameObjectIds
      });
    } else {
      // worker not supported logic
    }
  }

  setGlobalValues() {
    if (window.Worker && globalValueWorker) {
      globalValueWorker.onmessage = function(e) {
        if (e === undefined || e.data === undefined) {
          return;
        }

        globalValues = e.data;
      };

      const { currentGameObjects, gameObjectIds } = this.props;
      globalValueWorker.postMessage({
        sprites: currentGameObjects,
        spriteIds: gameObjectIds
      });
    } else {
      // worker not supported logic
    }
  }

  handleMousemove = e => {
    try {
      const tooltip = document.getElementById("EditorContainer3d_tooltip");
      const pos = e.getDocumentPosition();
      const line = e.editor.session.getLine(pos.row);

      // 해당 라인에 있는 함수들의 범위 구하기
      let funcsRanges = [];
      const funcRegex = /([a-zA-Z_{1}][a-zA-Z0-9_]+)(?=\()/gim;
      let funcMatch;
      while ((funcMatch = funcRegex.exec(line))) {
        funcsRanges.push({ start: funcMatch.index, end: funcRegex.lastIndex });
      }

      // 현재 커서가 있는 함수의 범위 구하기
      let currentFuncRange;
      for (let i = 0; i < funcsRanges.length; i++) {
        const funcRange = funcsRanges[i];
        if (funcRange.start <= pos.column && pos.column <= funcRange.end) {
          currentFuncRange = funcRange;
          break;
        }
      }

      // 현재 커서가 있는 함수의 이름 구하기
      if (currentFuncRange) {
        const currentFunctionName = line.substring(
          currentFuncRange.start,
          currentFuncRange.end
        );

        // 해당 함수의 api 정보 불러오기
        let api = this.apiList.find(api => api.name === currentFunctionName);
        if (!api) {
          tooltip.style.display = "none";
          return;
        }

        // 이름이 대체된 api라면 대체된 api의 정보를 불러오기
        const equal = api.equal;
        const caption = api.caption;
        if (equal) {
          api = { ...this.apiList.find(api => api.name === equal) };
          api.caption = caption;
        }

        // 툴팁 보여주기
        this.setState({ tooltip: { ...api } }, () => {
          tooltip.style.display = "block";
          tooltip.style.left = `${e.domEvent.offsetX}px`;
          tooltip.style.top = `${e.domEvent.offsetY + 18}px`;
        });
      } else {
        tooltip.style.display = "none";
      }
    } catch (e) {}
  };

  handleOnChange = (event, editor) => {
    const {
      currentSceneId,
      currentGameObject,
      updateGameObjectProperty
    } = this.props;
    if (!currentGameObject) {
      return;
    }

    const code = editor.getValue();
    const currentGameObjectId = currentGameObject.id;

    if (editor.completer === undefined) {
      try {
        editor.execCommand("startAutocomplete");
        editor.completer.detach();
        this.refreshCompleterPopupSize();
      } catch (e) {}
    }

    // If inserted number, disable autocomplete
    if (event) {
      editor.setOptions({ enableLiveAutocompletion: isNaN(event.lines[0]) });
    }

    if (this.JSEvaluatorTimer) {
      clearTimeout(this.JSEvaluatorTimer);
    }
    this.JSEvaluatorTimer = setTimeout(() => {
      this.parseJSEvaluator(code, editor);
    }, 3000);

    if (currentGameObjectId) {
      if (editor.curOp && editor.curOp.command.name) {
        updateGameObjectProperty(
          currentSceneId,
          currentGameObjectId,
          window.BabylonConstant.PROPERTY_ID.CODE,
          code
        );
      }
    }
  };

  parseJSEvaluator = (code, editor) => {
    // Parsing the code (JSEvaluator uses the Acorn)
    // let errors = [];
    // eslint-disable-next-line
    let annotations = [];

    // TODO:
    // Ugly way to enable the following code block only for the development version.
    if (enableJSEval) {
      // if (enableJSEval || window.location.hostname !== "dream.wizlab.net") {
      var ret;

      try {
        // Parsing the code (JSEvaluator uses the Acorn)
        ret = this.JSEval.parse(code);
      } catch (e) {
        // console.log("JSEvaluator", e);
        ret = false;
      }

      if (ret === true) {
        // Evaluating the parsed code (AST)
        // In order to build the symbol table and get the runtime errors
        let symtab;

        if (this.JSEval.build() === true) {
          symtab = this.JSEval.SymbolTable();
          // Update the symbol table only if the JSEval successfully built the table.
          // Otherwise uses the old table for the auto completions.
          if (symtab !== null) {
            this.symtab = symtab;
          }
        }
      }

      // errors = this.JSEval.getErrors();
    }

    annotations = editor.getSession().getAnnotations();
  };

  handleShowErrors = () => {
    const errors = this.props.errors;
    errors.forEach(item => {
      item.text = this.setErrorText(item);
      item.onClick = () => {
        let end = item.loc && item.loc.end;
        if (!end) return;
        let position = {
          row: end.line - 1,
          column: end.column
        };
        this.aceEditor.selection.moveCursorToPosition(position);
        this.aceEditor.selection.clearSelection();
      };
    });
  };

  setErrorText = item => {
    // let startLine = item.loc ? item.loc.start.line : item.row + 1;
    let message = item.message;

    let text = ``;
    if (/parameter/i.test(message)) {
      text += message.split(" ")[0] + " 함수는 ";
      text += message.split(" ")[2] + "개의 매개변수를 넣어주어야 해~";
    }
    if (/is undefined/i.test(message)) {
      text += message.split(" ")[0] + " 는 아직 정의되지 않은 것 같은데?";
    }
    if (/has already been declared/i.test(message)) {
      let name = message.match(/'\w+'/);
      text += `이미 정의된 ${name}를 다시 정의하고 있어.`;
    }
    if (/Cannot change the constant/i.test(message)) {
      let name = message.split(" ")[4];
      text += `const로 정의한 ${name}를 다시 정의하고 있군.`;
    }
    if (message === this.JSEval.ERROR_MESSAGE.FUNCTION_UPPER_LOWER) {
      text += `함수의 대소문자를 확인해봐.\n (${item.typingFunction} → ${item.originFunction})`;
    }
    if (!text) {
      text += "을 확인해봐!";
    }

    return text;
  };

  handleOnChangeSelection = (event, editor) => {
    let range = this.getSelectionRange();
    if (
      editor.curOp &&
      editor.curOp.selectionChanged &&
      editor.curOp.command.name
    ) {
      if (range) {
        range.byUser = true;
      }
    } else {
      return;
    }

    const line = editor.session.getLine(range.start.row);

    // 문자열의 범위 모두 구하기
    let quotesRanges = [];
    const quoteRegex = /'((?:\\.|[^'])*)'|"((?:\\.|[^"])*)"/gim;
    let quoteMatch;
    while ((quoteMatch = quoteRegex.exec(line))) {
      quotesRanges.push({ start: quoteMatch.index, end: quoteRegex.lastIndex });
    }
    // console.log("quotesRanges", quotesRanges);

    // 커서가 위치한 문자열을 현재 문자열로 저장
    let currentQuoteRange;
    for (let i in quotesRanges) {
      const quoteRange = quotesRanges[i];
      if (
        range.start.column === quoteRange.start + 1 ||
        range.end.column === quoteRange.end - 1
      ) {
        currentQuoteRange = quoteRange;
        break;
      }
    }
    // console.log("currentQuoteRange", currentQuoteRange);

    // 현재 문자열이 있으면 자동완성 활성화
    if (currentQuoteRange) {
      // 함수이름의 범위 모두 구하기
      let funcsRanges = [];
      const funcRegex = /([a-zA-Z_{1}][a-zA-Z0-9_]+)(?=\()/gim;
      let funcMatch;
      while ((funcMatch = funcRegex.exec(line))) {
        funcsRanges.push({ start: funcMatch.index, end: funcRegex.lastIndex });
      }
      // console.log("funcsRanges", funcsRanges);

      // 현재 문자열의 start에 가장 가까운 함수이름의 범위 구하기
      let currentFunctionRange;
      for (let i in funcsRanges) {
        const funcRange = funcsRanges[i];
        if (funcRange.end < currentQuoteRange.start) {
          currentFunctionRange = funcRange;
        } else {
          break;
        }
      }
      if (!currentFunctionRange) {
        return;
      }

      // 해당 함수의 이름 구하기
      const currentFunctionName = line.substring(
        currentFunctionRange.start,
        currentFunctionRange.end
      );
      // console.log("currentFunctionName", currentFunctionName);

      // 함수 이름으로 자동완성 리스트 업데이트 및 보여주기
      let list = this.autoCompleteApiList.filter(
        api => api.caption.indexOf(currentFunctionName) !== -1
      );

      if (list && list[0]) {
        let selectionType = list[0].selectionType;
        if (selectionType) {
          setTimeout(() => {
            this.isCustomCompleterOpen = true;
            this.langTools.setCompleters(this.getCompleters(selectionType));
            editor.completer.showPopup(editor);
            this.langTools.setCompleters(this.getCompleters("all"));
          }, 10);
        }
      }
    } else {
      // 문자열 밖에 커서가 있을 때는 커스텀 컴플리터를 해제
      if (this.isCustomCompleterOpen) {
        setTimeout(() => {
          this.isCustomCompleterOpen = false;
          editor.completer.detach();
        }, 10);
      }
    }
  };

  setSorting = () => {
    try {
      const code = this.aceEditor.getValue();
      const parsedCode = Parser.parseForSort(code);
      this.aceEditor.setValue(parsedCode, 1);
      toast.info("코드가 정렬되었습니다", {
        position: toast.POSITION.BOTTOM_RIGHT
      });

      this.aceEditor.curOp.command.name = "mouse";
      this.handleOnChange(undefined, this.aceEditor);
    } catch (e) {
      toast.warn("에러를 수정한 후 정렬해주세요", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  };

  setFontZoomIn = () => {
    const size = this.aceEditor.getFontSize() + 2;
    if (size > 50) {
      return;
    }
    localStorage.setItem("wizFontSize", size);
    this.aceEditor.setFontSize(size);
    this.refreshCompleterPopupSize();
  };

  setFontZoomOut = () => {
    const MIN_SIZE = 8;
    const size = this.aceEditor.getFontSize() - 2;
    if (size < MIN_SIZE) {
      return;
    }
    localStorage.setItem("wizFontSize", size);
    this.aceEditor.setFontSize(size);
    this.refreshCompleterPopupSize();
  };

  refreshCompleterPopupSize = () => {
    if (this.aceEditor.completer) {
      const percent = this.aceEditor.getFontSize() + 10 + "%";
      this.aceEditor.completer.popup.container.style.width = percent;
    }
  };

  getSelectionRange() {
    return this.aceEditor.selection.getRange();
  }

  componentWillUnmount() {
    window.clearTimeout(this.errorTimer);
  }

  render() {
    const { setSorting, setFontZoomIn, setFontZoomOut } = this;
    const { tooltip } = this.state;
    return (
      <View
        setSorting={setSorting}
        setFontZoomIn={setFontZoomIn}
        setFontZoomOut={setFontZoomOut}
        tooltip={tooltip}
        intl={this.props.intl}
        editorMode={this.props.editorMode}
      />
    );
  }
}
export default connect(
  state => {
    const sceneIds = state.game.sceneIds;
    const currentSceneId = state.interaction.currentSceneId;
    const currentScene = currentSceneId
      ? state.game.scenes[currentSceneId]
      : null;
    const soundIds = currentScene ? currentScene.soundIds : [];
    const gameObjectIds = currentScene ? currentScene.gameObjectIds : null;
    const currentGameObjects = currentScene ? currentScene.gameObjects : null;
    const currentGameObjectId =
      state.interaction.currentGameObjectIds[currentSceneId];
    const currentGameObject = currentGameObjects
      ? currentGameObjects[currentGameObjectId]
      : null;
    return {
      scenes: state.game.scenes,
      sceneIds,
      currentSceneId,
      soundIds,
      gameObjectIds,
      currentGameObjects,
      currentGameObject
    };
  },
  {
    updateGameObjectProperty: gameActions.updateGameObjectProperty
  }
)(withRouter(injectIntl(Container)));
