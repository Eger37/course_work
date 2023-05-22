import React from 'react';


export const useSimpleModal = () => {
	const [opened, setOpened] = React.useState(false);

	return React.useMemo(() => ({
		opened,
		handleOpen: () => {
			setOpened(true);
		},
		handleClose: () => {
			setOpened(false);
		},
	}), [ opened ]);
}


export const useSimpleModalToggle = () => {
	const [open, setOpen] = React.useState(false);

	const handleOpen = (e) => {
		setOpen(true);
		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}
	};

	const handleClose = (e) => {
		setOpen(false);
		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}
	};

	return {
		open,
		handleOpen,
		handleClose,
	}
}
