const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const DefinePlugin = require("webpack/lib/DefinePlugin");

module.exports = {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        useLocalIp: false,
        host:'114.214.164.232',
        port: 9001,
        open: true,
        openPage: 'index.html',
        publicPath: '',
        hot: true
    },

    // entry: './src/Startup.ts',
    entry: {
        // cesium1:'./src/Startup.ts',
        // cesium2:'./src/cesium/parallax/Main.ts',
        // L7Maker:'./src/L7/demo/Main.ts',
        // L7Cvoid:'./src/L7/cvoid-19/Main.ts',
        // chartRing:'./src/L7/chart/ring.ts',
        // chartBar:'./src/L7/chart/Bar.ts',
        // chartPop:'./src/L7/chart/Pop.ts',
        // geoTiff:'./src/L7/geo/tiff.ts',
        // geoImage:'./src/L7/geo/image.ts',
        // amGroup:'./src/amChart/GroupBinding.ts',
        // amTimezone:'./src/amChart/Timezone.ts',
        // amBullet:'./src/amChart/Bullet.ts',

        population:'./widget/population/Main.ts',
    },
    plugins: [
        new HtmlWebpackPlugin({hash: true, title: '地理地球', template: './public/index.html'}),
        new CopyPlugin({
            patterns: [
                { from: `assets`, to: `assets` },
                /*cesium 相关静态资源*/
                { from: 'node_modules/cesium/Build/Cesium/Workers',     to: 'Workers'    },
                { from: 'node_modules/cesium/Build/Cesium/ThirdParty',  to: 'ThirdParty' },
                { from: 'node_modules/cesium/Build/Cesium/Assets',      to: 'Assets'     },
                { from: 'node_modules/cesium/Build/Cesium/Widgets',     to: 'Widgets'    }
            ],
        }),
        new DefinePlugin({
            // Define relative base path in cesium for loading assets
            CESIUM_BASE_URL: JSON.stringify('./')
        })
    ],

    module: {
        rules: [
            { test: /\.ts$/,            use: 'ts-loader',             exclude: /node_modules/},
            { test: /\.svg$/,           use: 'svg-inline-loader',     exclude: /node_modules/},
            { test: /\.css$/, use:[ { loader: "style-loader" }, { loader: "css-loader"} ] },
            { test: /\.(png|jpg|gif|eot|ttf|woff|gltf|glb|fbx)$/,   use: 'url-loader',    },
            // {
            //     // Remove pragmas
            //     test: /\.js$/,
            //     enforce: 'pre',
            //     include: path.resolve(__dirname, 'node_modules/cesium/Source'),
            //     sideEffects: false,
            //     use: [{
            //         loader: 'strip-pragma-loader',
            //         options: { pragmas: {debug: false} }
            //     }]
            // }
        ],
    },
    resolve: {
        extensions: ['.ts','.js'],
        alias: {
            "@F": path.resolve("framework"),
            "@T": path.resolve("test")
        }
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    node: {
        fs: "empty"
    }
};
