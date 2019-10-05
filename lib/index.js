const colors = {
    black: 30,
    red: 31,
    green: 32,
    yellow: 33,
    blue: 34,
    magneta: 35,
    cyan: 36,
    white: 37,
    grey: 90
};

const styles = {
    normal: 0,
    bold: 1,
    italic: 3,
    underline: 4,
    inversed: 7,
    hidden: 8
};

const backs = {
    none: 0,
    black: 40,
    red: 41,
    green: 42,
    yellow: 43,
    blue: 44,
    magenta: 45,
    cyan: 46,
    white: 47
};

const defConfig = [
    /* 0 */  { style: 'bold' },
    /* 1 */  { style: 'italic' },
    /* 2 */  { color: 'red', style: 'normal' },
    /* 3 */  { color: 'red', style: 'bold' },
    /* 4 */  { color: 'red', style: 'italic' },
    /* 5 */  { color: 'green', style: 'normal' },
    /* 6 */  { color: 'green', style: 'bold' },
    /* 7 */  { color: 'green', style: 'italic' },
    /* 8 */  { color: 'blue', style: 'normal' },
    /* 9 */  { color: 'blue', style: 'bold' },
    /* 10 */ { color: 'blue', style: 'italic' },
    /* 11 */ { color: 'yellow', style: 'normal' },
    /* 12 */ { color: 'yellow', style: 'bold' },
    /* 13 */ { color: 'yellow', style: 'italic' },
];

function colorize(str, tpl = {}) {
    const {
        color = 'white',
        style = 'normal',
        back = 'none'
    } = tpl;

    let res = `\x1b[${backs[back]};`;
    res += Array.isArray(style) ? style.map(s => styles[s]).join(';') : styles[style];
    res += `;${colors[color]}m${str}\x1b[0m`;

    return res;
}

function log(str, config = defConfig) {
    const tokens = str.replace(/(#(\d+)?\{[^}]+\})/g, '~$1~').split('~');
    let index, word, match;

    const result = tokens.map(token => {
        if (token[0] !== '#') return token;

        match = token.match(/\d+/);
        index = match ? match[0] : 0;
        word = token.replace(/#(\d+)?\{|\}/g, '');

        return colorize(word, config[index]);
    });

    console.log(result.join(''));
}

module.exports = log;