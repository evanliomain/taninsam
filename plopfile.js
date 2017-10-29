const path = require('path');
const fs = require('fs');

module.exports = plop => {
  const templateDir = 'plop/templates';
  const srcDir = 'src';

  // DEFINE PLOP GENERATORS
  plop.setGenerator('function', {
    description: 'Create a new function',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the function name?'
      }
    ],
    actions: data => {
      return [
        {
          type: 'add',
          path: `${srcDir}/{{camelCase name}}/index.ts`,
          templateFile: templateDir + '/index.txt'
        },
        {
          type: 'add',
          path: `${srcDir}/{{camelCase name}}/{{camelCase name}}.ts`,
          templateFile: templateDir + '/function.txt'
        },
        {
          type: 'add',
          path: `${srcDir}/{{camelCase name}}/{{camelCase name}}.spec.ts`,
          templateFile: templateDir + '/function.spec.txt'
        },
        function customAction() {
          const imports = fs
            .readdirSync(path.resolve(__dirname, 'src'))
            .map(file => ({
              file,
              pathfile: path.resolve(__dirname, 'src', file)
            }))
            .filter(({ pathfile }) => fs.lstatSync(pathfile).isDirectory())
            .filter(({ file }) => '@types' !== file)
            .map(({ file }) => file)
            .sort()
            .map(file => `export * from './${file}';`)
            .join('\n');

          fs.writeFileSync(`${srcDir}/taninsam.ts`, imports + '\n');
          return `update ${srcDir}/index.ts`;
        }
      ];
    }
  });
};
