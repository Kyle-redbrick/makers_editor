import * as acorn from "acorn";
import apiLibrary from "./apiLibrary";

const disableError = false;

class JSEvaluator {
  constructor(options) {
    this.AST = null;
    this.options = {
      callExpressionOnly: false, // true: Evaluate function body only if it is called, false: evaluate function body always
      ...options
    };
    this.mainFrame = null;
    this.Entry = {
      id: "symbolName",
      type: "object", // "object", "label", "function", "string", "number", "array", "block", "boolean", undefined
      value: null,
      params: undefined,
      kind: "let", // "let", "var", "const", "frame", "argument", "reserved", "native", "property"
      loc: {
        start: {
          line: 0,
          column: 0
        },
        end: {
          line: 0,
          column: 0
        },
        pos: {
          start: 0,
          end: 0
        }
      }
    };
    this.errors = [];
    this.parseErrors = [];
    this.reserved = [];
    this.lowerReservedIdMap = new Map();
    this.ERROR_MESSAGE = {
      FUNCTION_UPPER_LOWER: {}
    };
  }

  getErrors() {
    // return [...this.errors, ...this.parseErrors];
    return this.parseErrors;
  }

  resetErrors() {
    this.errors.length = 0;
    this.parseErrors.length = 0;
  }

  pushError(entry) {
    var error = this.errors.find(element => {
      if (element.loc.start.line !== entry.loc.start.line) {
        return false;
      }

      if (element.loc.end.line !== entry.loc.end.line) {
        return false;
      }

      if (element.loc.start.column !== entry.loc.start.column) {
        return false;
      }

      if (element.loc.end.column !== entry.loc.end.column) {
        return false;
      }

      if (element.type !== entry.type) {
        return false;
      }

      return true;
    });

    if (!error) {
      this.errors.push(entry);
      return true;
    }

    return false;
  }

  addReserved(reserved) {
    this.reserved = [...this.reserved, reserved];
  }

  setListOfReserved(list) {
    this.reserved = [...list];
    this.setLowerReservedIdSet();
  }

  setLowerReservedIdSet() {
    for (let i = 0; i < this.reserved.length; i++) {
      const origin = this.reserved[i].id;
      const lower = origin.toLowerCase();
      this.lowerReservedIdMap.set(lower, origin);
    }
  }

  getListOfReserved() {
    return this.reserved;
  }

  getReserved(id) {
    let ret = this.reserved.find(reserved => reserved.id === id);

    if (ret === undefined) {
      return null;
    }

    return {
      id: "Returns of the " + id,
      ...ret,
      kind: "reserved"
    };
  }

  valueType(value) {
    const type = typeof value;

    if (type === "object" && Array.isArray(value)) {
      return "array";
    }

    return type;
  }

  parse(code, isMerge) {
    this.parseErrors.length = 0;
    let lastLineTokens = {line:0, tokens:[]}
    try {
      this.AST = acorn.parse(code, {
        ecmaVersion: 9, // 3, 5, 6 (2015), 7 (2016), 8 (2017), 9 (2018), 10 (2019, partial support)
        sourceType: "script", // "module"
        onInsertedSemicolon: null,
        onTrailingComma: null,
        allowReserved: true,
        allowReturnOutsideFunction: false,
        allowImportExportEverywhere: false,
        allowAwaitOutsideFunction: true,
        allowHashBang: false,
        locations: true,
        onToken: token =>{
          if(lastLineTokens.line !== token.loc.start.line) {
            lastLineTokens.line = token.loc.start.line;
            lastLineTokens.tokens = [];
          }
          lastLineTokens.tokens.push(token);
        },
        onComment: null,
        ranges: false,
        program: isMerge ? this.AST : null, // The AST if we have, a current AST would be merged into this.
        sourceFile: false,
        directSourceFile: false,
        preserveParens: false
      });
    } catch (e) {
      //에러가 발생한 라인의 토큰 중 apiLibrary에 존재하는 토큰만 반환
      let errorKeywords = lastLineTokens.tokens.filter(t=>{
        if(t.value && isNaN(t.value)) {
          if(t.value.match(/^[0-9a-zA-Z]+$/)) {
            const api = apiLibrary.getAPIbyId(t.value);
            return api !== null;
          }
        }
        return false;
      }).map(t=>t.value)
      errorKeywords = [...new Set(errorKeywords)];

      this.printLog(e.name, ": ", e.message);
      this.parseErrors.push({
        type: "error",
        message: e.name + ": " + e.message,
        pos: e.pos,
        loc: {
          start: {
            line: e.loc.line,
            column: e.loc.column
          },
          end: {
            line: e.loc.line,
            column: e.loc.column
          }
        },
        keywords: errorKeywords
      });
      return false;
    }

    if (this.AST.type !== "Program") {
      this.parseErrors.push({
        type: "error",
        message: "Internal error: The type of the root node is not the Program",
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 0
          }
        }
      });
      this.AST = null;
      return false;
    }
    return true;
  }

  build() {
    this.mainFrame = null;
    this.errors.length = 0;

    try {
      var state = {
        frame: null,
        isActive: true,
        upStack: 0
      };

      this.printLog("Build!! symbol table", this.AST);
      this.ConsumeNode(this.AST, null, "lvalue", state);
    } catch (error) {
      this.printLog(error);
      return false;
    }

    return true;
  }

  SymbolTable() {
    return this.mainFrame;
  }

  ConsumeNode(node, parent, vType, state) {
    if (!node) {
      this.printLog("Empty node");
      return {
        type: undefined,
        value: undefined,
        params: undefined,
        kind: undefined
      };
    }

    if (!node.type) {
      this.printLog("Invalid type");
      return {
        type: undefined,
        value: undefined,
        params: undefined,
        kind: undefined
      };
    }

    if (typeof this[node.type] !== "function") {
      this.printLog("Unsupported type: ", node.type, node);
      return {
        type: undefined,
        value: undefined,
        params: undefined,
        kind: undefined
      };
    }

    return this[node.type](node, parent, vType, state);
  }

  // Returns pushed index of an entry.
  Push(entry, state) {
    if (!state) {
      this.mainFrame.value.stack.push(entry);
    } else {
      state.frame.value.stack.push(entry);
    }
  }

  // loc === null: global search
  // table === null: global table
  // isStartWidth === false: matched symbol
  FindSymbol(name, loc, frame, isStartWith, upStack) {
    let i;

    if (!frame) {
      frame = this.mainFrame;
    }

    if (!frame || !frame.value.stack) {
      this.printLog("Symbol Table is empty");
      return null;
    }

    // Step 1. Find the target frame using given "loc" information
    let targetFrame = null;
    if (typeof loc === "undefined") {
      targetFrame = frame;
    } else {
      let frameList = [];
      let list = [frame];
      let iter;

      do {
        iter = list.pop();
        frameList.push(iter);

        for (i = 0; i < iter.value.stack.length; i++) {
          if (iter.value.stack[i].kind === "frame") {
            list.unshift(iter.value.stack[i]);
          }
        }
      } while (list.length > 0);

      let accuracy;
      for (i = 0; i < frameList.length; i++) {
        if (loc.pos) {
          if (
            frameList[i].loc.pos.start <= loc.pos.start &&
            loc.pos.end <= frameList[i].loc.pos.end
          ) {
            if (targetFrame === null) {
              targetFrame = frameList[i];
              accuracy =
                loc.pos.start -
                frameList[i].loc.pos.start +
                (frameList[i].loc.pos.end - loc.pos.end);
            } else {
              let tmp =
                loc.pos.start -
                frameList[i].loc.pos.start +
                (frameList[i].loc.pos.end - loc.pos.end);
              if (tmp < accuracy) {
                accuracy = tmp;
                targetFrame = frameList[i];
              }
            }
          }
        } else if (
          frameList[i].loc.start.line <= loc.start.line &&
          loc.end.line <= frameList[i].loc.end.line
        ) {
          if (targetFrame === null) {
            targetFrame = frameList[i];
            accuracy =
              loc.start.line -
              frameList[i].loc.start.line +
              (frameList[i].loc.end.line - loc.end.line);
          } else {
            let tmp =
              loc.start.line -
              frameList[i].loc.start.line +
              (frameList[i].loc.end.line - loc.end.line);
            if (tmp < accuracy) {
              accuracy = tmp;
              targetFrame = frameList[i];
            }
          }
        }
      }
    }

    let list = isStartWith === true ? [] : null;
    if (!targetFrame) {
      targetFrame = frame;
      if (!targetFrame) {
        // Not found
        return list;
      }
    }

    // Find the symbol from the targetFrame.
    do {
      // Search in the local scope including arguments.
      for (i = 0; i < targetFrame.value.stack.length; i++) {
        if (targetFrame.value.stack[i].kind === "frame") {
          continue;
        }

        if (targetFrame.value.stack[i].kind === "argument") {
          continue;
        }

        if (isStartWith === true) {
          if (
            this.valueType(targetFrame.value.stack[i].id) === "string" &&
            targetFrame.value.stack[i].id.startsWith(name) === true
          ) {
            list.push(targetFrame.value.stack[i]);
          }
        } else if (targetFrame.value.stack[i].id === name) {
          return targetFrame.value.stack[i];
        }
      }

      // Search in the parameter list
      if (targetFrame.value.parent) {
        let idx = targetFrame.value.parent.value.stack.indexOf(targetFrame) - 1;
        while (
          idx >= 0 &&
          targetFrame.value.parent.value.stack[idx].kind === "argument"
        ) {
          if (isStartWith === true) {
            if (
              this.valueType(targetFrame.value.parent.value.stack[idx].id) ===
                "string" &&
              targetFrame.value.parent.value.stack[idx].id.startsWith(name) ===
                true
            ) {
              list.push(targetFrame.value.parent.value.stack[idx]);
            }
          } else if (targetFrame.value.parent.value.stack[idx].id === name) {
            return targetFrame.value.parent.value.stack[idx];
          }
          idx--;
        }
      }

      if (upStack) {
        // Try again from the parent frame
        targetFrame = targetFrame.value.parent;
      } else {
        // Or try again from the main frame. (global)
        if (targetFrame !== this.mainFrame) {
          targetFrame = this.mainFrame;
        } else {
          targetFrame = null;
        }
      }
    } while (targetFrame);

    return list;
  }

  // handlers for nodes
  //
  VariableDeclarator(node, parent, vType, state) {
    const left = this.ConsumeNode(node.id, node, "rvalue", state);
    let kind;

    if (left.kind === "reserved") {
      this.pushError({
        type: "error",
        message: left.id + " is a reserved as the " + left.type,
        loc: Object.assign(
          { pos: { start: node.id.start, end: node.id.end } },
          node.id.loc
        )
      });

      return left;
    }

    if (left.type !== undefined) {
      if (left.isGlobal) {
        this.pushError({
          type: "info",
          message: "The " + left.value + " would be the shadow variable",
          loc: Object.assign(
            { pos: { start: node.id.start, end: node.id.end } },
            node.id.loc
          )
        });
      } else {
        disableError &&
          this.pushError({
            type: "warning",
            message: left.id + " is already declared",
            loc: Object.assign(
              { pos: { start: node.id.start, end: node.id.end } },
              node.id.loc
            )
          });
      }

      // In this case, register this variable to the local scope
      kind = "let";
    } else {
      kind = parent.kind;
      if (kind === undefined) {
        this.printLog("Parent node has no kind field");
        kind = "var";
      }
    }

    // @NOTE:
    // node.init could be null.
    const value = this.ConsumeNode(node.init, node, "rvalue", state);

    let ret = Object.assign({}, this.Entry, {
      id: left.id,
      type: value.type,
      value: value.value,
      params: value.params,
      kind: kind,
      loc: Object.assign(
        {
          pos: {
            start: node.init ? node.init.start : node.start,
            end: node.init ? node.init.end : node.end
          }
        },
        node.init ? node.init.loc : node.loc
      )
    });

    if (kind === "var" && state.isActive === true) {
      // Push to the global scope
      this.Push(ret);
    } else {
      this.Push(ret, state);
    }

    return ret;
  }

  // Terminal node
  Identifier(node, parent, vType, state) {
    var entry;

    if (vType === "lvalue") {
      entry = {
        type: "identifier",
        value: node.name
      };
    } else {
      // Step 1. Find symbol in the given table first.
      entry = this.FindSymbol(
        node.name,
        node.loc,
        state.frame,
        false,
        state.upStack
      );
      if (!entry) {
        if (state.isActive === false && state.upStack === 0) {
          // Step 2. If the given table is for local scope,
          //         try to search again in the global scope table.
          entry = this.FindSymbol(node.name);
          if (entry) {
            entry.isGlobal = true; // Mark as global variable
          }
        }

        if (!entry) {
          // Step 3. If the symbol was not found,
          //         try to find it from the reserved table.
          entry = this.getReserved(node.name);
        }

        if (!entry) {
          entry = {
            id: node.name,
            type: undefined,
            value: undefined,
            params: undefined,
            kind: undefined
          };
        }
      }
    }

    return entry;
  }

  // Terminal node
  Literal(node, parent, vType, state) {
    return {
      type: this.valueType(node.value),
      value: node.value
    };
  }

  // hello = {
  //   test: "hi"
  // }
  ObjectExpression(node, parent, vType, state) {
    var value = {
      type: "object",
      value: {}
    };

    node.properties.forEach(property => {
      // property node is consisting with "key", "value"
      const eValue = this.ConsumeNode(property, node, "rvalue", state);
      value = {
        ...value,
        value: {
          ...value.value,
          ...eValue
        }
      };
    });

    return value;
  }

  // A child node of the ObjectExpression
  Property(node, parent, vType, state) {
    const left = this.ConsumeNode(
      node.key,
      node,
      node.computed ? "rvalue" : "lvalue",
      state
    );
    const right = this.ConsumeNode(node.value, node, "rvalue", state);

    if (left.type === undefined || left.type === "object") {
      this.pushError({
        type: "warning",
        message: left.id + " is " + left.type,
        loc: Object.assign(
          { pos: { start: node.key.start, end: node.key.end } },
          node.key.loc
        )
      });
    }

    if (right.type === undefined) {
      this.pushError({
        type: "warning",
        message: right.id + " is " + right.type,
        loc: Object.assign(
          {
            pos: {
              start: node.value ? node.value.start : node.start,
              end: node.value ? node.value.end : node.end
            }
          },
          node.value ? node.value.loc : node.loc
        )
      });
    }

    const ret = {
      [left.value]: {
        ...right,
        kind: "property"
      }
    };

    return ret;
  }

  CallExpression(node, parent, vType, state) {
    let evalArgs = [];
    let returns = {
      id: "Returns of the function",
      type: undefined,
      value: undefined,
      params: undefined,
      kind: undefined
    };

    // arguments and callee can have the assignment or the declaration statements.
    let funcName = this.ConsumeNode(node.callee, node, "rvalue", state);
    if (!funcName) {
      this.printLog(
        "Unsupported function call found, please check the reserved function list and its return value",
        node.callee
      );
      return returns;
    }

    node.arguments.forEach(argument => {
      const pArg = this.ConsumeNode(argument, node, vType, state);
      if (pArg.type === undefined && pArg.kind !== "argument") {
        this.pushError({
          type: "warning",
          message: pArg.id + " is undefined (call)",
          loc: Object.assign(
            { pos: { start: argument.start, end: argument.end } },
            argument.loc
          )
        });
      }

      evalArgs.push(pArg); // ignore return value
    });

    if (funcName.kind === undefined) {
      const lowerFuncNameId = funcName.id.toLowerCase();
      if (this.lowerReservedIdMap.has(lowerFuncNameId)) {
        this.pushError({
          type: "error",
          message: this.ERROR_MESSAGE.FUNCTION_UPPER_LOWER,
          typingFunction: funcName.id,
          originFunction: this.lowerReservedIdMap.get(lowerFuncNameId),
          loc: Object.assign(
            { pos: { start: node.callee.start, end: node.callee.end } },
            node.callee.loc
          )
        });
      }

      disableError &&
        this.pushError({
          type: "warning",
          message: funcName.value + " was not found in current scope",
          loc: Object.assign(
            { pos: { start: node.callee.start, end: node.callee.end } },
            node.callee.loc
          )
        });
    } else if (funcName.type === "function") {
      if (
        evalArgs.length !== funcName.requiredParamCount &&
        evalArgs.length !== funcName.params.length
      ) {
        this.pushError({
          type: "warning",
          message:
            funcName.id +
            " requires " +
            (funcName.params ? funcName.params.length : 0) +
            " parameters",
          loc: Object.assign(
            { pos: { start: node.callee.start, end: node.callee.end } },
            node.callee.loc
          )
        });
      }

      if (funcName.kind === "reserved") {
        if (typeof funcName.value === "object") {
          // TODO:
          // validate funcName.value which was given by the user (developer)
          if (
            typeof funcName.value.type === "undefined" ||
            typeof funcName.value.value === "undefined"
          ) {
            this.printLog(
              "Reserved function has invalid return value",
              funcName.value
            );
          } else {
            returns = funcName.value;
          }
        } else {
          this.printLog(
            "Reserved function has invalid type of value",
            funcName
          );
        }
      } else if (funcName.kind === "native") {
        if (typeof funcName.value === "object") {
          returns = funcName.value;
        } else {
          this.printLog("Native function returns none");
        }
      } else {
        let i;
        for (i = 0; i < funcName.params.length; i++) {
          const pEntry = this.ConsumeNode(
            funcName.params[i],
            node,
            "rvalue",
            state
          );

          const pValue = evalArgs[i] ? evalArgs[i] : pEntry;

          let e = Object.assign({}, this.Entry, {
            id: pEntry.id,
            type: pValue.type,
            value: pValue.value,
            params: pValue.params,
            kind: "argument", // let, var, const, argument, frame, reserved
            loc: Object.assign(
              { pos: { start: node.start, end: node.end } },
              node.loc
            )
          });

          this.Push(e, state);
        }

        return this.ConsumeNode(funcName.value, node, vType, state);
      }
    } else {
      this.pushError({
        type: "error",
        message: funcName.value + " is not a function",
        loc: Object.assign(
          { pos: { start: node.start, end: node.end } },
          node.loc
        )
      });
    }

    return returns;
  }

  UnaryExpression(node, parent, vType, state) {
    const entry = this.ConsumeNode(node.argument, node, "rvalue", state);
    let ret = { ...entry };

    if (ret.type === "function") {
      this.pushError({
        type: "warning",
        message: "trying to unary operation on a function " + entry.id,
        loc: Object.assign(
          {
            pos: {
              start: node.argument ? node.argument.start : node.start,
              end: node.argument ? node.argument.end : node.end
            }
          },
          node.argument ? node.argument.loc : node.loc
        )
      });
    }

    switch (node.operator) {
      case "-":
        if (ret.type !== "function" && ret.type !== "number") {
          this.pushError({
            type: "warning",
            message:
              "trying to unary operation on a " + ret.type + " " + entry.id,
            loc: Object.assign(
              { pos: { start: node.start, end: node.end } },
              node.loc
            )
          });
        }
        ret.value = -ret.value;
        ret.type = this.valueType(ret.value);
        break;
      case "!":
        ret.value = !ret.value;
        ret.type = this.valueType(ret.value);
        break;
      case "~":
        ret.value = ~ret.value;
        ret.type = this.valueType(ret.value);
        break;
      case "+":
        ret.value = Number(ret.value);
        ret.type = this.valueType(ret.value);
        break;
      case "typeof":
        ret.value = ret.type;
        ret.type = "string";
        break;
      case "delete":
        ret.value = undefined;
        ret.type = undefined;
        break;
      default:
        this.printLog("Unsupported UnaryOperator", node.operator);
        ret.value = undefined;
        ret.type = undefined;
        break;
    }

    return ret;
  }

  BinaryExpression(node, parent, vType, state) {
    let value;
    const left = this.ConsumeNode(node.left, node, "rvalue", state);
    const right = this.ConsumeNode(node.right, node, "rvalue", state);

    if (!left || !right) {
      this.printLog(left, right, "Not yet prepared to evaluate code");
      return {
        type: undefined,
        value: undefined,
        params: undefined,
        kind: undefined
      };
    }

    if (left.type === undefined && left.kind !== "argument") {
      this.pushError({
        type: "warning",
        message: left.id + " is undefined (binary)",
        loc: Object.assign(
          { pos: { start: node.left.start, end: node.left.end } },
          node.left.loc
        )
      });
    }

    if (right.type === undefined && right.kind !== "argument") {
      this.pushError({
        type: "warning",
        message: right.id + " is undefined (binary)",
        loc: Object.assign(
          { pos: { start: node.right.start, end: node.right.end } },
          node.right.loc
        )
      });
    }

    switch (node.operator) {
      case "<":
        value = left.value < right.value;
        break;
      case ">":
        value = left.value > right.value;
        break;
      case "<=":
        value = left.value <= right.value;
        break;
      case ">=":
        value = left.value >= right.value;
        break;
      case "!=":
        // eslint-disable-next-line
        value = left.value != right.value;
        break;
      case "!==":
        value = left.value !== right.value;
        break;
      case "==":
        // eslint-disable-next-line
        value = left.value == right.value;
        break;
      case "===":
        value = left.value === right.value;
        break;
      case "+":
        value = left.value + right.value;
        break;
      case "/":
        if (
          (left.kind !== "argument" && left.type !== "number") ||
          (right.kind !== "argument" && right.type !== "number")
        ) {
          this.pushError({
            type: "warning",
            message:
              "Trying to do a divide operation on the " +
              left.type +
              " | " +
              right.type,
            loc: Object.assign(
              { pos: { start: node.start, end: node.end } },
              node.loc
            )
          });
        }
        value = left.value / right.value;
        break;
      case "-":
        if (
          (left.kind !== "argument" && left.type !== "number") ||
          (right.kind !== "argument" && right.type !== "number")
        ) {
          this.pushError({
            type: "warning",
            message:
              "Trying to do a subtract operation on the " +
              left.type +
              " | " +
              right.type,
            loc: Object.assign(
              { pos: { start: node.start, end: node.end } },
              node.loc
            )
          });
        }
        value = left.value - right.value;
        break;
      case "*":
        if (
          (left.kind !== "argument" && left.type !== "number") ||
          (right.kind !== "argument" && right.type !== "number")
        ) {
          this.pushError({
            type: "warning",
            message:
              "Trying to do a multiply operation on the " +
              left.type +
              " | " +
              right.type,
            loc: Object.assign(
              { pos: { start: node.start, end: node.end } },
              node.loc
            )
          });
        }
        value = left.value * right.value;
        break;
      default:
        this.printLog("Unsupported binary expression", node.operator);
        value = undefined;
        break;
    }

    return {
      type: this.valueType(value),
      value: value,
      params: undefined,
      kind: "let"
    };
  }

  ArrayExpression(node, parent, vType, state) {
    var ret = [];

    node.elements.forEach(element => {
      ret.push(this.ConsumeNode(element, node, "rvalue", state));
    });

    return {
      type: "array",
      value: ret,
      params: undefined,
      kind: "let"
    };
  }

  // var func = function() {}
  FunctionExpression(node, parent, vType, state) {
    if (!this.options || !this.options.callExpressionOnly) {
      var localState = {
        frame: Object.assign({}, this.Entry, {
          id: "local",
          type: "block",
          value: {
            parent: null,
            stack: []
          },
          kind: "frame",
          loc: Object.assign(
            { pos: { start: node.start, end: node.end } },
            node.loc
          )
        }),
        isActive: false,
        upStack: 0
      };

      node.params.forEach(param => {
        const pEntry = this.ConsumeNode(param, node, "rvalue", localState);

        let entry = Object.assign({}, this.Entry, {
          id: pEntry.id,
          type: pEntry.type,
          value: pEntry.value,
          params: pEntry.params,
          kind: "argument",
          loc: Object.assign(
            { pos: { start: param.start, end: param.end } },
            param.loc
          )
        });
        this.Push(entry, localState);
      });
      this.ConsumeNode(node.body, node, vType, localState);
      this.printLog("localTable", localState, "globalTable", state);
    }

    return {
      type: "function",
      params: [...node.params],
      value: node.body
    };
  }

  ArrowFunctionExpression(node, parent, vType, state) {
    if (!this.options || !this.options.callExpressionOnly) {
      var localState = {
        frame: Object.assign({}, this.Entry, {
          id: "local",
          type: "block",
          value: {
            parent: null,
            stack: []
          },
          kind: "frame",
          loc: Object.assign(
            { pos: { start: node.start, end: node.end } },
            node.loc
          )
        }),
        isActive: false,
        upStack: 0
      };

      node.params.forEach(param => {
        const pEntry = this.ConsumeNode(param, node, "rvalue", localState);

        let entry = Object.assign({}, this.Entry, {
          id: pEntry.id,
          type: pEntry.type,
          value: pEntry.value,
          params: pEntry.params,
          kind: "argument",
          loc: Object.assign(
            { pos: { start: param.start, end: param.end } },
            param.loc
          )
        });
        this.Push(entry, localState);
      });
      this.ConsumeNode(node.body, node, vType, localState);
      this.printLog("localTable", localState, "globalTable", state);
    }

    return {
      type: "function",
      params: [...node.params],
      value: node.body
    };
  }

  FunctionDeclaration(node, parent, vType, state) {
    const funcName = this.ConsumeNode(node.id, parent, "rvalue", state);

    if (funcName.kind === "reserved") {
      this.pushError({
        type: "warning",
        message: funcName.id + " is reserved as a " + funcName.type,
        loc: Object.assign(
          { pos: { start: node.id.start, end: node.id.end } },
          node.id.loc
        )
      });

      return;
    }

    let kind = "var";
    if (funcName.kind !== undefined) {
      this.pushError({
        type: "warning",
        message: funcName.value + " is already declared as " + funcName.type,
        loc: Object.assign(
          { pos: { start: node.id.start, end: node.id.end } },
          node.id.loc
        )
      });
      kind = "let";
    }

    // CHECKME:
    // If the function was declared in a local scope, does it has to be registered as a local variable?
    // or add it to as a global variable?
    let entry = Object.assign({}, this.Entry, {
      id: funcName.id,
      type: "function",
      params: [...node.params],
      value: node.body,
      kind: kind,
      loc: Object.assign(
        { pos: { start: node.id.start, end: node.id.end } },
        node.id.loc
      )
    });
    this.Push(entry, state);

    if (!this.options || !this.options.callExpressionOnly) {
      // Evaluate body of the function
      var localState = {
        frame: Object.assign({}, this.Entry, {
          id: "local",
          type: "block",
          value: {
            parent: null,
            stack: []
          },
          kind: "frame",
          loc: Object.assign(
            { pos: { start: node.start, end: node.end } },
            node.loc
          )
        }),
        isActive: false,
        upStack: 0
      };

      node.params.forEach(param => {
        const pEntry = this.ConsumeNode(param, node, "rvalue", localState);
        entry = Object.assign({}, this.Entry, {
          id: pEntry.id,
          type: pEntry.type,
          value: pEntry.value,
          params: pEntry.params,
          kind: "argument",
          loc: Object.assign(
            { pos: { start: node.start, end: node.end } },
            node.loc
          )
        });
        this.Push(entry, localState);
      });

      this.ConsumeNode(node.body, node, vType, localState);
      this.printLog("localTable:", localState, "globalTable", state);
    }
  }

  ConditionalExpression(node, parent, vType, state) {
    const ret = this.ConsumeNode(node.test, node, "rvalue", state);
    const t = this.ConsumeNode(node.consequent, node, "rvalue", state);
    const f = this.ConsumeNode(node.alternate, node, "rvalue", state);

    return ret.value ? t : f;
  }

  // code: hello.text = "hi"
  MemberExpression(node, parent, vType, state) {
    const obj = this.ConsumeNode(node.object, node, "rvalue", state);
    const prop = this.ConsumeNode(
      node.property,
      node,
      node.computed ? "rvalue" : "lvalue",
      state
    );

    if (!obj) {
      this.printLog("Please check the reserved object list", node.object);
      return {
        id: undefined,
        type: undefined,
        value: undefined,
        params: undefined,
        kind: undefined
      };
    }

    if (obj.type === undefined) {
      disableError &&
        this.pushError({
          type: "error",
          message: "cannot access " + prop.value + " of undefined",
          loc: Object.assign(
            { pos: { start: node.object.start, end: node.object.end } },
            node.object.loc
          )
        });

      return obj;
    }

    if (obj.value === null || obj.value === undefined) {
      if (obj.kind === "reserved") {
        if (obj.type !== "object") {
          this.erros.push({
            type: "warning",
            message: "trying to change the property of a reserved " + obj.type,
            loc: Object.assign(
              { pos: { start: node.object.start, end: node.object.end } },
              node.object.loc
            )
          });
        }
      }

      obj.type = "object";
      obj.value = {
        [prop.value]: {
          type: undefined,
          value: undefined,
          params: undefined,
          kind: "property"
        }
      };
    }

    if (typeof obj.value[prop.value] === "undefined") {
      if (obj.type !== "object" && obj.type !== "array") {
        disableError &&
          this.pushError({
            type: "error",
            message:
              "cannot create property " + prop.value + " on the " + obj.type,
            loc: Object.assign(
              { pos: { start: node.object.start, end: node.object.end } },
              node.object.loc
            )
          });

        return obj;
      }
    } else if (typeof obj.value[prop.value] === "function") {
      return {
        id: prop.value,
        type: "function",
        value: null, // TODO: Return value of a function
        params: new Array(obj.value[prop.value].length), // Create an parameter array of a native function
        kind: "native"
      };
    } else if (obj.type !== "object") {
      return {
        id: prop.value,
        type: this.valueType(obj.value[prop.value]),
        value: obj.value[prop.value],
        params: undefined,
        kind: "native"
      };
    }

    return obj.value[prop.value];
  }

  BreakStatement(node, parent, vType, state) {
    const label = this.ConsumeNode(node.label, node, "rvalue", state);
    if (label.type === undefined) {
      return;
    }

    if (label.type !== "label") {
      this.pushError({
        type: "error",
        message: "label " + label.id + " was not found",
        loc: Object.assign(
          { pos: { start: node.label.start, end: node.label.end } },
          node.label.loc
        )
      });
    } else {
      this.ConsumeNode(label.value, node, vType, state);
    }
  }

  ContinueStatement(node, parent, vType, state) {
    const label = this.ConsumeNode(node.label, node, "rvalue", state);
    if (label.type === undefined) {
      return;
    }

    if (label.type !== "label") {
      this.pushError({
        type: "error",
        message: "label " + label.id + " was not found",
        loc: Object.assign(
          { pos: { start: node.label.start, end: node.label.end } },
          node.label.loc
        )
      });
    } else {
      this.ConsumeNode(label.value, node, vType, state);
    }
  }

  LabeledStatement(node, parent, vType, state) {
    const label = this.ConsumeNode(node.label, node, vType, state);

    const entry = Object.assign({}, this.Entry, {
      id: label.id,
      type: "label",
      params: undefined,
      value: node.body,
      kind: "let",
      loc: Object.assign(
        { pos: { start: node.start, end: node.end } },
        node.loc
      )
    });
    this.Push(entry, state);

    this.ConsumeNode(node.body, node, vType, state);
  }

  ReturnStatement(node, parent, vType, state) {
    return this.ConsumeNode(node.argument, node, vType, state);
  }

  ExpressionStatement(node, parent, vType, state) {
    return this.ConsumeNode(node.expression, node, vType, state);
  }

  AwaitExpression(node, parent, vType, state) {
    return this.ConsumeNode(node.argument, node, vType, state);
  }

  AssignmentExpression(node, parent, vType, state) {
    let left = this.ConsumeNode(node.left, node, "rvalue", state);
    const right = this.ConsumeNode(node.right, node, "rvalue", state);

    if (!left || !right) {
      this.printLog(left, right, "Not yet prepared to evaluate code");
      return {
        type: undefined,
        value: undefined,
        params: undefined,
        kind: undefined
      };
    }

    if (right.type === undefined && right.kind !== "argument") {
      disableError &&
        this.pushError({
          type: "warning",
          message: right.id + " is undefined (assign)",
          loc: Object.assign(
            { pos: { start: node.right.start, end: node.right.end } },
            node.right.loc
          )
        });
    }

    if (left.kind === "reserved") {
      if (left.type === "function") {
        this.pushError({
          type: "error",
          message: "Cannot assign a value to the reserved function " + left.id,
          loc: Object.assign(
            { pos: { start: node.left.start, end: node.left.end } },
            node.left.loc
          )
        });

        return left;
      }
    } else if (left.kind === undefined) {
      // NOTE
      // Create a new variable
      left = Object.assign({}, this.Entry, {
        id: left.id,
        type: right.type,
        value: right.value,
        params: right.params,
        kind: "var", // let, var, const
        loc: Object.assign(
          { pos: { start: node.left.start, end: node.left.end } },
          node.left.loc
        )
      });

      if (state.isActive === true) {
        // Push to the global table.
        this.Push(left);
      } else {
        this.Push(left, state);
      }
    } else if (left.kind === "const") {
      this.pushError({
        type: "error",
        message: "Cannot change the constant " + left.id,
        loc: Object.assign(
          { pos: { start: node.left.start, end: node.left.end } },
          node.left.loc
        )
      });

      return left;
    }

    switch (node.operator) {
      case "=":
        left.value = right.value;
        left.params = right.params;
        left.type = right.type;
        break;
      case "+=":
        left.value += right.value;
        left.type = this.valueType(left.value);
        break;
      case "-=":
        if (right.type !== "number" || left.type !== "number") {
          this.pushError({
            type: "warning",
            message:
              "Trying to do a " +
              node.operator +
              " operation on the " +
              right.type +
              "/" +
              left.type,
            loc: Object.assign(
              { pos: { start: node.start, end: node.end } },
              node.loc
            )
          });
        }
        left.value -= right.value;
        left.type = this.valueType(left.value);
        break;
      case "*=":
        if (right.type !== "number" || left.type !== "number") {
          this.pushError({
            type: "warning",
            message:
              "Trying to do a " +
              node.operator +
              " operation on the " +
              right.type +
              "/" +
              left.type,
            loc: Object.assign(
              { pos: { start: node.start, end: node.end } },
              node.loc
            )
          });
        }
        left.value *= right.value;
        left.type = this.valueType(left.value);
        break;
      case "/=":
        if (right.type !== "number" || left.type !== "number") {
          this.pushError({
            type: "warning",
            message:
              "Trying to do a " +
              node.operator +
              " operation on the " +
              right.type +
              "/" +
              left.type,
            loc: Object.assign(
              { pos: { start: node.start, end: node.end } },
              node.loc
            )
          });
        }

        left.value /= right.value;
        left.type = this.valueType(left.value);
        break;
      default:
        this.printLog("unsupported operator", node.operator);
    }

    return left;
  }

  DoWhileStatement(node, parent, vType, state) {
    this.ConsumeNode(node.test, node, "rvalue", state);
    this.ConsumeNode(node.body, node, vType, state);
  }

  WhileStatement(node, parent, vType, state) {
    this.ConsumeNode(node.test, node, "rvalue", state);
    this.ConsumeNode(node.body, node, vType, state);
  }

  UpdateExpression(node, parent, vType, state) {
    let v;

    v = this.ConsumeNode(node.argument, node, "rvalue", state);
    if (v.type === undefined && v.kind !== "argument") {
      disableError &&
        this.pushError({
          type: "warning",
          message: v.id + " is undefined (update)",
          loc: Object.assign(
            { pos: { start: node.start, end: node.end } },
            node.loc
          )
        });
    }

    switch (node.operator) {
      case "++":
        if (v.type !== "number" && v.kind !== "argument") {
          disableError &&
            this.pushError({
              type: "info",
              message: v.value + " is not a number type",
              loc: Object.assign(
                { pos: { start: node.start, end: node.end } },
                node.loc
              )
            });
        }
        v.value++;
        break;
      case "--":
        if (v.type !== "number" && v.kind !== "argument") {
          disableError &&
            this.pushError({
              type: "info",
              message: v.value + " is not a number type",
              loc: Object.assign(
                { pos: { start: node.start, end: node.end } },
                node.loc
              )
            });
        }
        v.value--;
        break;
      default:
        this.printLog("Unsupported update operator", node.operator);
        v = {
          type: undefined,
          value: undefined
        };
        break;
    }

    return v;
  }

  ForStatement(node, parent, vType, state) {
    this.ConsumeNode(node.init, node, "rvalue", state);
    this.ConsumeNode(node.test, node, "rvalue", state);

    state.upStack++;
    this.ConsumeNode(node.body, node, vType, state);
    state.upStack--;

    this.ConsumeNode(node.update, node, "rvalue", state);
  }

  BlockStatement(node, parent, vType, state) {
    let entry = Object.assign({}, this.Entry, {
      id: null,
      type: "block",
      value: {
        parent: state.frame,
        stack: []
      },
      kind: "frame",
      loc: Object.assign(
        { pos: { start: node.start, end: node.end } },
        node.loc
      )
    });

    this.Push(entry, state);

    let frame = state.frame;
    state.frame = entry;

    let list = [
      {
        id: "Result of the function call",
        type: undefined,
        value: undefined,
        params: undefined
      }
    ];

    node.body.forEach(statement => {
      const ret = this.ConsumeNode(statement, node, vType, state);
      if (statement.type === "ReturnStatement") {
        list.unshift(ret);
      }
    });

    state.frame = frame;

    return list[0];
  }

  IfStatement(node, parent, vType, state) {
    this.ConsumeNode(node.test, node, vType, state);
    this.ConsumeNode(node.consequent, node, vType, state);
    this.ConsumeNode(node.alternate, node, vType, state);
  }

  SwitchStatement(node, parent, vType, state) {
    this.ConsumeNode(node.discriminant, node, vType, state);
    node.cases.forEach(statement =>
      this.ConsumeNode(statement, node, vType, state)
    );
  }

  SwitchCase(node, parent, vType, state) {
    this.ConsumeNode(node.test, node, vType, state);
    node.consequent.forEach(statement =>
      this.ConsumeNode(statement, node, vType, state)
    );
  }

  Program(node, parent, vType, state) {
    this.mainFrame = state.frame = Object.assign({}, this.Entry, {
      id: "main",
      type: "block",
      value: {
        parent: null,
        stack: []
      },
      kind: "frame",
      loc: Object.assign(
        { pos: { start: node.start, end: node.end } },
        node.loc
      )
    });

    node.body.forEach(statement =>
      this.ConsumeNode(statement, node, "lvalue", state)
    );
  }

  VariableDeclaration(node, parent, vType, state) {
    node.declarations.forEach(declaration =>
      this.ConsumeNode(declaration, node, "lvalue", state)
    );
  }

  // TODO:
  // Following methods are not implemented node handlers.
  //
  ParenthesizedExpression(node, parent, vType, state) {
    this.printLog("Not implemented", node);
    return {
      type: undefined,
      value: undefined,
      params: undefined,
      kind: undefined
    };
  }

  ClassDeclaration(node, parent, vType, state) {
    this.printLog("Not implemented", node);
    return {
      type: undefined,
      value: undefined,
      params: undefined,
      kind: undefined
    };
  }

  ClassExpression(node, parent, vType, state) {
    this.printLog("Not implemented", node);
    return {
      type: undefined,
      value: undefined,
      params: undefined,
      kind: undefined
    };
  }

  SequenceExpression(node, parent, vType, state) {
    this.printLog("Not implemented", node);
    return {
      type: undefined,
      value: undefined,
      params: undefined,
      kind: undefined
    };
  }

  LogicalExpression(node, parent, vType, state) {
    this.printLog("Not implemented", node);
    return {
      type: undefined,
      value: undefined,
      params: undefined,
      kind: undefined
    };
  }

  TaggedTemplateExpression(node, parent, vType, state) {
    this.printLog("Not implemented", node);
    return {
      type: undefined,
      value: undefined,
      params: undefined,
      kind: undefined
    };
  }

  ThisExpression(node, parent, vType, state) {
    this.printLog("Not implemented", node);
    return {
      type: undefined,
      value: undefined,
      params: undefined,
      kind: undefined
    };
  }

  NewExpression(node, parent, vType, state) {
    this.printLog("Not implemented", node);
    return {
      type: undefined,
      value: undefined,
      params: undefined,
      kind: undefined
    };
  }

  ObjectPattern(node, parent, vType, state) {
    this.printLog("Not implemented", node);
    return {
      type: undefined,
      value: undefined,
      params: undefined,
      kind: undefined
    };
  }

  YieldExpression(node, parent, vType, state) {
    this.printLog("Not implemented", node);
    return {
      type: undefined,
      value: undefined,
      params: undefined,
      kind: undefined
    };
  }

  DebuggerStatement(node, parent, vType, state) {
    this.printLog("Not implemented", node);
    return {
      type: undefined,
      value: undefined,
      params: undefined,
      kind: undefined
    };
  }

  ThrowStatement(node, parent, vType, state) {
    this.printLog("Not implemented", node);
    return {
      type: undefined,
      value: undefined,
      params: undefined,
      kind: undefined
    };
  }

  TryStatement(node, parent, vType, state) {
    this.printLog("Not implemented", node);
    return {
      type: undefined,
      value: undefined,
      params: undefined,
      kind: undefined
    };
  }

  WithStatement(node, parent, vType, state) {
    this.printLog("Not implemented", node);
    return {
      type: undefined,
      value: undefined,
      params: undefined,
      kind: undefined
    };
  }

  EmptyStatement(node, parent, vType, state) {
    this.printLog("Not implemented", node);
    return {
      type: undefined,
      value: undefined,
      params: undefined,
      kind: undefined
    };
  }

  ForInStatement(node, parent, vType, state) {
    this.printLog("Not implemented", node);
    return {
      type: undefined,
      value: undefined,
      params: undefined,
      kind: undefined
    };
  }

  ForOfStatement(node, parent, vType, state) {
    this.printLog("Not implemented", node);
    return {
      type: undefined,
      value: undefined,
      params: undefined,
      kind: undefined
    };
  }

  printLog() {
    // console.log(...arguments);
  }
}

export default JSEvaluator;
