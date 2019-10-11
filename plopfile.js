const path = require('path');
const fs = require('fs');

module.exports = plop => {
  const templateDir = 'plop/templates';
  const src1 = 'src';

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
          path: `${src1}/{{kebabCase name}}/index.ts`,
          templateFile: templateDir + '/index.txt'
        },
        {
          type: 'add',
          path: `${src1}/{{kebabCase name}}/{{kebabCase name}}.ts`,
          templateFile: templateDir + '/function.txt'
        },
        {
          type: 'add',
          path: `${src1}/{{kebabCase name}}/{{kebabCase name}}.spec.ts`,
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
            .filter(({ file }) => '.internal' !== file)
            .map(({ file }) => file)
            .sort()
            .map(file => `export * from './${file}';`)
            .join('\n');

          fs.writeFileSync(`${src1}/taninsam.ts`, imports + '\n');
          return `update ${src1}/index.ts`;
        }
      ];
    }
  });
};
