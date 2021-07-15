const nodeEnv = process.env.NODE_ENV || 'production';
const paths = require( './config/paths' );
const path = require('path');
const autoprefixer = require( 'autoprefixer' );
const externals = require( './config/externals' );
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');


const blockCSSPlugin = new ExtractTextPlugin({
	filename:'./dist/style.build.css'});
const extractEditorStyles = new ExtractTextPlugin('./dist/editor.build.css');


// Configuration for the ExtractTextPlugin — DRY rule.
const extractConfig = {
	use: [
		// "postcss" loader applies autoprefixer to our CSS.
		{ loader: 'raw-loader' },
		{
			loader: 'postcss-loader',
			options: {
				ident: 'postcss',
				plugins: [
					autoprefixer( {
						
						flexbox: 'no-2009',
					} ),
				],
			},
		},
		// "sass" loader converts SCSS to CSS.
		{
			loader: 'sass-loader',
			options: {
				// Add common CSS file for variables and mixins.
				//data: '@import "./src/common.scss";\n',
				sassOptions:{
					additionalData:'@import "./src/common.scss";\n',
					outputStyle: 'compressed'
				}
			},
		},
	],
};


module.exports = {
	mode:nodeEnv,
	context:__dirname,
	devtool:'cheap-eval-source-map',
	entry: {
		'./dist/blocks.build': paths.pluginBlocksJs
		},
	resolve: {
		alias: {
			dist: path.resolve(__dirname,'dist/'),
			blocks: path.resolve(__dirname,'src/blocks/'),
			controls: path.resolve(__dirname, 'dist/blocks/controls'),
		}
	},
	stats: {
	// One of the two if I remember right
	entrypoints: false,
	children: false
	},
	externals: {
	   'lodash': 'lodash'
	},
	output: {
		// Add /* filename */ comments to generated require()s in the output.
		pathinfo: true,
		// The dist folder.
		path: paths.pluginDist,
		filename: '[name].js', // [name] = './dist/blocks.build' as defined above.
	},
	module: {
		rules: [
			{
				test: /\.(png|jpg|gif)$/,
				use: [
				  {
				    loader: 'file-loader',
				    options: {
				      name: '[path][name].[ext]',
				      publicPath: '/wp-content/plugins/archer-blocks/',
				      outputPath: '../mypath/'
				    },
				  },
				],
			},
			{
				test:/\.js$/,
				exclude:[/node_modules/],
				use: {
					loader: 'babel-loader'
			    },
			},
			{
		        test: /style\.s?css$/,
				use: blockCSSPlugin.extract( extractConfig ),
			},
			{
				test: /editor\.s?css$/,
				use: extractEditorStyles.extract( extractConfig ),

			},
			

	       {
		        test: /\.svg$/,
		        loader: 'svg-inline-loader'
		    },
    
		],
	},
	plugins: [
    	blockCSSPlugin,
		extractEditorStyles,
		
		new FriendlyErrorsWebpackPlugin(),
		
		],
  externals: externals,
};