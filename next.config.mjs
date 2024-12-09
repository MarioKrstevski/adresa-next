import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
    return config;
  },
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "utfs.io",
      },
      {
        hostname: "img.halooglasi.com",
      },
      {
        hostname: "m1.spitogatos.gr",
      },
    ],
  },
  transpilePackages: ["leaflet", "react-leaflet"],
};

export default withNextIntl(nextConfig);
