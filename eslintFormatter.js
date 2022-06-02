/* eslint-disable @typescript-eslint/no-var-requires */
const { writeFileSync } = require('fs')
const { dirname, resolve } = require('path')
const { sync: mkdirp } = require('mkdirp')
const { CLIEngine } = require('eslint/lib/cli-engine')
const log = require('eslint/lib/shared/logging')
/* eslint-enable @typescript-eslint/no-var-requires */

const engine = new CLIEngine()

const formatters = [
  {
    name: 'html',
    output: 'file',
  },
  {
    name: 'json',
    output: 'file',
    parser: (result) => JSON.parse(result),
  },
  {
    name: 'stylish',
    output: 'console',
  },
];

const root = resolve(process.cwd())

module.exports = function (results, args) {
  var output = { reporters: {} };
  for (const formatterConfig of formatters || []) {
    const formatter = engine.getFormatter(formatterConfig.name);
    const formatterResult = formatter(results, args);

    switch (formatterConfig.output) {
      case 'console':
        log.info(formatterResult);
        break;
      case 'file':
        output.reporters[formatterConfig.name] = formatterConfig.parser
          ? formatterConfig.parser(formatterResult)
          : formatterResult;
    }
  }

  try {
    const filePath = resolve(root, './reports/eslint/eslint-report.json')
    mkdirp(dirname(filePath))
    writeFileSync(filePath, JSON.stringify(output))
  } catch (ex) {
    log.error('There was a problem writing the output file:\n%s', ex)
    return false
  }
}
