const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/game.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,      // if file is a typescript file
                use: 'ts-loader',   // then load it with ts-loader
                include: [ path.resolve(__dirname, 'src') ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {},
        fallback: {
            "fs": false
        }
    },
    output: {
        publicPath: 'auto',
        filename: 'app.js',
        path: path.resolve(__dirname, 'public')
    },
    mode: 'development',
    plugins: [
        new CopyWebpackPlugin({patterns: [
            { from: 'src/assets', to: 'assets' }
        ]})
    ]
}