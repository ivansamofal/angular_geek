var debug = process.env.NODE_ENV !== "prod";

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var plugins = [
new webpack.ResolverPlugin(
new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
),
new webpack.NoErrorsPlugin(),
new webpack.ProvidePlugin({
'jQuery': 'jquery',
'$': 'jquery'
}),
new HtmlWebpackPlugin({
template: path.join(__dirname, 'wwwroot', 'src', 'index.html'),
filename: path.join(__dirname, 'wwwroot', 'dist', 'index.html')
})
];

if(!debug) {
plugins.push(new webpack.optimize.DedupePlugin());
plugins.push(new webpack.optimize.OccurenceOrderPlugin());
plugins.push(new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }));
}

module.exports = {
entry: {
app: path.join(__dirname, 'wwwroot', 'src', 'app', 'app.js'),
vendors: [ 'jquery', 'bootstrap' ],
vendorsCss: [ 'bootstrap/dist/css/bootstrap', 'bootstrap/dist/css/bootstrap-theme' ]
},
output: {
path: path.join(__dirname, 'wwwroot', 'dist', 'js'),
filename: '[name].js'
},
module: {
loaders: [
{ test: /\.css$/, loader: 'style-loader!css-loader' },
{ test: /\.html$/, loader: 'html-loader' },

{ test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff&name=../fonts/[name].[ext]" },
{ test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff&name=../fonts/[name].[ext]" },
{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream&name=../fonts/[name].[ext]" },
{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=../fonts/[name].[ext]" },
{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml&name=../fonts/[name].[ext]" }
]
},
resolve: {
extensions: [ '', '.js', '.css' ],
modulesDirectories: [ 'node_modules', 'bower_components' ]
},
plugins: plugins,
devtool: debug ? 'inline-sourcemap' : null,
devServer: {
contentBase: path.join(__dirname, 'wwwroot', 'dist'),
port: '8000'
}
};
