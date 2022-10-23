import React from 'react';

import Grid from '@material-ui/core/Grid';
import {withHidden} from '../Hidden';


const allowedElements = {
    INPUT: true,
    TEXTAREA: true,
}

const focusOnElement = (node) => {
    if (node.className.search('disabled') > -1) {
        return false;
    }
    node.focus();
    return true;
}

const handleFocusOnNextInput = (e) => {
    if (e.keyCode === 13 && e.shiftKey) return;
    if (e.keyCode === 13) {
        e.preventDefault();
        const form = e.target.form;
        if (form) {
            const elements = Array.prototype.filter.call(e.target.form.elements, el => {
                return allowedElements[el.tagName];
            });

            const index = Array.prototype.indexOf.call(elements, e.target);
            for (let i = index + 1; i < elements.length; i++) {
                const nextElement = elements[i];
                if (!nextElement) break;


                if (nextElement.previousSibling) {
                    if (focusOnElement(nextElement.previousSibling)) break;
                } else {
                    if (focusOnElement(nextElement)) break;
                }
            }

        }
    }
};


export const GridInputRaw = ({
                                 component: Component,
                                 xs = 12,
                                 sm,
                                 md,
                                 lg,
                                 children,
                                 enabledFields,
                                 updateDependency,
                                 ...props
                             }) => {
    return (
        <Grid item xs={xs} sm={sm} md={md} lg={lg}>
            {children ?
                React.cloneElement(children, {
                    ...props,
                    fullWidth: true,
                    // variant: "outlined"
                })
                :
                <Component {...props}
                           fullWidth
                           onKeyDown={handleFocusOnNextInput}
                    // variant="outlined"
                />
            }
        </Grid>
    );
}


export const GridInput = withHidden(GridInputRaw);


// export const GridInput = React.memo(withHidden(GridInputRaw), (prev, next) => {
// 	if (prev.updateDependency !== next.updateDependency
// 		|| prev.validate !== next.validate
// 		|| prev.disabled !== next.disabled
// 		|| prev.hidden !== next.hidden
// 		|| prev.xs !== next.xs
// 		|| prev.sm !== next.sm
// 		|| prev.md !== next.md
// 		|| prev.lg !== next.lg
// 	) {
// 		return false;
// 	}
// 	return true;
// });

