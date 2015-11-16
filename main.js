var app = require('app')
var BrowserWindow = require('browser-window')
var Tray = require('tray')
var ipc = require('ipc')
var Menu = require("menu");

var isMac =  process.platform == 'darwin'
var isWindows = process.platform == 'win32'

app.dock && app.dock.hide()

app.on('window-all-closed', function () {
    app.quit()
})

var win = null
var tray = null
app.on('ready', function () {
    var screen = require('screen')
    var size = screen.getPrimaryDisplay().workAreaSize
    var width = 500
    var height = 600
    var defaultX = isMac ? size.width / 2 - width/2 : size.width - width - 10
    var defaultY = isMac ? 20 : size.height - height - 10

    win = new BrowserWindow({
        "x": defaultX,
        "y": defaultY,
        "width": width,
        "height": height,
        "frame": false,
        "resizable": false,
        "center": false,
        "skip-taskbar" : true,
        "show": false
    })


    win.loadUrl('file://' + app.getAppPath() + '/pages/index.html')

    tray = new Tray(app.getAppPath() + (isMac ? '/assets/images/mac-tray.png' : '/assets/images/win-tray.png'))
    tray.setToolTip('fewords app')

    tray.on('clicked', function (e, bound) {
        var x = bound.x + bound.width / 2 - win.getBounds().width / 2
        var y = bound.y + bound.height - 1
        if(isWindows) {
            x = Math.min(x, defaultX)
            y = defaultY
        }
        win.setPosition(x, y)
        win.isVisible() ? win.hide() : win.show()
    })

    // win.openDevTools()

    //win下点击tary会触发blur
    win.on('blur', function () {
        setTimeout(function() {
            win.hide()
        }, isMac ? 0 : 200)
    })

    win.on('closed', function () {
        win = null
    })

    ipc.on('quit', function () {
        tray && tray.destroy()
        tray = null
        win.close()
        app.quit()
    })

    ipc.on('toggleView', function () {
        win.isVisible() ? win.hide() : win.show()
    })

    //解决不能剪贴板操作的问题
    var template = [{
        label: "Application",
        submenu: [
            { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
            { type: "separator" },
            { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
        ]}, {
        label: "Edit",
        submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]}
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
})


