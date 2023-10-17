// Stores all important client side folders and groups them together to leveraged by the app

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Webpack plugin that generates the html file and assembles files on app build
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Offline-Text-Editor'
      }),

      // Takes src-sw instructions and creates the engine to write our static assets
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      // Creates file that the service worker uses to navigate through the stored files. It houses the relative paths from the bundled app so the service worker can reference them
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Offline-Text-Editor',
        short_name: 'Editor',
        description: 'Never escape your text... even when offline!',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        
      ],
    },
  };
};
