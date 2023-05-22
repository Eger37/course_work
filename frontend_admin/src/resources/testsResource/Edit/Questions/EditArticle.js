// import React from 'react';
//
// import {
// 	useMutation, useNotify,
// 	TextInput, FormWithRedirect,
// 	required, number, minValue,
// } from 'react-admin';
// import EditIcon from '@material-ui/icons/EditOutlined';
// import IconButton from '@material-ui/core/IconButton';
//
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
//
// import { useSimpleModalToggle } from '../../../../components/dialogs/useSimpleModal';
//
// import { PassProps } from '../../../../components/_helpers/PassProps';
// import { GridForm, GridInput } from '../../../../components/GridForm';
//
// import { YesNoInput } from '../../../../components/inputs/YesNoInput';
// import { NumberInputEx } from '../../../../components/inputs/NumberInputEx';
//
// import { useNotifyError } from '../../../../utils/notifiers/useNotifyError';
//
// import { checkPriceEditable } from './_helper';
//
//
// export const EditArticle = ({ article }) => {
// 	const { open, handleOpen, handleClose } = useSimpleModalToggle();
// 	const notifyError = useNotifyError();
//
// 	const [approve, { loading }] = useMutation({
//         type: 'update',
//         resource: 'order-pricelist',
//         payload: { id: article.id },
//     }, {
// 		onSuccess: () => {
// 			handleClose();
// 		},
// 		onFailure: (error) => {
// 			notifyError(error);
// 		}
// 	});
//
// 	const handleSubmit = (values) => {
// 		approve({
// 			payload: {
// 				id: article.id,
// 				data: values,
// 			}
// 		})
// 	}
//
// 	return (
// 		<div style={{ textAlign: "center" }}>
// 			<IconButton aria-label="delete" size="small" color="default" onClick={handleOpen}>
// 				<EditIcon fontSize="inherit" />
// 			</IconButton>
// 			{open && <Dialog maxWidth="xs" open={open} onClose={handleClose}>
// 				<DialogTitle>Edit {article.article_id}</DialogTitle>
// 				<FormWithRedirect
// 					record={article}
// 					submitOnEnter={false}
// 					component={DialogContent}
// 					save={handleSubmit}
// 					render={({ handleSubmitWithRedirect }) => (
// 						<React.Fragment>
// 							<PassProps component={DialogContent} childPropKeys={["resource"]} resource="order-pricelist">
// 								<GridForm>
// 									<GridInput xs={12} component={TextInput} source="service_description" />
// 									{checkPriceEditable(article.article_id) && <GridInput xs={6} component={NumberInputEx} type="float" digitsCount={1} validate={[required(), number(), minValue(0)]} source="price" />}
// 									<GridInput xs={6} component={NumberInputEx} type="float" digitsCount={1} validate={[required(), number(), minValue(0.1)]} source="units" />
// 									<GridInput xs={4} component={YesNoInput} source="deleted" />
// 								</GridForm>
// 							</PassProps>
// 							<DialogActions>
// 								<Button disabled={loading} onClick={handleClose} color="primary">
// 									Cancel
// 								</Button>
// 								<Button disabled={loading} onClick={handleSubmitWithRedirect} color="primary">
// 									Update
// 								</Button>
// 							</DialogActions>
// 						</React.Fragment>
// 					)}
// 				/>
// 			</Dialog>}
// 		</div>
// 	);
// };
