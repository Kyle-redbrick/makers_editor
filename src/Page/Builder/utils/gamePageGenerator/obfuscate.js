import JavaScriptObfuscator from "javascript-obfuscator";

export default function obfuscate(code) {
  var obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
    compact: true,
    controlFlowFlattening: false,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: false,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: false,
    domainLock: [],
    identifierNamesGenerator: "hexadecimal",
    identifiersDictionary: [],
    identifiersPrefix: "",
    inputFileName: "",
    log: false,
    numbersToExpressions: false,
    optionsPreset: "default",
    renameGlobals: false,
    renameProperties: false,
    reservedNames: [],
    reservedStrings: [],
    rotateStringArray: true,
    seed: 0,
    selfDefending: false,
    shuffleStringArray: true,
    simplify: true,
    sourceMap: false,
    sourceMapBaseUrl: "",
    sourceMapFileName: "",
    sourceMapMode: "separate",
    splitStrings: true,
    splitStringsChunkLength: 5,
    stringArray: true,
    stringArrayEncoding: false,
    stringArrayThreshold: 0.75,
    target: "browser",
    transformObjectKeys: false,
    unicodeEscapeSequence: false
  });

  return obfuscationResult.getObfuscatedCode();
}
