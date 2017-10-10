var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
    entry: './src/Application.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'images', to: 'images' },
            { from: 'stylesheets', to: 'stylesheets' },
            { from: 'index.html' }
        ])
    ]
};
