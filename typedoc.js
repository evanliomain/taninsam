module.exports = {
  out: 'dist/docs',
  json: 'dist/docs/out.json',
  name: 'taninsam',
  exclude: '**/*+(index|.spec).ts',
  mode: 'file',
  target: 'es6',
  excludePrivate: true,
  excludeProtected: true,
  categorizeByGroup: false,
  theme: 'node_modules/typedoc-default-themes-bugfixed/bin/default'
};
