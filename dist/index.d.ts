import { rawlist, editor, expand, password, search, number, confirm, checkbox, select, input } from '@inquirer/prompts';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import Handlebars from 'handlebars';
import repeat from 'handlebars-helper-repeat';
import helpers from 'handlebars-helpers';

const prompts = {
  input, select, checkbox, confirm, number,
  search, password, expand, editor, rawlist
};

const inquire = async (questions) => {
  const answers = {};
  for (const x of questions) {
    const { name, type } = x;
    delete x.name;
    delete x.type;
    answers[name] = await prompts[type]({ ...x });
  }
  return answers;
};

/**
 * Creates a simplified CLI entry point.
 * @param {string} usage - The usage string (e.g. "npx @nocd/n")
 * @param {Object} [args] - Positional arguments (maps to command builder)
 * @param {Object} [options] - Flags/Options (maps to .options)
 */
const cli = (usage, args = {}, options = {}) => {
  const argKeys = Object.keys(args);
  const commandParams = argKeys.map(key => {
    // Check if 'default' is a key in the config object
    const isOptional = 'default' in args[key];
    return isOptional ? `[${key}]` : `<${key}>`;
  }).join(' ');

  const commandStr = argKeys.length > 0 
    ? `$0 ${commandParams}` 
    : '$0';

  return yargs(hideBin(process.argv))
    .scriptName(usage)
    .usage(`Usage: ${usage} ${argKeys.length ? '<args> ' : ''}[options]`)
    .command(commandStr, '', (y) => {
      Object.entries(args).forEach(([key, config]) => {
        y.positional(key, config);
      });
    })    
    .options(options)
    .help('h')
    .parse();
};

Handlebars.registerHelper('repeat', repeat);

helpers({
  handlebars: Handlebars
});

function hb(src, tpl) {
    const template = Handlebars.compile(tpl);
    return template(src);
}

export { cli, hb, inquire };
