import {
    formatISO as dateFnsFormatISO,
    format as dateFnsFormat,
    startOfToday,
    startOfTomorrow,
    parseISO,
} from 'date-fns';

import locale from 'date-fns/locale/en-US'

export {parseISO, locale};

locale.options.weekStartsOn = 1;

export const TODAY = new Date();
export const TTODAY = startOfToday();
export const TTOMORROW = startOfTomorrow();

export const DATE_FORMAT = 'dd-MM-yyyy';
export const TIME_FORMAT = 'HH:mm';
export const DATE_TIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;
export const TIME_DATE_FORMAT = `${TIME_FORMAT} ${DATE_FORMAT}`;

export const formatISO = (datetime, options) => dateFnsFormatISO(datetime, options);
export const formatDateISO = date => formatISO(date, {representation: 'date'});
export const formatTimeISO = date => formatISO(date, {representation: 'time'});

export const Dates = {
    today: startOfToday(),
    tomorrow: startOfTomorrow(),
};

export const ISO_Dates = {
    today: formatDateISO(Dates.today),
    tomorrow: formatDateISO(Dates.tomorrow),
};

setInterval(() => {
    Dates.today = startOfToday();
    Dates.tomorrow = startOfTomorrow();

    ISO_Dates.today = formatDateISO(Dates.today);
    ISO_Dates.tomorrow = formatDateISO(Dates.tomorrow);
}, 1800000);

export const format = (value, formatter, fallback = null) => {
    return value ? dateFnsFormat(value, formatter) : fallback;
};

export const toDate = (value) => {
    return value ? new Date(value) : null;
}

export const dateToISOWithoutTimeZone = (date) => {
    if (date) {
        const newDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        return newDate.toISOString().split("+")[0].split("Z")[0];
    }
    return date;
}

// export const DAY_IN_MILISECONDS = 86400000;
export const DAY_IN_MILISECONDS = 60 * 60 * 24 * 1000;


export const mergeDateAndTime = (date, time) => {
    if (!date) {
        return 0;
    }
    const date_stamp = date ? date.getTime() : 0;
    const time_stamp = time ? time.getTime() : 0;
    return new Date(date_stamp - (date_stamp % DAY_IN_MILISECONDS) + (time_stamp % DAY_IN_MILISECONDS));
}
