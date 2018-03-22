module.exports = file => () => import('@/module-' + file + '/index.vue')
