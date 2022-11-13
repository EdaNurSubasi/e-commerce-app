import * as React from 'react'
import {AddressForm, CartItem, PaymentForm} from '../components'
import {Card, Divider, Stack} from '@mui/material'
import {makeStyles} from '@mui/styles'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {CartActions} from '../store/actions'

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		width: '100%',
	},
	address: {
		padding: '2%',
		flex: 3,
	},
	payment: {
		padding: '2%',
		flex: 3,
	},
	info: {
		display: 'flex',
		flex: 1,
	},
}))

let info = Object.freeze({
	cardNumber: '1111 1111 1111 1111',
	expirationDate: '11/11',
	cvc: '111',
	name: 'Jane Doe',
})

export default function Checkout() {
	const style = useStyles()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const cartStore = useSelector(state => state.cart.store)

	const [toggleForm, setToggleForm] = React.useState(true)

	const handleAddressSubmit = data => {
		setToggleForm(false)
	}

	const handlePaymentSubmit = data => {
		for (const key of Object.keys(info)) {
			if (data[key] != info[key]) {
				console.log('False')
				return
			}
		}
		dispatch(CartActions.clear())
		navigate('/')
		console.log('True')
	}

	return (
		<Stack className={style.container} direction="row">
			{toggleForm ? (
				<Stack className={style.address}>
					<AddressForm onAddressSubmit={handleAddressSubmit} />
				</Stack>
			) : (
				<Stack className={style.payment}>
					<PaymentForm onPaymentSubmit={handlePaymentSubmit} />
				</Stack>
			)}

			<Stack className={style.info}>
				{Object.keys(cartStore.data).map(p => (
					<Card key={p}>
						<CartItem item={cartStore.data[p]} />
					</Card>
				))}
			</Stack>
		</Stack>
	)
}
