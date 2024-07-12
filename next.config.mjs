/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        forceSwcTransforms: true,
      },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.externals = [...config.externals, 'jest'];
        }
        return config;
    } ,
    env: {
        NEXT_PUBLIC_RESAS_API_KEY: process.env.NEXT_PUBLIC_RESAS_API_KEY,
      },
};


export default nextConfig;
