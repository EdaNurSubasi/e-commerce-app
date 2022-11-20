import {Divider, Paper, Stack, Typography} from '@mui/material'
import {makeStyles} from '@mui/styles'

import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import {AddressForm, CartItem, PaymentForm, Toast} from '../components'
import {CartActions} from '../store/actions'
import {translate} from '../localization'

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		width: '100%',
	},
	address: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 10,
		height: '100%',
	},
	info: {
		display: 'flex',
		flex: 8,
		overflow: 'hidden',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
	},
	title: {
		display: 'flex',
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	infoPanel: {
		display: 'flex',
		flex: 8,
		height: '100%',
		width: '100%',
		padding: 10,
		overflow: 'auto',
	},
	footer: {
		display: 'flex',
		flex: 1,
		width: '100%',
		alignItems: 'flex-end',
		justifyContent: 'center',
		paddingRight: 15,
	},
}))

let info = Object.freeze({
	cardNumber: '1111111111111111',
	expirationDate: '11/11',
	cvc: '111',
	name: 'Jane Doe',
})

export default function Checkout() {
	const style = useStyles()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const cartStore = useSelector(state => state.cart.store)

	const [toggleForm, setToggleForm] = useState(true)
	const [successOpen, setSuccessOpen] = useState(false)
	const [errorOpen, setErrorOpen] = useState(false)
	const [totalPrice, setTotalPrice] = useState(0.0)

	const handleAddressSubmit = data => {
		setToggleForm(false)
		setSuccessOpen(true)
	}

	const handlePaymentSubmit = data => {
		for (const key of Object.keys(info)) {
			if (data[key] != info[key]) {
				setErrorOpen(true)
				return
			}
		}
		setSuccessOpen(true)
		dispatch(CartActions.clear())
		setTimeout(() => {
			navigate('/')
		}, 2000)
	}

	useEffect(() => {
		calculateTotalPrice()
	}, [cartStore.data])

	const calculateTotalPrice = () => {
		let total = 0.0
		for (const item of Object.keys(cartStore.data)) {
			const price = cartStore.data[item].quantity * cartStore.data[item].product.price
			total += price
		}
		setTotalPrice(total)
	}

	return (
		<Stack className={style.container} direction="row">
			{toggleForm ? (
				<Stack className={style.address}>
					<AddressForm onAddressSubmit={handleAddressSubmit} />
				</Stack>
			) : (
				<Stack className={style.address}>
					<PaymentForm onPaymentSubmit={handlePaymentSubmit} />
				</Stack>
			)}

			<Paper className={style.info} elevation={4}>
				<Stack className={style.title}>
					<Typography component="div" fontWeight={'bolder'} variant="h4">
						{translate.string('shopCart.pageTitle').toUpperCase()}
					</Typography>
				</Stack>
				<Divider variant="middle" flexItem />
				<Toast open={successOpen} message={translate.string('checkout.saved')} severity="success" setOpen={setSuccessOpen} />
				<Toast open={errorOpen} message={translate.string('error.payment')} severity="error" setOpen={setErrorOpen} />
				<Stack className={style.infoPanel} spacing={1}>
					{Object.keys(cartStore.data).map(p => (
						<Stack key={p}>
							<CartItem item={cartStore.data[p]} />
						</Stack>
					))}
				</Stack>
				<Divider variant="middle" flexItem />
				<Stack className={style.footer}>
					<Typography fontWeight={'bold'} color="text.secondary" component="div">
						{translate.string('shopCart.total')}: ${totalPrice.toFixed(2)}
					</Typography>
				</Stack>
			</Paper>
		</Stack>
	)
}
