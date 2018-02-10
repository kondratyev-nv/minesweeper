var path = require('path');
var nodeExternals = require('webpack-node-externals');
var isCoverage = process.env.NODE_ENV === 'coverage';

module.exports = {
    target: 'node',
    devtool: "source-map",
    externals: [nodeExternals()],
    resolve: {
        modules: [
            path.resolve(__dirname, 'src/js'),
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
                include: path.resolve('src'), // instrument only testing sources with Istanbul, after ts-loader runs
                loader: 'istanbul-instrumenter-loader'
            } : []
        )
    },
    devtool: "inline-cheap-module-source-map"
};
