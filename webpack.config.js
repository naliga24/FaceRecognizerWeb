const path = require('path');

const SRC_DIR = path.join(__dirname, '/react-client/src');
const DIST_DIR = path.join(__dirname, '/react-client/dist');
const webpack = require('webpack');

module.exports = {
  entry: ['babel-polyfill',`${SRC_DIR}/index.jsx`],
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        }
      },
      {
        test: /\.pdf$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]',
          outputPath: '/pdf',
          publicPath: '/pdf',
        },
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=8192',
        options: {
          name: '[name].[ext]',
          outputPath: '/img',
          publicPath: '/img',
        },
      },
      {
        test: /\.jpg$/,
        loader: 'url-loader?limit=8192',
        options: {
          name: '[name].[ext]',
          outputPath: '/img',
          publicPath: '/img',
        },
      },
      {
        test: /\.jpeg$/,
        loader: 'url-loader?limit=8192',
        options: {
          name: '[name].[ext]',
          outputPath: '/img',
          publicPath: '/img',
        },
      },
      {
        test: /\.gif$/,
        loader: 'url-loader?limit=8192',
        options: {
          name: '[name].[ext]',
          outputPath: '/img',
          publicPath: '/img',
        },
      },
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env','@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties']
        },
      },
      
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
};
