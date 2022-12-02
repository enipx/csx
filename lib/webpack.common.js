const path = require('path');

module.exports = {
  entry: {
    csx: './src/js/csx.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    library: {
      name: '[name]',
      type: 'umd',
      export: 'default',
    },
    globalObject: 'this',
    clean: true,
  },
  devtool: 'source-map',
};
