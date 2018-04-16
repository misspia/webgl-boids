const path = require('path');
const HappyPack = require('happypack');

const paths = {
	DIST: path.resolve(__dirname, 'dist'),
	SRC: path.resolve(__dirname, 'src'),
};

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: path.join(paths.SRC, 'index.js'),
	output: {
		path: paths.DIST,
		filename: 'bundle.js',
		publicPath: 'dist/'
	},
	plugins: [
		new HappyPack({
			id: 'glsl',
			threads: 4,
			loaders: ['webpack-glsl-loader']
		}),

		new HappyPack({
			id: 'js',
			threads: 4,
			loaders: ['babel-loader']
		}),

		new HappyPack({
			id: 'scss',
			threads: 2,
			loaders: [
				'style-loader',
				'css-loader',
				'sass-loader'
			]
		}),
	],
	module: {
		rules: [
			{
				test: /\.(png|jpg|jpeg|gif|ico|mp3)$/,
				use: [
					'file-loader',
				],
			},
			{
        test: /\.(glsl|vert|frag)$/,
        loader: 'happypack/loader?id=glsl'
      },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'happypack/loader?id=js',
			},
			{
				test: /\.scss$/,
				use: 'happypack/loader?id=scss',
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
}
