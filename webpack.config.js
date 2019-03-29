const path = require('path')
// var nodeExternals = require('webpack-node-externals')

const client = {
  entry: './src/main.js',
  output: {
    filename: 'lib.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'production'
}
// const backend = {
//   entry: './src/main.js',
//   output: {
//     filename: 'lib.node.js',
//     path: path.resolve(__dirname, 'dist')
//   },
//   target: 'node',
//   externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
//   mode: 'production'
// }
// module.exports = [ client, backend ]
module.exports = [ client ]
