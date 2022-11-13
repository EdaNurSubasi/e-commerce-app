import {Button, Card, CardActions, CardMedia, Grid, IconButton, Stack, Typography} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {translate} from '../localization'
import {CartActions} from '../store/actions'
import {makeStyles} from '@mui/styles'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import {useNavigate} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: '1%',
	},
	title: {
		padding: '1%',
	},
	dataError: {
		display: 'flex',
		padding: '4%',
		paddingTop: '2%',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	error: {},
	checkout: {
		width: '100%',
		padding: '2%',
	},
	cart: {
		display: 'flex',
		padding: '4%',
		paddingTop: '2%',
	},
	cartItem: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	itemContainer: {
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'center',
		flexDirection: 'row',
		width: '100%',
	},
	image: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 200,
		width: 200,
	},
	desc: {
		justifyContent: 'center',
		alignItems: 'flex-start',
		width: '80%',
	},
	actions: {
		display: 'flex',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	price: {
		display: 'flex',
		flex: 5,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	remove: {
		flex: 1,
	},
}))

const Cart = () => {
	const style = useStyles()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [totalPrice, setTotalPrice] = useState(0.0)

	const cartStore = useSelector(state => state.cart.store)

	useEffect(() => {
		calculateTotalPrice()
	}, [cartStore.data])

	const handleAdd = product => {
		dispatch(CartActions.store(product, 1))
	}

	const handleRemove = (product, count = 1) => {
		dispatch(CartActions.store(product, count * -1))
	}

	const handleClick = () => {
		navigate('/login')
	}

	const calculateTotalPrice = () => {
		let total = 0.0
		for (const item of Object.keys(cartStore.data)) {
			const price = cartStore.data[item].quantity * cartStore.data[item].product.price
			total += price
		}
		setTotalPrice(total)
	}

	return (
		<Stack className={style.container}>
			<Stack className={style.title}>
				<Typography component="div" variant="h5">
					{translate.string('shopCart.pageTitle').toUpperCase()}
				</Typography>
			</Stack>
			{Object.keys(cartStore.data).length ? (
				<Grid container className={style.cart}>
					{Object.keys(cartStore.data).map(p => (
						<Grid item key={p} className={style.cartItem}>
							<Card className={style.itemContainer}>
								<Stack className={style.image}>
									<CardMedia sx={{maxWidth: '50%'}} component="img" image={cartStore.data[p].product.image} />
								</Stack>
								<Stack className={style.desc}>
									<Typography fontWeight={'bold'}>{cartStore.data[p].product.title}</Typography>
									<Typography variant="subtitle1">{cartStore.data[p].product.category}</Typography>
									<Typography color="text.secondary">{cartStore.data[p].product.description}</Typography>
								</Stack>
								<CardActions className={style.actions} direction="row">
									<IconButton onClick={() => handleRemove(cartStore.data[p].product)}>
										<RemoveIcon />
									</IconButton>
									<Typography color="text.secondary">{cartStore.data[p].quantity}</Typography>
									<IconButton onClick={() => handleAdd(cartStore.data[p].product)}>
										<AddIcon />
									</IconButton>
									<Typography className={style.price} fontWeight={'bold'} component="div" variant="subtitle1">
										${cartStore.data[p].quantity * cartStore.data[p].product.price}
									</Typography>
									<IconButton
										className={style.remove}
										onClick={() => handleRemove(cartStore.data[p].product, cartStore.data[p].quantity)}>
										<DeleteForeverIcon />
									</IconButton>
								</CardActions>
							</Card>
						</Grid>
					))}
					<Grid item className={style.checkout}>
						<Typography className={style.price} fontWeight={'bold'} paddingBottom={'2%'}>
							{translate.string('shopCart.total')}: ${totalPrice}
						</Typography>
						<Button className={style.remove} onClick={handleClick} fullWidth variant="contained" color="success">
							<ShoppingCartCheckoutIcon />
							<Typography className={style.error} fontWeight={'bold'}>
								{translate.string('shopCart.proceed')}
							</Typography>
						</Button>
					</Grid>
				</Grid>
			) : (
				<Grid item className={style.dataError}>
					<Typography className={style.error} fontWeight={'bold'}>
						{translate.string('error.dataNotFound')}
					</Typography>
				</Grid>
			)}
		</Stack>
	)
}

export default Cart
