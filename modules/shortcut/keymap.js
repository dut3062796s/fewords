//from https://github.com/RobertWHurst/KeyboardJS
var usLocale = {
    "map": {
//general
        "3": ["cancel"],
        "8": ["backspace"],
        "9": ["tab"],
        "12": ["clear"],
        "13": ["enter"],
        "16": ["shift"],
        "17": ["ctrl"],
        "18": ["alt", "menu"],
        "19": ["pause", "break"],
        "20": ["capslock"],
        "27": ["escape", "esc"],
        "32": ["space", "spacebar"],
        "33": ["pageup"],
        "34": ["pagedown"],
        "35": ["end"],
        "36": ["home"],
        "37": ["left"],
        "38": ["up"],
        "39": ["right"],
        "40": ["down"],
        "41": ["select"],
        "42": ["printscreen"],
        "43": ["execute"],
        "44": ["snapshot"],
        "45": ["insert", "ins"],
        "46": ["delete", "del"],
        "47": ["help"],
        "91": ["command"],
        "92": ["command"],
        "145": ["scrolllock", "scroll"],
        "186": [";"],
        "187": ["="],
        "188": [","],
        "189": ["-"],
        "190": ["."],
        "191": ["/"],
        "192": ["`"],
        "219": ["["],
        "220": ["\\"],
        "221": ["]"],
        "222": ["'"],

//0-9
        "48": ["0"],
        "49": ["1"],
        "50": ["2"],
        "51": ["3"],
        "52": ["4"],
        "53": ["5"],
        "54": ["6"],
        "55": ["7"],
        "56": ["8"],
        "57": ["9"],

//numpad
        "96": ["numzero", "num0"],
        "97": ["numone", "num1"],
        "98": ["numtwo", "num2"],
        "99": ["numthree", "num3"],
        "100": ["numfour", "num4"],
        "101": ["numfive", "num5"],
        "102": ["numsix", "num6"],
        "103": ["numseven", "num7"],
        "104": ["numeight", "num8"],
        "105": ["numnine", "num9"],
        "106": ["nummultiply", "num*"],
        "107": ["numadd", "num+"],
        "108": ["numenter"],
        "109": ["numsubtract", "num-"],
        "110": ["numdecimal", "num."],
        "111": ["numdivide", "num/"],
        "144": ["numlock", "num"],

//function keys
        "112": ["f1"],
        "113": ["f2"],
        "114": ["f3"],
        "115": ["f4"],
        "116": ["f5"],
        "117": ["f6"],
        "118": ["f7"],
        "119": ["f8"],
        "120": ["f9"],
        "121": ["f10"],
        "122": ["f11"],
        "123": ["f12"]
    },
    "macros": [

//secondary key symbols
        ['shift + `', ["~"]],
        ['shift + 1', ["!"]],
        ['shift + 2', ["@"]],
        ['shift + 3', ["#"]],
        ['shift + 4', ["$"]],
        ['shift + 5', ["%"]],
        ['shift + 6', ["^"]],
        ['shift + 7', ["&"]],
        ['shift + 8', ["*"]],
        ['shift + 9', ["("]],
        ['shift + 0', [")"]],
        ['shift + -', ["_"]],
        ['shift + =', ["plus"]],
        ['shift + (', ["{"]],
        ['shift + )', ["}"]],
        ['shift + \\', ["|"]],
        ['shift + ;', [":"]],
        ['shift + \'', ["\""]],
        ['shift + !,', ["<"]],
        ['shift + .', [">"]],
        ['shift + /', ["?"]]
    ]
}

//a-z and A-Z
for (var aI = 65; aI <= 90; aI += 1) {
    usLocale.map[aI] = String.fromCharCode(aI + 32);
    usLocale.macros.push(['shift + ' + String.fromCharCode(aI + 32) + ', capslock + ' + String.fromCharCode(aI + 32), [String.fromCharCode(aI)]]);
}

function getPressKey(e) {
    var keys = []
    var map = usLocale.map
    if (e.metaKey) {
        keys.push(map[91][0])
    }
    if (e.shiftKey) {
        keys.push(map[16][0])
    }
    if (e.ctrlKey) {
        keys.push(map[17][0])
    }
    if (e.altKey) {
        keys.push(map[18][0])
    }
    if (e.keyCode && [16, 17, 18, 91, 92].indexOf(e.keyCode) < 0) {
        if (map[e.keyCode]) {
            keys.push(map[e.keyCode][0])
        }
    }
    keys.forEach(function (o, i) {
        var s = o.split('')
        s[0] = s[0].toLowerCase()
        keys[i] = s.join('')
    })
    return keys.join('+')
}

module.exports = getPressKey
