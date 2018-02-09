var path = require('path');

module.exports = {
    target: 'node',
    devtool: "source-map",
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
    devtool: "#inline-cheap-module-source-map"
};
