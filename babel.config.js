module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/portv/'
    : '/'

  , presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
