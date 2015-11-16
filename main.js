var app = require('app')
var BrowserWindow = require('browser-window')
var Tray = require('tray')
var ipc = require('ipc')
var Menu = require("menu");

app.dock.hide()

app.on('window-all-closed', function () {
    app.quit()
})

var win = null
var tray = null
app.on('ready', function () {
    var screen = require('screen')
    var x = screen.getPrimaryDisplay().workAreaSize.width / 2 - 250,
        win = new BrowserWindow({
            "x": x,
            "y": 20,
            "width": 500,
            "height": 600,
            "frame": false,
            "resizable": false,
            "center": false,
            "show": false
        })


    win.loadUrl('file://' + app.getAppPath() + '/pages/index.html')

    tray = new Tray(app.getAppPath() + '/assets/images/ebook.png')

    tray.on('clicked', function (e, bound) {
        win.isVisible() ? win.hide() : win.show()
        var x = bound.x + bound.width / 2 - win.getBounds().width / 2
        var y = bound.y + bound.height - 1
        win.setPosition(x, y)
    })

    win.on('blur', function () {
        win.hide()
    })

    win.on('closed', function () {
        win = null
    })

    ipc.on('quit', function () {
        win.close()
        app.quit()
    })

    ipc.on('toggleView', function () {
        win.isVisible() ? win.hide() : win.show()
    })

    // Create the Application's main menu
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


