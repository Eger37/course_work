import React from 'react';
import PropTypes from 'prop-types';

import MaskedInput from 'react-text-mask';

;

export const MaskInput = ({inputRef, ...props}) => (
    <MaskedInput
        {...props}
        ref={ref => inputRef(ref ? ref.inputElement : null)}
    />
);

MaskInput.propTypes = {
    inputRef: PropTypes.func.isRequired,
};
