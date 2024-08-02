var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './app.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.js',
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src'),
    ],
    extensions: ['.js', '.jsx', '.scss', '.css', '.json'],
    alias: {
      "jquery": path.join(__dirname, "./jquery-stub.js"),
    },
  },
  plugins: [
    // Add your plugins here
  ],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$|.jsx?$/,
        use: [
          { loader: 'babel-loader' },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: ['./node_modules'],
              },
            },
          },
        ],
      },
    ],
  },
  devServer: {
    port: 8080,
    host: "localhost",
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
    contentBase: path.join(__dirname, 'public'),
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5005',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        secure: false,
        logLevel: "debug"
      },
    },
  },
};
