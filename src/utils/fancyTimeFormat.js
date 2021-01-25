/**
 * ~~ === Math.floor
 * http://rocha.la/JavaScript-bitwise-operators-in-practice
 */
const fancyTimeFormat = (x) => {   
    // Hours, minutes and seconds
    const h = ~~(x / 3600);
    const m = ~~((x % 3600) / 60);
    const s = ~~x % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"

    return  `${h > 0 ? `${h}:${m < 10 ? '0' : ''}` : ''}${m}:${s < 10 ? '0' : ''}${s}`;
};

export default fancyTimeFormat;