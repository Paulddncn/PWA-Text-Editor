const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

 //TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.


module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      // 'service-worker': "./src-sw.js",
    },
    
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    // {
    //   "name": "My Progressive Web App",
    //   "orientation": "portrait",
    //   "display": "standalone",
    //   "start_url": ".",
    //   "short_name": "MyPWA",
    //   "description": "My awesome Progressive Web App!",
    //   "background_color": "#ffffff",
    //   "icons": [
    //     {
    //       "src": "icon_1024x1024.<fingerprint>.png",
    //       "sizes": "1024x1024",
    //       "type": "image/png",
    //       "purpose": "maskable"
    //     },
    //     {
    //       "src": "icon_1024x1024.<fingerprint>.png",
    //       "sizes": "1024x1024",
    //       "type": "image/png"
    //     },
    //     {
    //       "src": "icon_512x512.<fingerprint>.png",
    //       "sizes": "512x512",
    //       "type": "image/png"
    //     },
    //     {
    //       "src": "icon_384x384.<fingerprint>.png",
    //       "sizes": "384x384",
    //       "type": "image/png"
    //     },
    //     {
    //       "src": "icon_256x256.<fingerprint>.png",
    //       "sizes": "256x256",
    //       "type": "image/png"
    //     },
    //     {
    //       "src": "icon_192x192.<fingerprint>.png",
    //       "sizes": "192x192",
    //       "type": "image/png"
    //     },
    //     {
    //       "src": "icon_128x128.<fingerprint>.png",
    //       "sizes": "128x128",
    //       "type": "image/png"
    //     },
    //     {
    //       "src": "icon_96x96.<fingerprint>.png",
    //       "sizes": "96x96",
    //       "type": "image/png"
    //     }
    //   ]
    // }
  
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
        // exclude: [/.../, '...'],
        // maximumFileSizeToCacheInBytes: ...,
        swSrc: './src-sw.js',
      }),

      new HtmlWebpackPlugin({template: './index.html', title: 'JATE'}),

      new WebpackPwaManifest({
        name: 'My Progressive Web App',
        short_name: 'MyPWA',
        description: 'My awesome Progressive Web App!',
        background_color: '#ffffff',
        crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
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
                ['@babel/preset-env', { targets: "defaults" }]
              ]
            }
          }
        }
      ],
    },
  };
};








