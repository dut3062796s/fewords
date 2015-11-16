//fis.config.set('project.ignore', ['output/**', '.git/**', 'fis-conf.js']);

//fis.match('node_modules/**', {
//    release : '$&',
//    isJsLike : false,
//    isHtmlLike : false,
//    isCssLike : false,
//    standard: false
//})

// 启用插件
fis.hook('relative');

// 让所有文件，都使用相对路径。
fis.match('**', {
    relative: true
})

fis.match('**/*.scss', {
    rExt: '.css',
    parser: fis.plugin('node-sass', { })
})
