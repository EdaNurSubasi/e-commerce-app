import {Alert, Snackbar, Stack} from '@mui/material'
import React from 'react'

const Toast = ({message, severity, open, setOpen}) => {
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setOpen(false)
	}
	return (
		<Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={open} autoHideDuration={2000} onClose={handleClose}>
			<Alert onClose={handleClose} severity={severity} sx={{width: '100%'}}>
				{message}
			</Alert>
		</Snackbar>
	)
}

export default Toast
