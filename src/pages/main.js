import {AccountCircle} from '@mui/icons-material'
import {AppBar, Badge, Box, CssBaseline, Divider, IconButton, Menu, MenuItem, Toolbar, Typography} from '@mui/material'
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
		overflow: 'auto',
		width: '100%',
		height: '100%',
	},
	card: {
		maxWidth: '55%',
	},
	header: {
		position: 'absolute',
		width: '100%',
		height: 60,
		color: 'white',
	},
	content: {
		display: 'flex',
		flex: 1,
		marginTop: 64,
	},
	footer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		width: '100%',
		backgroundColor: 'purple',
		height: 60,
		textAlign: 'center',
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
			{/* <div className={style.footer}>
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit" sx={{mr: 2}}></IconButton>
					<Typography variant="h6" component="div" sx={{flexGrow: 1}}>
						{translate.string('title').toUpperCase()}
					</Typography>
				</Toolbar>
			</div> */}
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
				<Box display={'flex'} flexDirection="row" padding={3} alignItems={'center'} justifyContent={'space-between'}>
					<IconButton onClick={handleRouteClick} size="large" edge="start" color="inherit" sx={{mr: 2}}>
						<ShoppingCartIcon color="success" />
					</IconButton>
					<Typography fontWeight={'bold'} color="text.secondary" component="div">
						${totalPrice}
					</Typography>
				</Box>
			</Menu>
		</Stack>
	)
}

export default Main
