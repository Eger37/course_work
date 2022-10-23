import {Key} from 'ts-keycode-enum';
import {isDigitRegExp} from '../regexp';

export const checkNavEditByCode = (keyCode) => {
    return keyCode === Key.LeftArrow ||
        keyCode === Key.UpArrow ||
        keyCode === Key.RightArrow ||
        keyCode === Key.DownArrow ||
        keyCode === Key.Home ||
        keyCode === Key.End ||
        keyCode === Key.Backspace ||
        keyCode === Key.Delete ||
        keyCode === Key.Insert;
};

export const checkNavEditByEvent = (ev) => {
    return ev.ctrlKey || ev.metaKey || ev.key.length > 1;
}

export const checkNumberByCode = (keyCode) => {
    return keyCode === Key.E ||
        keyCode === Key.DecimalPoint;
};

export const checkNumberByKey = (key) => {
    return isDigitRegExp.exec(key);
};