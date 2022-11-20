import {Alert, Box, CircularProgress, Divider, Grid, IconButton, Stack, TextField, Typography} from '@mui/material'
import {makeStyles} from '@mui/styles'
import {AccountCircle} from '@mui/icons-material'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import CheckIcon from '@mui/icons-material/Check'

import {useForm, Controller} from 'react-hook-form'

import {translate} from '../../localization'

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		width: '100%',
		overflow: 'hidden',
	},
	title: {
		padding: '2%',
		alignItems: 'center',
	},
	form: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttons: {
		paddingTop: '5%',
	},
}))

const LoginForm = ({onLogin, waiting}) => {
	const style = useStyles()

	const {
		control,
		formState: {errors},
		handleSubmit,
		register,
	} = useForm({
		defaultValues: {
			username: '',
			password: '',
		},
	})

	const onSubmit = data => {
		onLogin(data)
	}

	return (
		<Stack className={style.container} spacing={2}>
			<Stack className={style.title} spacing={2}>
				<Typography variant="h4" fontWeight={'bolder'}>
					{translate.string('login.title')}
				</Typography>
			</Stack>
			<Divider />
			<Grid container className={style.form}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid item className={style.username}>
						<Box sx={{display: 'flex', alignItems: 'flex-end'}}>
							<AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}} />
							<Controller
								render={({field: {onChange, value}}) => (
									<TextField
										error={errors.username?.type === 'required'}
										label={`${translate.string('login.username')}`}
										value={value}
										{...register('username', {required: true})}
										onChange={onChange}
										variant="standard"
									/>
								)}
								name={'username'}
								control={control}
							/>
						</Box>
						{errors.username?.type === 'required' && <Alert severity="error">{translate.string('error.required')}</Alert>}
					</Grid>
					<Grid item className={style.password}>
						<Box sx={{display: 'flex', alignItems: 'flex-end'}}>
							<VpnKeyIcon sx={{color: 'action.active', mr: 1, my: 0.5}} />
							<Controller
								render={({field: {onChange, value}}) => (
									<TextField
										error={errors.password?.type === 'required'}
										label={`${translate.string('login.password')}`}
										type="password"
										variant="standard"
										value={value}
										onChange={onChange}
									/>
								)}
								rules={{required: true}}
								name={'password'}
								control={control}
							/>
						</Box>
						{errors.password?.type === 'required' && <Alert severity="error">{translate.string('error.required')}</Alert>}
					</Grid>
					<Grid item className={style.buttons}>
						{!waiting ? (
							<Stack spacing={2}>
								<Divider />
								<IconButton fullWidth type="submit" color="success">
									<CheckIcon />
									<Typography fontWeight={'bold'} variant="h6">
										{translate.string('login.submit')}
									</Typography>
								</IconButton>
							</Stack>
						) : (
							<CircularProgress />
						)}
					</Grid>
				</form>
			</Grid>
		</Stack>
	)
}

export default LoginForm
