var path = require('path');
var nodeExternals = require('webpack-node-externals');
var isCoverage = process.env.NODE_ENV === 'coverage';

module.exports = {
    target: 'node',
    devtool: "source-map",
    externals: [nodeExternals()],
    resolve: {
        modules: [
            path.resolve(__dirname, 'src/scripts'),
            'node_modules'
        ]
    },
    output: {
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    },
    module: {
        rules: [].concat(
            isCoverage ? {
                test: /\.(js|ts)/,
                include: path.resolve('src/scripts'),
                loader: 'istanbul-instrumenter-loader'
            } : []
        )
    },
    devtool: "inline-cheap-module-source-map"
};
