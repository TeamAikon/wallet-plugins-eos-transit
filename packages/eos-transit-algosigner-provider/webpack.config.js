"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var webpack_1 = require("webpack");
var config = {
    mode: 'production',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.webpack.json'
                    }
                },
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'eos-transit-stub-provider.min.js',
        path: path_1.default.resolve(__dirname, 'umd'),
        libraryTarget: 'umd',
        library: ['WAL', 'providers', 'stub'],
        libraryExport: 'default'
    },
    plugins: [
        new webpack_1.ProvidePlugin({
            'window.WAL': ['eos-transit', 'default']
        })
    ],
    externals: {
        'eos-transit': 'WAL'
    },
    stats: {
        colors: true
    }
};
exports.default = config;
//# sourceMappingURL=webpack.config.js.map