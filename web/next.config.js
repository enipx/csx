const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  webpack: (config, options) => {
    // Fixes npm packages (mdx) that depend on `fs` module
    if (!options.isServer) {
      config.resolve.fallback.fs = false
    }

    return config
  },
})