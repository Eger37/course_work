import React from 'react';


export const makeToggle = () => {
    const ToggleContext = React.createContext(false);

    const ToggleProvider = props => {
        const [isOpened, setIsOpened] = React.useState(false);

        const handleOpen = React.useCallback(() => {
            setIsOpened(true);
        }, [])

        const handleClose = React.useCallback(() => {
            setIsOpened(false);
        }, []);

        const value = React.useMemo(() => ({
            open: handleOpen,
            close: handleClose,
            opened: isOpened
        }), [isOpened, handleOpen, handleClose]);

        return (
            <ToggleContext.Provider value={value}>
                {props.children}
            </ToggleContext.Provider>
        );
    }

    const useToggle = () => {
        return React.useContext(ToggleContext);
    }

    return [ToggleProvider, useToggle];
}

const [ToggleProvider, useToggle] = makeToggle();

export {
    ToggleProvider,
    useToggle,
}
