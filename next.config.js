/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'jagtjjiirouufnquzlhr.supabase.co',
      'cdn.discordapp.com',
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
};

module.exports = nextConfig;
