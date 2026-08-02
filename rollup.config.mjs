import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json' with { type: 'json' };

export default {
  input: `compiled/${pkg.name}.js`,
  output: [
    { file: pkg.main, name: pkg.name, format: 'umd', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: { include: 'compiled/**' },
  plugins: [
    typescript(),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
  ],
  onwarn(warning, warn) {
    if ('THIS_IS_UNDEFINED' === warning.code) {
      return;
    }
    warn(warning); // this requires Rollup 0.46
  },
};
