const { log, ColoredError } = require('../lib');

log('   #{this} #1{is} #4{my} #6{colorful} #12{message}!');

const styles = [
    {
        color: 'cyan',
        style: ['bold', 'italic', 'underline']
    },
    {
        color: 'red',
        style: 'bold',
        back: 'magenta'
    }
];

log('   this is my #0{colorful} #1{message}!\n', styles);

throw new ColoredError('#{This is} #12{colored} #3{error}');