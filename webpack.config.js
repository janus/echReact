const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

var config = (env, options) => [
    {
			name: "web",
			entry: options.mode === "production" ? [
				"./src/web/boot-client.tsx"
			] :	['./src/web/boot-client.tsx',
					'webpack-hot-middleware/client'
			],
  		output: {
					path: path.resolve(__dirname, './public/build'),
					publicPath: "/build/",
					filename: 'bundle.js',
    	},
    	resolve: {
					extensions: ['.js', '.jsx', '.ts', '.tsx']
    	},
    	module: {
				rules: [
				{
					test:/\.css$/,
					use: options.mode === "production" ?
						[MiniCssExtractPlugin.loader, "css-loader"] :
						['style-loader', 'css-loader'],
				},
				{
					test:/\.tsx?$/,
					include: path.resolve(__dirname, "./src/web/"),
					loader: "awesome-typescript-loader"
				},
				{
					test: /\.(png|jpg|jpeg|gif|svg|ttf|otf|woff|woff2|eot)$/,
					loader: 'url-loader?limit=4096'
				}
		]
    },
		devtool: options.mode === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
		plugins: options.mode === "production" ? [
				new MiniCssExtractPlugin(),
				new HtmlWebpackPlugin({
					filename: "main.html",
					hash: true,
					template: "./src/template.html"
				})
			] : [
				new webpack.HotModuleReplacementPlugin()
			]
  },
  
  {
	name: "server",
	entry: ['./src/server/main.ts'],
	target: 'node',
	externals: [nodeExternals()],

	output: {
		path: path.resolve(__dirname, './build'),
		filename: '[name].js',
    },
    resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
		rules: [
			{
				test:/\.tsx?$/,
				include: path.resolve(__dirname, "./src/server/"),
				loader: "awesome-typescript-loader"
			}
		]  
	},
     node: {
		__dirname: true,
		__filename: true
    }
   
  } 
];

module.exports = config;
