import {Alert, Button, Grid, Box, Stack, TextField, Typography, Divider} from '@mui/material'
import React from 'react'
import {useForm, Controller} from 'react-hook-form'
import {AccountCircle} from '@mui/icons-material'
import CheckIcon from '@mui/icons-material/Check'
import {makeStyles} from '@mui/styles'
import {translate} from '../../localization'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox'
import FlagIcon from '@mui/icons-material/Flag'

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
	},
	title: {
		padding: '2%',
		alignItems: 'center',
	},
	form: {
		display: 'grid',
		direction: 'row',
		padding: '2%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	personalInfo: {
		gridColumn: 1,
		gridRow: 1,
	},
	addressInfo: {
		gridColumn: 2,
		gridRow: 2,
	},
	firstName: {
		direction: 'row',
		margin: '2%',
	},
	buttons: {
		paddingTop: '5%',
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
	},
}))

const Address = ({onAddressSubmit}) => {
	const style = useStyles()

	const {
		control,
		formState: {errors},
		handleSubmit,
		register,
	} = useForm({
		defaultValues: {
			country: '',
			city: '',
			address: '',
			zipcode: '',
			email: '',
			phone: '',
			firstName: '',
			lastName: '',
		},
	})

	const onSubmit = data => {
		console.log(data)
		onAddressSubmit(data)
	}

	return (
		<Stack className={style.container} spacing={2}>
			<Stack className={style.title} spacing={2}>
				<Typography variant="h5" component="div" fontWeight={'bolder'}>
					{translate.string('checkout.address.title')}
				</Typography>
			</Stack>
			<Grid container className={style.form} direction="row">
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack direction={'row'} spacing={6}>
						<Grid item className={style.personalInfo}>
							<div className={style.firstName}>
								<Box sx={{display: 'flex', alignItems: 'flex-end'}}>
									<AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}} />
									<Controller
										render={({field: {onChange, value}}) => (
											<TextField
												error={errors.firstName?.type === 'required'}
												label={`${translate.string('checkout.address.firstName')}`}
												value={value}
												{...register('firstName', {required: true})}
												onChange={onChange}
												variant="standard"
											/>
										)}
										name={'firstName'}
										control={control}
									/>
								</Box>
								{errors.firstName?.type === 'required' && <Alert severity="error">{translate.string('error.required')}</Alert>}
							</div>
							<div className={style.firstName}>
								<Box sx={{display: 'flex', alignItems: 'flex-end'}}>
									<AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}} />
									<Controller
										render={({field: {onChange, value}}) => (
											<TextField
												error={errors.lastName?.type === 'required'}
												label={`${translate.string('checkout.address.lastName')}`}
												type="lastName"
												variant="standard"
												value={value}
												onChange={onChange}
											/>
										)}
										rules={{required: true}}
										name={'lastName'}
										control={control}
									/>
								</Box>
								{errors.lastName?.type === 'required' && <Alert severity="error">{translate.string('error.required')}</Alert>}
							</div>
							<div className={style.firstName}>
								<Box sx={{display: 'flex', alignItems: 'flex-end'}}>
									<EmailIcon sx={{color: 'action.active', mr: 1, my: 0.5}} />
									<Controller
										render={({field: {onChange, value}}) => (
											<TextField
												error={errors.email?.type === 'required'}
												label={`${translate.string('checkout.address.email')}`}
												type="email"
												variant="standard"
												value={value}
												onChange={onChange}
											/>
										)}
										rules={{required: true}}
										name={'email'}
										control={control}
									/>
								</Box>
								{errors.email?.type === 'required' && <Alert severity="error">{translate.string('error.required')}</Alert>}
							</div>
							<div className={style.firstName}>
								<Box sx={{display: 'flex', alignItems: 'flex-end'}}>
									<PhoneIcon sx={{color: 'action.active', mr: 1, my: 0.5}} />
									<Controller
										render={({field: {onChange, value}}) => (
											<TextField
												error={errors.phone?.type === 'required'}
												label={`${translate.string('checkout.address.phone')}`}
												type="tel"
												variant="standard"
												value={value}
												onChange={onChange}
											/>
										)}
										rules={{required: true, pattern: /[0-9]+$/i, maxLength: 11, minLength: 11}}
										name={'phone'}
										control={control}
									/>
								</Box>
								{errors.phone?.type === 'pattern' && <Alert severity="error">{translate.string('error.pattern')}</Alert>}
								{(errors.phone?.type === 'maxLength' || errors.phone?.type === 'minLength') && (
									<Alert severity="error">{translate.string('error.phone')}</Alert>
								)}
								{errors.phone?.type === 'required' && <Alert severity="error">{translate.string('error.required')}</Alert>}
							</div>
						</Grid>
						<Divider orientation="vertical" variant="middle" flexItem />
						<Grid item className={style.addressInfo}>
							<div className={style.firstName}>
								<Box sx={{display: 'flex', alignItems: 'flex-end'}}>
									<FlagIcon sx={{color: 'action.active', mr: 1, my: 0.5}} />
									<Controller
										render={({field: {onChange, value}}) => (
											<TextField
												error={errors.country?.type === 'required'}
												label={`${translate.string('checkout.address.country')}`}
												value={value}
												{...register('country', {required: true})}
												onChange={onChange}
												variant="standard"
											/>
										)}
										name={'country'}
										control={control}
									/>
								</Box>
								{errors.country?.type === 'required' && <Alert severity="error">{translate.string('error.required')}</Alert>}
							</div>
							<div className={style.firstName}>
								<Box sx={{display: 'flex', alignItems: 'flex-end'}}>
									<LocationCityIcon sx={{color: 'action.active', mr: 1, my: 0.5}} />
									<Controller
										render={({field: {onChange, value}}) => (
											<TextField
												error={errors.city?.type === 'required'}
												label={`${translate.string('checkout.address.city')}`}
												value={value}
												{...register('city', {required: true})}
												onChange={onChange}
												variant="standard"
											/>
										)}
										name={'city'}
										control={control}
									/>
								</Box>
								{errors.city?.type === 'required' && <Alert severity="error">{translate.string('error.required')}</Alert>}
							</div>
							<div className={style.firstName}>
								<Box sx={{display: 'flex', alignItems: 'flex-end'}}>
									<LocationOnIcon sx={{color: 'action.active', mr: 1, my: 0.5}} />
									<Controller
										render={({field: {onChange, value}}) => (
											<TextField
												error={errors.address?.type === 'required'}
												label={`${translate.string('checkout.address.address')}`}
												value={value}
												{...register('address', {required: true})}
												onChange={onChange}
												variant="standard"
											/>
										)}
										name={'address'}
										control={control}
									/>
								</Box>
								{errors.address?.type === 'required' && <Alert severity="error">{translate.string('error.required')}</Alert>}
							</div>
							<div className={style.firstName}>
								<Box sx={{display: 'flex', alignItems: 'flex-end'}}>
									<MarkunreadMailboxIcon sx={{color: 'action.active', mr: 1, my: 0.5}} />
									<Controller
										render={({field: {onChange, value}}) => (
											<TextField
												error={errors.zipcode?.type === 'required'}
												label={`${translate.string('checkout.address.zip')}`}
												value={value}
												{...register('zipcode', {required: true})}
												onChange={onChange}
												variant="standard"
											/>
										)}
										name={'zipcode'}
										control={control}
									/>
								</Box>
								{errors.zipcode?.type === 'required' && <Alert severity="error">{translate.string('error.required')}</Alert>}
							</div>
						</Grid>
					</Stack>

					<Grid item className={style.buttons}>
						<Button fullWidth type="submit" color="primary" variant="outlined">
							<CheckIcon />
							<Typography fontWeight={'bold'}>{translate.string('checkout.address.submit')}</Typography>
						</Button>
					</Grid>
				</form>
			</Grid>
		</Stack>
	)
}
export default Address
