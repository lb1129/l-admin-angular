import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    })
  ]
}
