import combineLoaders from 'webpack-combine-loaders'
import config from '../../../config/config'


const VueAppBundleLoader = combineLoaders([
    {
        loader: 'babel-loader',
    },
    {
        loader: 'string-replace-loader',
        query: {
            search: 'debug\(.*\)',
            replace: '',
            flags: 'g',
        }
    },
]);

export { VueAppBundleLoader }

