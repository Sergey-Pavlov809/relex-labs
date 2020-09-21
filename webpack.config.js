var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');


module.exports = {
    entry: './src/JS/script.js',
    output: {
        filename: 'main.js'
    },
    module: {
        rules: [{
            test: /\.css$/i,
            use: [
                {
                    loader: 'style-loader',
                    options: {
                        injectType: 'singletonStyleTag'
                    }
                },
                'css-loader'
            ]
        }, {
            test: /\.(png|svg|jpg|git?g)$/,
            use: [
                {
                    options: {
                        outputPath: 'img/'
                    },
                    loader: 'file-loader'
                }
            ]
        }]
    },
    plagins: [new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html'
    })]
};