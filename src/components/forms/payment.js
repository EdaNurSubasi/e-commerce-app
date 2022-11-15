import {Alert, Button, Grid, Box, Stack, TextField, Typography, Divider} from '@mui/material'
import React from 'react'
import {useForm, Controller} from 'react-hook-form'
import {AccountCircle} from '@mui/icons-material'
import CheckIcon from '@mui/icons-material/Check'
import {makeStyles} from '@mui/styles'
import {translate} from '../../localization'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import PinIcon from '@mui/icons-material/Pin'
import EventNoteIcon from '@mui/icons-material/EventNote'

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

const Payment = ({onPaymentSubmit}) => {
	const style = useStyles()

	const {
		control,
		formState: {errors},
		handleSubmit,
		register,
	} = useForm({
		defaultValues: {
			expirationDate: '',
			cardNumber: '',
			cvc: '',
			email: '',
			phone: '',
			name: '',
		},
	})

	const onSubmit = data => {
		console.log(data)
		onPaymentSubmit(data)
	}

	return (
		<Stack className={style.container} spacing={2}>
			<Stack className={style.title} spacing={2}>
				<Typography variant="h5" component="div" fontWeight={'bolder'}>
					{translate.string('checkout.payment.title')}
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
												label={`${translate.string('checkout.payment.name')}`}
												value={value}
												{...register('name', {required: true})}
												onChange={onChange}
												variant="standard"
											/>
										)}
										name={'name'}
										control={control}
									/>
								</Box>
								{errors.name?.type === 'required' && <Alert severity="error">{translate.string('error.required')}</Alert>}
							</div>
							<div className={style.firstName}>
								<Box sx={{display: 'flex', alignItems: 'flex-end'}}>
									<EmailIcon sx={{color: 'action.active', mr: 1, my: 0.5}} />
									<Controller
										render={({field: {onChange, value}}) => (
											<TextField
												error={errors.email?.type === 'required'}
												label={`${translate.string('checkout.payment.email')}`}
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
												label={`${translate.string('checkout.payment.phone')}`}
												type="phone"
												variant="standard"
												value={value}
												onChange={onChange}
											/>
										)}
										rules={{required: true, pattern: /^[0-9]+$/i, maxLength: 11, minLength: 11}}
										name={'phone'}
										control={control}
									/>
								</Box>
								{(errors.phone?.type === 'maxLength' || errors.phone?.type === 'minLength') && (
									<Alert severity="error">{translate.string('error.phone')}</Alert>
								)}
								{errors.phone?.type === 'pattern' && <Alert severity="error">{translate.string('error.pattern')}</Alert>}
								{errors.phone?.type === 'required' && <Alert severity="error">{translate.string('error.required')}</Alert>}
							</div>
						</Grid>
						<Divider orientation="vertical" variant="middle" flexItem />
						<Grid item className={style.addressInfo}>
							<div className={style.firstName}>
								<Box sx={{display: 'flex', alignItems: 'flex-end'}}>
									<CreditCardIcon sx={{color: 'action.active', mr: 1, my: 0.5}} />
									<Controller
										render={({field: {onChange, value}}) => (
											<TextField
												error={errors.cardNumber?.type === 'required'}
												label={`${translate.string('checkout.payment.cardNumber')}`}
												value={value}
												{...register('cardNumber')}
												onChange={onChange}
												variant="standard"
											/>
										)}
										rules={{required: true, pattern: /^[0-9]+$/i, maxLength: 16, minLength: 16}}
										name={'cardNumber'}
										control={control}
									/>
								</Box>
								{errors.cardNumber?.type === 'pattern' && <Alert severity="error">{translate.string('error.pattern')}</Alert>}
								{(errors.cardNumber?.type === 'maxLength' || errors.phone?.type === 'minLength') && (
									<Alert severity="error">{translate.string('error.cardNumber')}</Alert>
								)}
								{errors.cardNumber?.type === 'required' && <Alert severity="error">{translate.string('error.required')}</Alert>}
							</div>
							<div className={style.firstName}>
								<Box sx={{display: 'flex', alignItems: 'flex-end'}}>
									<EventNoteIcon sx={{color: 'action.active', mr: 1, my: 0.5}} />
									<Controller
										render={({field: {onChange, value}}) => (
											<TextField
												error={errors.expirationDate?.type === 'required'}
												label={`${translate.string('checkout.payment.expirationDate')}`}
												value={value}
												{...register('expirationDate', {required: true})}
												onChange={onChange}
												variant="standard"
											/>
										)}
										name={'expirationDate'}
										control={control}
									/>
								</Box>
								{errors.expirationDate?.type === 'required' && <Alert severity="error">{translate.string('error.required')}</Alert>}
							</div>
							<div className={style.firstName}>
								<Box sx={{display: 'flex', alignItems: 'flex-end'}}>
									<PinIcon sx={{color: 'action.active', mr: 1, my: 0.5}} />
									<Controller
										render={({field: {onChange, value}}) => (
											<TextField
												error={errors.cvc?.type === 'required'}
												label={`${translate.string('checkout.payment.cvc')}`}
												value={value}
												{...register('cvc', {required: true})}
												onChange={onChange}
												variant="standard"
											/>
										)}
										name={'cvc'}
										control={control}
									/>
								</Box>
								{errors.cvc?.type === 'required' && <Alert severity="error">{translate.string('error.required')}</Alert>}
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

export default Payment
