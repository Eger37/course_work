export const parseDigits = (val) => {
    if (val) {
        const numbers = val.match(/\d/gi);
        return numbers ? numbers.join('') : '';
    }
    return '';
}
