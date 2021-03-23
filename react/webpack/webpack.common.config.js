const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const dist = 'dist';

const output = {
  filename: '[name].js',
  path: path.join(__dirname, '..', dist),
};

const config = {
  entry: {
    options: path.join(__dirname, '..', 'src', 'js', 'option', 'index.tsx'),
    background: path.join(__dirname, '..', 'src', 'js', 'background.ts'),
    content: path.join(__dirname, '..', 'src', 'js', 'content', 'content.tsx'),
  },
  target: 'web',
  output,
  module: {
    rules: [
      {
        parser: {
          dataUrlCondition: (source, { filename, module }) => {
            console.log({ source, filename, module });
            return true;
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          // MiniCssExtractPlugin.loader,
          'to-string-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|)$/,
        use: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.tsx', '.ts', '.js', '.css'],
  },
  plugins: [
    // expose and write the allowed env vars on the compiled bundle
    new ProgressBarPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
      chunkFilename: '[id].bundle.css',
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'src', 'popup.html'),
      filename: 'popup.html',
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'src', 'options.html'),
      filename: 'options.html',
      chunks: ['options'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'src', 'background.html'),
      filename: 'background.html',
      chunks: ['background'],
    }),
    new WriteFilePlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          to: '',
        },
      ],
    }),
  ],
};
module.exports = config;
