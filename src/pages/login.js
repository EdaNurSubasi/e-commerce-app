import {Paper, Stack} from '@mui/material'
import {makeStyles} from '@mui/styles'

import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Navigate, useNavigate} from 'react-router-dom'

import {LoginForm, Toast} from '../components'
import {UserActions} from '../store/actions'
import {translate} from '../localization'

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
		height: '50%',
		width: '50%',
		justifyContent: 'center',
		alignItems: 'center',
	},
}))

const Login = () => {
	const style = useStyles()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [open, setOpen] = useState(false)

	const session = useSelector(state => state.user.session)

	const handleLogin = user => {
		dispatch(UserActions.login(user))
	}

	useEffect(() => {
		if (session.data) {
			navigate('/payment')
		}
	}, [])

	useEffect(() => {
		if (session.error) {
			setOpen(true)
		}
	}, [session.error])

	if (session.data) {
		return <Navigate to={'/payment'} />
	}

	return (
		<Stack className={style.container}>
			<Paper className={style.paper} elevation={3}>
				<LoginForm onLogin={handleLogin} waiting={session.waiting} />
				<Toast open={open} message={translate.string('error.login')} severity="error" setOpen={setOpen} />
			</Paper>
		</Stack>
	)
}

export default Login
