import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin()
/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  // distDir: 'build',
  sassOptions: {
    quietDeps: true,
    silenceDeprecations: [
      'legacy-js-api',
      'mixed-decls',
      'color-functions',
      'global-builtin',
      'import',
    ],
  },

  webpack(config, options) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    )

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    }

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        // issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              // expandProps: false
            },
          },
        ],
      },
      {
        test: /\.node/,
        use: 'raw-loader',
      }
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
}

export default withNextIntl(nextConfig)
