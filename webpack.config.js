"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var commonConfig = {
    mode: 'production',
    // entry: {
    //   'eos-transit': './src/index.ts',
    //   'eos-transit-scatter': './src/walletProviders/scatter/index.ts',
    //   'eos-transit-stub': './src/walletProviders/stub.ts'.
    // },
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
    plugins: [
    // new ProvidePlugin({
    //   'window.ScatterJS': ['scatterjs-core', 'default'],
    //   'window.ScatterEOS': ['scatterjs-plugin-eosjs2', 'default']
    // })
    ],
    externals: {
    // 'scatterjs-core': 'ScatterJS',
    // 'scatterjs-plugin-eosjs2': 'ScatterEOS'
    },
    stats: {
        colors: true
    }
};
var libConfig = __assign({}, commonConfig, { entry: {
        'eos-transit': './src/index.ts'
    }, output: {
        filename: '[name].min.js',
        path: path_1.default.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        library: 'WAL',
        libraryExport: 'default'
    } });
var providersConfig = __assign({}, commonConfig, { entry: {
        // scatter: './src/walletProviders/scatter/index.ts',
        stub: './src/walletProviders/stub.ts'
    }, output: {
        filename: 'eos-transit-[name].min.js',
        path: path_1.default.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        library: ['WAL', 'providers', '[name]'],
        libraryExport: 'default',
        globalObject: 'window'
    } });
exports.default = [libConfig, providersConfig];
//# sourceMappingURL=webpack.config.js.map