/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  out: 'dist/docs',
  json: 'dist/docs/out.json',
  name: 'taninsam',
  exclude: '**/*+(index|.spec).ts',
  excludePrivate: true,
  excludeProtected: true,
  categorizeByGroup: false,
  plugin: ["typedoc-material-theme"],
  themeColor: "#fff",
};
