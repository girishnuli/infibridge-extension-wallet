/** @type {import("snowpack").SnowpackUserConfig } */

module.exports = {
    exclude: ['src/background.ts', 'src/content.ts', '*.license'],
    mount: {
        public: { url: '/', static: true },
        src: { url: '/dist' },
    },
    plugins: [
        '@snowpack/plugin-svelte',
        '@snowpack/plugin-dotenv',
        '@snowpack/plugin-typescript',
        '@snowpack/plugin-postcss',
        [
            'snowpack-plugin-copy',
            {
                patterns: [
                    {
                        source: 'build/dist/background.js',
                        destination: 'build',
                    },
                    {
                        source: 'build/dist/content.js',
                        destination: 'build',
                    },
                ],
            },
        ],
        '@snowpack/plugin-webpack',
    ],
    routes: [
        /* Enable an SPA Fallback in development: */
        // {"match": "routes", "src": ".*", "dest": "/index.html"},
    ],
    optimize: {
        /* Example: Bundle your final build: */
        // bundle: true,
        // bundle: true,
        // minify: true,
    },
    packageOptions: {
        polyfillNode: true,
    },
    devOptions: {},
    buildOptions: {
        // Rename _snopack folder so that it does cause issue with extension loading
        metaUrlPath: 'snowpack_meta',
        // Delete build folder when rebuilding
        // clean: true,
        sourceMap: false,
    },
}
