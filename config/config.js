import { join, resolve } from 'path'

const config = {
    development: {
        env : {
            BUILD_ENV: 'development',
            BASE: '/'
        },
        proxyTable: {},
        // (https://github.com/webpack/css-loader#sourcemaps)
        cssSourceMap: false,
        port: 5000
    },
    staging: {
        env : {
            BUILD_ENV: 'staging'
        },
        cssSourceMap: false,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    production: {
        env : {
            BUILD_ENV: 'production',
            BASE: '/'
        },
        cssSourceMap: false,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    path: {
        root: resolve(__dirname, '..'),
        src: join(__dirname, '..', '/src'),
        dist: join(__dirname, '..', '/dist'),
        app: join(__dirname, '..', '/dist/app'),
        static: join(__dirname, '..', '/dist/app-static')
    },
    routes: {
        static: ['/'],
    },
    browserslist: [
        '> 0.5%',
        'last 3 versions',
    ],
}

export default config
