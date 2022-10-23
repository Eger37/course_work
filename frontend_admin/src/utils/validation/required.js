import lodashMemoize from 'lodash/memoize';

export const memoize = (fn) => lodashMemoize(fn, (...args) => JSON.stringify(args));


export const isEmpty = (value) =>
    typeof value === 'undefined' ||
    value === null ||
    value === '' ||
    (Array.isArray(value) && value.length === 0);

export const required = memoize((isRequired = true, message = 'ra.validation.required') =>
    Object.assign(
        (value, values) => isRequired && (isEmpty(value) ? message : undefined),
        {isRequired: isRequired}
    )
);
