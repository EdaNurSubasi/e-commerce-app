import {Paper, Stack} from '@mui/material'
import {makeStyles} from '@mui/styles'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {LoginForm} from '../components'
import {UserActions} from '../store/actions'
import {Navigate, useNavigate} from 'react-router-dom'

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
	const session = useSelector(state => state.user.session)
	const navigate = useNavigate()

	const handleLogin = user => {
		console.log(user)
		dispatch(UserActions.login(user))
	}

	useEffect(() => {
		if (session.data) {
			console.log(session.data)
			navigate('/payment')
		}
	}, [])

	if (session.data) {
		return <Navigate to={'/payment'} />
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
