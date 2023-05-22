import React from 'react';

import Popover from '@material-ui/core/Popover';
import MUIList from '@material-ui/core/List';
import MUIListItem from '@material-ui/core/ListItem';
import MUIListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import IconButton from '@material-ui/core/IconButton';

import { DATE_TIME_FORMAT, toDate, format } from '../../../../components/_helpers/dateTime';
import { useTranslate } from 'react-admin';


export const StepsPopover = (props) => {
	const translate = useTranslate();
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
		e.preventDefault();
		e.stopPropagation();
	};

	const handleClose = (e) => {
		setAnchorEl(null);
		e.preventDefault();
		e.stopPropagation();
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const createdAt = React.useMemo(() => {
		const date = toDate(props.record.created_at);
		return format(date, DATE_TIME_FORMAT);
	}, [props.record.created_at]);

	return (
		<div style={{ textAlign: "center" }}>
			<IconButton aria-label="delete" size="small" aria-describedby={id} color="default" onClick={handleClick}>
				<InfoIcon fontSize="inherit" />
			</IconButton>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center',
				}}
				transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
				}}
			>
				<MUIList dense>
					<MUIListItem button={true}>
						<MUIListItemText primary={translate("resources.pricelist-articles.fields.added_by_at", {
							name: props.record.created_by,
							date: createdAt,
						})} />
						{/* <MUIListItemText primary={`Added by ${props.record.created_by}, ${createdAt}`} /> */}
					</MUIListItem>
					{props.steps.map(step =>
						<MUIListItem button={true} key={step}>
							<MUIListItemText primary={step} />
						</MUIListItem>
					)}
				</MUIList>
			</Popover>
		</div>
	);
};
