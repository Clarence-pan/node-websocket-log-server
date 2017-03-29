const path = require('path')

const resolve = dir => path.join(__dirname, dir)

module.exports = {
    entry: {
        client: resolve('src/client.js')
    },
    output: {
        path: resolve('.'),
        filename: 'lib/[name].js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }
        ]
    }
}