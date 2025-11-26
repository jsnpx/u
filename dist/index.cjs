var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var index_exports = {};
__export(index_exports, {
  cli: () => cli,
  hb: () => hb,
  inquire: () => inquire
});
module.exports = __toCommonJS(index_exports);

// src/inquire.js
var import_prompts = require("@inquirer/prompts");
var prompts = {
  input: import_prompts.input,
  select: import_prompts.select,
  checkbox: import_prompts.checkbox,
  confirm: import_prompts.confirm,
  number: import_prompts.number,
  search: import_prompts.search,
  password: import_prompts.password,
  expand: import_prompts.expand,
  editor: import_prompts.editor,
  rawlist: import_prompts.rawlist
};
var inquire = async (questions) => {
  const answers = {};
  for (const x of questions) {
    const { name, type } = x;
    delete x.name;
    delete x.type;
    answers[name] = await prompts[type]({ ...x });
  }
  return answers;
};

// src/cli.js
var import_yargs = __toESM(require("yargs"), 1);
var import_helpers = require("yargs/helpers");
var cli = (usage, args = {}, options = {}) => {
  const argKeys = Object.keys(args);
  const commandParams = argKeys.map((key) => {
    const isOptional = "default" in args[key];
    return isOptional ? `[${key}]` : `<${key}>`;
  }).join(" ");
  const commandStr = argKeys.length > 0 ? `$0 ${commandParams}` : "$0";
  return (0, import_yargs.default)((0, import_helpers.hideBin)(process.argv)).scriptName(usage).usage(`Usage: ${usage} ${argKeys.length ? "<args> " : ""}[options]`).command(commandStr, "", (y) => {
    Object.entries(args).forEach(([key, config]) => {
      y.positional(key, config);
    });
  }).options(options).help("h").parse();
};

// src/hb.js
var import_handlebars = __toESM(require("handlebars"), 1);
var import_handlebars_helper_repeat = __toESM(require("handlebars-helper-repeat"), 1);
var import_handlebars_helpers = __toESM(require("handlebars-helpers"), 1);
import_handlebars.default.registerHelper("repeat", import_handlebars_helper_repeat.default);
(0, import_handlebars_helpers.default)({
  handlebars: import_handlebars.default
});
function hb(src, tpl) {
  const template = import_handlebars.default.compile(tpl);
  return template(src);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cli,
  hb,
  inquire
});
