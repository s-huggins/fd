const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const tailwindcss = require('tailwindcss');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    popup: path.resolve('src/popup/popup.tsx'),
    options: path.resolve('src/options/options.tsx'),
    background: path.resolve('src/background/background.ts'),
    contentScript: path.resolve('src/contentScript/contentScript.tsx')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
    ...getHtmlPlugins(['popup', 'options'])
  ],
  output: {
    filename: '[name].js',
    assetModuleFilename: 'assets/[name][ext]',
    path: path.resolve('dist'),
    publicPath: ''
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks(chunk) {
        return chunk.name !== 'contentScript';
      }
    }
  }
};

function getHtmlPlugins(chunks) {
  return chunks.map(
    chunk =>
      new HtmlPlugin({
        title: 'Frontdoor',
        filename: `${chunk}.html`,
        chunks: [chunk]
      })
  );
}
