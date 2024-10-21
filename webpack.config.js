import path from 'path';
import Dotenv from 'dotenv-webpack';

export default {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist'),
    libraryTarget: 'module',
    chunkFormat: 'module',
  },
  plugins: [new Dotenv()],
  experiments: {
    outputModule: true,
  },
  resolve: {
    extensions: ['.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  target: 'node',
};
