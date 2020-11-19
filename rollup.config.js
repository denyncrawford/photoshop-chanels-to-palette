import babel from '@rollup/plugin-babel';
import { resolve } from 'path'

export default {
  input: 'src/palettepicker.js',
  output: {
    file: resolve(__dirname, './dist/palettepicker.js'),
    format: 'iife'
  },
  plugins: [babel({ babelHelpers: 'bundled' })]
};