const path = require('path');

module.exports = {
    entry: './src/Application.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
};
