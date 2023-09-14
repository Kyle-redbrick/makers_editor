import { URL } from "../Util/Constant";

if (!String.prototype.toDreamclassS3URL) {
  String.prototype.toDreamclassS3URL = function () {
    // eslint-disable-line no-extend-native
    if (this.startsWith("http")) {
      return this;
    } else {
      return URL.S3_DREAMCLASS + this;
    }
  };
}

if (!String.prototype.THUMBNAIL_ALI) {
  String.prototype.THUMBNAIL_ALI = function () {
    // eslint-disable-line no-extend-native
    if (this.startsWith("http")) {
      return this;
    } else {
      return URL.THUMBNAIL_ALI + this;
    }
  };
}

if (!String.prototype.capitalized) {
  String.prototype.capitalized = function () {
    // eslint-disable-line no-extend-native
    if (this.length > 0) {
      return this[0].toUpperCase() + this.slice(1, this.length);
    } else {
      return this;
    }
  };
}
