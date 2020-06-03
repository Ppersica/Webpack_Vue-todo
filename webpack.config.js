const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development'
const devServer = {
    // 构建后路径
    contentBase: './dist',
    compress: true,
    port: 8000,
    open: true,
    hot: true
}
const baseConfig = {
    target: 'web',
    //入口
    entry: path.join(__dirname, 'src/index.js'),
    //出口
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(gif\jpg|jpeg|png|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: '[name]-aaa.[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        //Vue Loader必须确保引入此插件
        new VueLoaderPlugin(),
        new HTMLPlugin()
    ]
}
let config
if (isDev) {
    config = merge(baseConfig, {
        mode: 'development',
        devtool: '#cheap-module-eval-source-map',
        devServer,
        module: {
            rules: [{
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }, ]
        },
    })
} else {
    config = merge(baseConfig, {
        mode: 'production',
        module: {
            rules: [{
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }, ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                // 对输出的 css 文件进行重命名
                filename: 'dist.css'
            }),
            // 压缩 css
            new OptimizeCssAssetsWebpackPlugin(),
        ]
    })
}
module.exports = config