const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const LicensePlugin = require("webpack-license-plugin")
const TerserPlugin = require('terser-webpack-plugin');
const fs = require("fs");

module.exports = {
	entry: loadEntries("./src/components"),
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "./js/[name].js"
	},
	module: {
		rules: [{
				test: /\.(tsx|ts)$/,
				use: "ts-loader"
			},
			{
				test: /\.(js)$/,
				use: "babel-loader"
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			}
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	mode: "development",
	plugins: [
		new CopyPlugin({
			patterns: [{
					from: "./src",
					to: ".",
					globOptions: {
						ignore: ["**/*.tsx", "**/*.ts"]
					},
					noErrorOnMissing: true
				}
			],
		})/*,
		new LicensePlugin({
			outputFilename: 'thirdPartyNotice.json'
		})*/
	],
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					output: {
						comments: false,
					},
				},
				extractComments: false,
			}),
		],
	},
};

function loadEntries(dir) {
	let files = fs.readdirSync(path.join(__dirname, dir));
	let entries = {};
	files.forEach(file => {
		let name = file.match(/^(.*)\.tsx$/);
		if (name) {
			entries[name[1]] = path.join(__dirname, dir, file);
		}
	});
	return entries;
}