import {AccountCircle} from '@mui/icons-material'
import {AppBar, Badge, Box, CssBaseline, Divider, IconButton, Menu, MenuItem, Paper, Toolbar, Typography} from '@mui/material'
import {Stack} from '@mui/system'
import {makeStyles} from '@mui/styles'
import React, {useEffect, useState} from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import {translate} from '../localization'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {useDispatch, useSelector} from 'react-redux'
import {CartActions} from '../store/actions'
import {CartItem} from '../components'

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		position: 'absolute',
		flexDirection: 'column',
		overflow: 'hidden',
		width: '100%',
		height: '100%',
	},
	contents: {
		overflow: 'hidden',
		marginTop: 68,
		marginBottom: 45,
		marginRight: 10,
		marginLeft: 10,
		height: '100%',
	},
	card: {
		maxWidth: '55%',
	},
	header: {
		position: 'fixed',
		color: 'white',
	},
	content: {
		display: 'flex',
		overflow: 'auto',
		width: '100%',
		height: '100%',
	},
	footer: {
		display: 'flex',
		position: 'absolute',
		width: '100%',
		left: 0,
		bottom: 0,
		backgroundColor: 'purple',
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
	},
}))

const Main = () => {
	const [anchorEl, setAnchorEl] = useState(null)
	const [totalPrice, setTotalPrice] = useState(0.0)

	const style = useStyles()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const cartStore = useSelector(state => state.cart.store)
	const session = useSelector(state => state.user.session)

	const open = Boolean(anchorEl)
	const handleExpendClick = event => {
		if (Object.keys(cartStore.data).length) {
			setAnchorEl(event.currentTarget)
		}
	}

	useEffect(() => {
		calculateTotalPrice()
	}, [cartStore.data])

	useEffect(() => {
		if (totalPrice == 0) setAnchorEl(null)
	}, [totalPrice])

	const handleClose = () => {
		setAnchorEl(null)
	}
	const handleRouteClick = event => {
		navigate(`/cart`)
	}

	const handleAddCart = product => {
		dispatch(CartActions.store(product, 1))
	}

	const handleRemoveCart = product => {
		dispatch(CartActions.store(product, -1))
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
			<Paper className={style.contents} variant="outlined">
				<CssBaseline />
				<AppBar className={style.header}>
					<Toolbar>
						<Typography variant="h6" component="div" sx={{flexGrow: 1, paddingLeft: 2}}>
							{translate.string('title').toUpperCase()}
						</Typography>
						<IconButton onClick={handleExpendClick} size="large" edge="start" color="inherit" sx={{mr: 2}}>
							<Badge badgeContent={Object.keys(cartStore.data).length} color="secondary">
								<ShoppingCartIcon />
							</Badge>
						</IconButton>
						<IconButton size="large" edge="start" color="inherit" sx={{mr: 2}}>
							{session.data ? (
								<Badge variant="dot" color="secondary">
									<AccountCircle />
								</Badge>
							) : (
								<AccountCircle />
							)}
						</IconButton>
					</Toolbar>
				</AppBar>
				<main className={style.content}>
					<Outlet />
				</main>
				<div className={style.footer}>
					<Typography variant="h6" component="div">
						{translate.string('title').toUpperCase()}
					</Typography>
				</div>
			</Paper>
			<Menu className={style.card} anchorEl={anchorEl} open={open} onClose={handleClose}>
				{Object.keys(cartStore.data).map(p => (
					<MenuItem key={p}>
						<CartItem
							item={cartStore.data[p]}
							onAddCart={() => handleAddCart(cartStore.data[p].product)}
							onRemoveCart={() => handleRemoveCart(cartStore.data[p].product)}
						/>
					</MenuItem>
				))}
				<Divider />
				<Box display={'flex'} flexDirection="row" paddingLeft={3} paddingRight={3} alignItems={'center'} justifyContent={'space-between'}>
					<IconButton onClick={handleRouteClick} size="large" edge="start" color="inherit" sx={{mr: 2}}>
						<ShoppingCartIcon color="success" />
						<Typography fontWeight={'bold'}>{translate.string('shopCart.go')}</Typography>
					</IconButton>
					<Typography fontWeight={'bold'} color="text.secondary" component="div">
						{translate.string('shopCart.total')}: ${totalPrice}
					</Typography>
				</Box>
			</Menu>
		</Stack>
	)
}

export default Main
