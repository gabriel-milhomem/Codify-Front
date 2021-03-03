const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/transform-runtime'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/',
    compress: true,
    port: 9000,
    historyApiFallback: true,
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          API_BASE_URL: process.env.API_BASE_URL ? `'${process.env.API_BASE_URL}'` : '\'http://localhost:3000\'',
          TRACKING_ID: '\'UA-190646289-1\'',
        },
      },
    }),
  ],
};
