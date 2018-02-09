import merge from 'webpack-merge'

import base from './packs/base.js'
import app from './packs/app/app.js'
import renderBundleConfig from './packs/render/render'

const clientBundleConfig = merge(base, app)

export default {
    browsers: [clientBundleConfig],
    node: [],
    render: [renderBundleConfig],
}
