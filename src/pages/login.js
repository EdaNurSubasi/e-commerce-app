import {Paper, Stack} from '@mui/material'
import {makeStyles} from '@mui/styles'
import React from 'react'
import {useDispatch} from 'react-redux'
import {LoginForm} from '../components'

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		width: '100%',
		overflow: 'hidden',
	},
	paper: {
		display: 'flex',
		padding: '2%',
		justifyContent: 'center',
		alignItems: 'center',
		height: '70%',
		width: '70%',
	},
}))

const Login = () => {
	const style = useStyles()
	const dispatch = useDispatch()

	const handleLogin = user => {
		console.log(user)
	}

	return (
		<div className={style.container}>
			<Paper className={style.paper} elevation={3}>
				<LoginForm onLogin={handleLogin} />
			</Paper>
		</div>
	)
}

export default Login
