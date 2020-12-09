
  const lessLoader = {
    test: /\.less$/,
    use: 'less-loader'
  }
  
  // Insert json loader at the end of list
  process.env.NODE_ENV = process.env.NODE_ENV || 'development'
  
  const environment = require('./environment')
  environment.loaders.append('less', lessLoader)

module.exports = environment.toWebpackConfig()
