class WizError {
  constructor(props = {}) {
    this.payload = props.payload;
    this.intl = props.intl;
  }

  static create(props) {
    if (props.error instanceof Error) {
      return new WizErrorStandard(props);
    } else {
      return new WizErrorCustom(props);
    }
  }

  getTitle() {
    const { formatMessage } = this.intl;
    return formatMessage({ id: "ID_WIZERROR_TITLE_ERROR" });
  }

  getMessage() {
    let message = this.getErrorMessage();
    const locationMessage = this.getLocationMessage();
    if (locationMessage) {
      message += `\n${locationMessage}`;
    }
    return message;
  }

  getErrorMessage() {
    const { formatMessage } = this.intl;
    return formatMessage({ id: "ID_WIZERROR_MESSAGE_UNKNOWN" });
  }

  getLocationMessage() {}
}

class WizErrorStandard extends WizError {
  constructor(props = {}) {
    super(props);
    this.error = props.error;
  }

  getTitle() {
    const { formatMessage } = this.intl;
    const id = `ID_WIZERROR_TITLE_${this.error.name.toUpperCase()}`;
    return formatMessage({ id });
  }

  getErrorMessage() {
    const errorType = this.error.constructor.name;
    const getMessageByType = this[`get${errorType}Message`];
    if (getMessageByType) {
      return getMessageByType.bind(this)();
    } else {
      return this.error.message;
    }
  }

  getSyntaxErrorMessage() {
    const { message } = this.error;
    const { formatMessage } = this.intl;
    if (message.includes("Unexpected token")) {
      return formatMessage({ id: "ID_WIZERROR_MESSAGE_UNEXPECTED_TOKEN" });
    } else if (message.includes("Unterminated string constant")) {
      return formatMessage({ id: "ID_WIZERROR_MESSAGE_UNTERMINATED_STRING" });
    } else if (message.includes("Identifier directly after number")) {
      return formatMessage({
        id: "ID_WIZERROR_MESSAGE_IDENTIFIER_AFTER_NUMBER"
      });
    } else if (message.includes("'return' outside of function")) {
      return formatMessage({
        id: "ID_WIZERROR_MESSAGE_RETURN_OUSTIDE_OF_FUNCTION"
      });
    } else if (message.includes("Unsyntactic break")) {
      return formatMessage({
        id: "ID_WIZERROR_MESSAGE_UNSYNTACTIC_BREAK"
      });
    } else if (message.includes("Unsyntactic continue")) {
      return formatMessage({
        id: "ID_WIZERROR_MESSAGE_UNSYNTACTIC_CONTINUE"
      });
    } else {
      return message;
    }
  }

  getReferenceErrorMessage() {
    const { message } = this.error;
    const { formatMessage } = this.intl;
    if (message.includes(" is not defined")) {
      const symbol = message.split(" is not defined")[0];
      return formatMessage(
        { id: "ID_WIZERROR_MESSAGE_NOT_DEFINED" },
        { symbol }
      );
    } else {
      return message;
    }
  }

  getTypeErrorMessage() {
    const { message } = this.error;
    const { formatMessage } = this.intl;
    if (message.includes(" is not a function")) {
      const symbol = message.split(" is not a function")[0];
      return formatMessage(
        { id: "ID_WIZERROR_MESSAGE_NOT_FUNCTION" },
        { symbol }
      );
    } else if (message.includes("Cannot read property ")) {
      const symbol = message.split("'")[1];
      return formatMessage(
        { id: "ID_WIZERROR_MESSAGE_CANNOT_READ_PROPERTY" },
        { symbol }
      );
    } else if (
      message.includes("Right-hand side of 'instanceof' is not an object")
    ) {
      return formatMessage({
        id: "ID_WIZERROR_MESSAGE_INSTANCEOF_RIGHT_NOT_OBJECT"
      });
    } else {
      return formatMessage({
        id: "ID_WIZERROR_MESSAGE_CANNOT_READ_PROPERTIES"
      });
      //return message;
    }
  }

  getLocationMessage() {
    const { loc } = this.error;
    const { sceneId, spriteId, sceneName, gameObjectName } = this.payload || {};
    const { formatMessage } = this.intl;
    const state = {
      sceneId,
      spriteId,
      sceneName,
      gameObjectName,
      line: loc ? loc.line : undefined,
      column: loc ? loc.column + 1 : undefined
    };
    if (loc) {
      if (sceneId && spriteId) {
        return formatMessage({ id: "ID_WIZERROR_LOCATION_FULL" }, state);
      } else if (sceneName && gameObjectName) {
        return formatMessage({ id: "ID_WIZERROR_LOCATION_FULL_3D" }, state);
      } else {
        return formatMessage({ id: "ID_WIZERROR_LOCATION_LINE_COLUMN" }, state);
      }
    } else {
      if (sceneId && spriteId) {
        return formatMessage(
          { id: "ID_WIZERROR_LOCATION_SCENE_SPRITE" },
          state
        );
      } else if (sceneName && gameObjectName) {
        return formatMessage(
          { id: "ID_WIZERROR_LOCATION_SCENE_OBJECT" },
          state
        );
      } else {
        return;
      }
    }
  }
}

class WizErrorCustom extends WizError {
  constructor(props = {}) {
    super(props);
    this.type = props.error;
  }

  getTitle() {
    const { formatMessage } = this.intl;
    return formatMessage({
      id: `ID_WIZERROR_TITLE_${this.type.toUpperCase()}`
    });
  }

  getErrorMessage() {
    const { formatMessage } = this.intl;
    return formatMessage({
      id: `ID_WIZERROR_MESSAGE_${this.type.toUpperCase()}`
    });
  }

  getLocationMessage() {
    if (!this.payload || !this.payload.api) return;
    const { api, sceneId, spriteId } = this.payload;
    if (sceneId && spriteId) {
      const { formatMessage } = this.intl;
      const state = { sceneId, spriteId, api };
      return formatMessage(
        { id: "ID_WIZERROR_LOCATION_SCENE_SPRITE_API" },
        state
      );
    } 
    const { sceneName, gameObjectName } = this.payload;
    if (sceneName && gameObjectName) {
      const { formatMessage } = this.intl;
      const state = { sceneName, gameObjectName, api };
      return formatMessage(
        { id: "ID_WIZERROR_LOCATION_SCENE_OBJECT_API" },
        state
      );
    }
  }
}

export default WizError;
