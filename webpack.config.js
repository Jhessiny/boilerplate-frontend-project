const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
	entry: {
		main: path.resolve(__dirname, "./src/app.js"),
	},
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist"),
		assetModuleFilename: "[name][ext]",
		clean: true,
	},
	devtool: "inline-source-map",
	devServer: {
		static: path.resolve(__dirname, "dist"),
		open: true,
		hot: true,
		watchContentBase: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Project",
			template: path.resolve(__dirname, "./src/temp.html"),
		}),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/, /tests/],
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
							sassOptions: {
								outputStyle: "compressed",
							},
						},
					},
				],
			},
			{
				test: /\.(gif|jpg|png|jpeg|svg|webp)$/,
				type: "asset/resource",
			},
		],
	},
};
