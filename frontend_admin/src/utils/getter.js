import get from 'lodash/get';

export const upperCaseGetter = (record, source) => {
    const value = get(record, source);
    return value.toUpperCase ? value.toUpperCase() : value;
};