const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      //cards: './src/js/cards.js',
      // 'service-worker': "./src-sw.js",
    },

    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },


    plugins: [
      // new WorkboxPlugin.GenerateSW({
      //   // these options encourage the ServiceWorkers to get in there fast
      //   // and not allow any straggling "old" SWs to hang around
      //   clientsClaim: true,
      //   skipWaiting: true,
      // }),
      new InjectManifest({
        // These are some common options, and not all are required.
        // Consult the docs for more info.
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE',
        // filename: 'index.html',
        // chunks: ['main'],
        // missing some properties -- 
      }),

      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'My Progressive Web App',
        short_name: 'MyPWA',
        description: 'My awesome Progressive Web App!',
        background_color: '#ffffff',
        start_url: '/',
        publicPath: '/',
        // crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
            destination: path.join('assets', 'icons')
          },

        ]
      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                //missing a plugin
                ['@babel/preset-env',
                  { targets: "defaults" }
                ]],
                plugins: [
                  '@babel/plugin-proposal-object-rest-spread',
                  '@babel/transform-runtime'
                ]
            }
          }
        },
      ],
    },
  };
};








