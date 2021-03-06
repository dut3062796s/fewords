# Fewords
> a simple notepad supports markdown

fewords是few words两个词拼成的名字，是个功能极其简单的笔记本(*纯文本输入*)，用于随手记录几句话，一条短语之类的，写这个应用的原本目的是用于学英语的时候记录下英文的句子。

这是个本地笔记本，没有远程服务器，不过可以把存储目录设置到云盘来同步。

## Download
- [for mac](http://pan.baidu.com/s/1jGpnbJg)
- [for win](http://pan.baidu.com/s/1gd8qaD9)
- 如果是之前安装过旧版本的话，请删除`~/.fewords-config.json`文件。

## Features
- 支持markdown
- 支持emoji
- 排序，星标，搜索

## Screenshot

- 列表:
    ![截图1](assets/captures/capture1.png)

- 编辑:
    ![截图2](assets/captures/capture2.png)

- 设置:
    ![截图3](assets/captures/capture3.png)

## Tips
- 所有输入和编辑的地方按`ESC`键都执行保存操作
- 双击文字区域进入编辑模式

## Todo
- ~~~全局快捷键~~~
- 翻页
- 日期分隔符
- ~~~代码语法高亮~~~
- ~~~for windows~~~

## Development
- 安装fis3 :  `npm install -g fis3`
- 安装fis的插件: `npm install -g fis3-hook-relative` 和 `npm install fis-parser-node-sass -g`
- 进入项目根目录: `npm install`
- fis编译: `fis3 release -wd ../build`
- 复制`node_modules`目录到`../build`目录下
- fis编译后预览: `cd ../build` 后执行 `electron ./`
- 编译app: `cd ../build` 后执行 `npm run build`
- 打包dmg: `cd ../build` 后执行 `npm run pack`

## Thanks
- [vue](http://vuejs.org/)
- [electron](http://electron.atom.io/)

## License
- MIT
