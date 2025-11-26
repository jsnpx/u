// src/inquire.js
import {
  checkbox,
  confirm,
  editor,
  expand,
  input,
  number,
  password,
  rawlist,
  search,
  select
} from "@inquirer/prompts";
var prompts = {
  input,
  select,
  checkbox,
  confirm,
  number,
  search,
  password,
  expand,
  editor,
  rawlist
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
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
var cli = (usage, args = {}, options = {}) => {
  const argKeys = Object.keys(args);
  const commandParams = argKeys.map((key) => {
    const isOptional = "default" in args[key];
    return isOptional ? `[${key}]` : `<${key}>`;
  }).join(" ");
  const commandStr = argKeys.length > 0 ? `$0 ${commandParams}` : "$0";
  return yargs(hideBin(process.argv)).scriptName(usage).usage(`Usage: ${usage} ${argKeys.length ? "<args> " : ""}[options]`).command(commandStr, "", (y) => {
    Object.entries(args).forEach(([key, config]) => {
      y.positional(key, config);
    });
  }).options(options).help("h").parse();
};

// src/hb.js
import Handlebars from "handlebars";
import repeat from "handlebars-helper-repeat";
import helpers from "handlebars-helpers";
Handlebars.registerHelper("repeat", repeat);
helpers({
  handlebars: Handlebars
});
function hb(src, tpl) {
  const template = Handlebars.compile(tpl);
  return template(src);
}
export {
  cli,
  hb,
  inquire
};
