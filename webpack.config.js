const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/app.ts',
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
        alias: {
            core: path.resolve(__dirname, 'src/engine/core.ts')
        }
        /* alias: {
            math: path.resolve(__dirname, 'src/core/math/math.ts'),
            core: path.resolve(__dirname, 'src/core/core.ts'),
            utils: path.resolve(__dirname, 'src/core/utilities/utils.ts'),
        } */
    },
    output: {
        publicPath: 'auto',
        filename: 'app.js',
        path: path.resolve(__dirname, 'public')
    },
    mode: 'development',
    plugins: [
        new CopyWebpackPlugin({patterns: [
            { from: 'src/game/assets', to: 'assets' }
        ]})
    ]
}