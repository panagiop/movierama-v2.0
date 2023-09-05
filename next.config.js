/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt'],
    output: 'standalone',
    transpilePackages: ['swagger-ui-react'],
    async redirects() {
        return [
            {
                source: '/',
                destination: '/posts',
                permanent: true
            }
        ];
    }
};

module.exports = nextConfig;
