const path = module.require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // to clean up the "dist" folder before building the project
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // to minimize .CSS files
const TerserPlugin = require('terser-webpack-plugin'); // to minimize .JS files
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // to separate the CSS into a separate file

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const fileName = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };
  if (isProd) {
    config.minimize = true;
    config.minimizer = [new CssMinimizerPlugin(), new TerserPlugin()];
  }
  return config;
};

const useBuiltIns = () => {
  if (isProd) {
    return 'entry';
  }
  return false;
};

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: fileName('js'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
  },
  module: {
    rules: [
      {
        test: /.ejs$/,
        loader: 'ejs-loader',
      },
      {
        test: /\.txt$/,
        type: 'asset/source',
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  // if production bundle then get parameter from package.json
                  useBuiltIns: useBuiltIns(),
                },
              ],
              '@babel/preset-react',
            ],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  // if production bundle then get parameter from package.json
                  useBuiltIns: useBuiltIns(),
                },
              ],
              '@babel/preset-react',
            ],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.(tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  // if production bundle then get parameter from package.json
                  useBuiltIns: useBuiltIns(),
                },
              ],
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.(s[ac]ss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          {
            loader: 'resolve-url-loader',
            options: {
              root: path.join(__dirname, 'src'),
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        issuer: /\.(js|ts)x?$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        issuer: /\.(?:css|scss|html)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: 'asset/resource',
        generator: {
          filename: isDev ? '[name].[ext]' : '[name].[contenthash].[ext]',
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  optimization: optimization(),
  devServer: {
    port: 9000,
    hot: isDev,
    open: true,
  },
  devtool: isDev ? 'source-map' : '',
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.svg'),
          to: path.resolve(__dirname, 'dist'),
        },
        {
          from: path.resolve(__dirname, 'src/manifest.json'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: isDev ? '[id].css' : '[id].[contenthash].css',
    }),
  ],
};
