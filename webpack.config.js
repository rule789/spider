const path = require('path');
var webpack = require('webpack');
console.log(path.resolve(__dirname));

module.exports = {
    // 基本配置
        // 一開始進入點的路徑
    context: path.resolve(__dirname, './public/src/javascripts'),
    entry: {
        index: './index.js'
    },
    
    // 打包後輸出的位置
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './public/dist'),
        // 有require的靜態資源(例如：CSS)，設完整路徑
        // 設定<script src..>要存取它時的路徑
        publicPath: '/'
    },
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                use: {
                    loader: 'babel-loader',
                },
                // 適用在所有js檔
                test: /\.js$/,
                // 排除這個資料夾
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
         // 提供hot reload功能
        //  new webpack.HotModuleReplacementPlugin(),
         // 當程式碼有錯誤時，不更新畫面，如果錯誤被修正才會hot reload
         // 這個可以選擇使用。
        //  new webpack.NoErrorsPlugin()
    ]
};