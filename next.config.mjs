/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: ['127.0.0.1', 'akram.demandealacom.ma', 'myapi.akramameublement.com'],
        domains: ['127.0.0.1', 'localhost', 'test.akramameublement.com', 'myapi.akramameublement.com'],
        // domains: ['127.0.0.1', 'localhost', 'myapi.akramameublement.com'],
    },
    output: 'standalone',
};

export default nextConfig;
