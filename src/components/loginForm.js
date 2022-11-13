import {Alert, Box, Button, Grid, InputAdornment, Stack, TextField, Typography} from '@mui/material'
import {makeStyles} from '@mui/styles'
import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {translate} from '../localization'
import {AccountCircle} from '@mui/icons-material'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import {useForm, Controller} from 'react-hook-form'
import CheckIcon from '@mui/icons-material/Check'

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
		padding: '2%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttons: {
		paddingTop: '5%',
	},
}))

const LoginForm = ({onLogin}) => {
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
		console.log(data)
		onLogin(data)
	}

	return (
		<Stack className={style.container} spacing={2}>
			<Stack className={style.title} spacing={2}>
				<Typography variant="h4" component="div" fontWeight={'bolder'}>
					{translate.string('login.title')}
				</Typography>
			</Stack>
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
						{errors.username?.type === 'required' && <Alert severity="error">{translate.string('login.error')}</Alert>}
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
						{errors.password?.type === 'required' && <Alert severity="error">{translate.string('login.error')}</Alert>}
					</Grid>
					<Grid item className={style.buttons}>
						<Button fullWidth type="submit" color="success">
							<CheckIcon />
							<Typography fontWeight={'bold'}>{translate.string('login.submit')}</Typography>
						</Button>
					</Grid>
				</form>
			</Grid>
		</Stack>
	)
}

export default LoginForm
