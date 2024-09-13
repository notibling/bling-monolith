import { GeneralUtils } from "./General";

class StringUtils {
  static escape(str: string) {
    return str.replace(/\\n/g, '').replace(/`/g, '\\`');
  }

  static isStringifiedJSON(str: string) {
    try {
      const jsonObjectRegex = /^\s*(\{.*\}|\[.*\])\s*$/;
      if (str.trim().match(jsonObjectRegex)) {
        return Boolean(GeneralUtils.toObject(str));
      }
    } catch (e) {
      return false;
    }
  }
}

export { StringUtils }