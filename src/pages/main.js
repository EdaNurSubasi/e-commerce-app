import {AccountCircle} from '@mui/icons-material'
import {AppBar, Badge, CssBaseline, Divider, IconButton, Menu, MenuItem, Toolbar, Typography} from '@mui/material'
import {Stack} from '@mui/system'
import {makeStyles} from '@mui/styles'
import React, {useEffect, useState} from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import {translate} from '../localization'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LogoutIcon from '@mui/icons-material/Logout'
import {useDispatch, useSelector} from 'react-redux'
import {CartActions, UserActions} from '../store/actions'
import {CartItem} from '../components'

const useStyles = makeStyles(theme => ({
	container: {
		position: 'absolute',
		overflow: 'hidden',
		width: '100%',
		height: '100%',
	},
	card: {
		display: 'flex',
		width: '40%',
		height: '60%',
	},
	cardAll: {
		display: 'flex',
		flex: 1,
	},
	title: {
		display: 'flex',
		flex: 1,
		position: 'sticky',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
	},
	cartItems: {
		display: 'flex',
		flex: 1,
	},
	cartActions: {
		display: 'flex',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 5,
		paddingRight: 20,
		paddingLeft: 20,
	},
	header: {
		overflow: 'auto',
		position: 'fixed',
		color: 'white',
	},
	content: {
		position: 'absolute',
		overflowY: 'auto',
		overflowX: 'hidden',
		bottom: 40,
		top: 60,
		left: 0,
		right: 0,
	},
	footer: {
		position: 'absolute',
		width: '100%',
		left: 0,
		bottom: 0,
		right: 0,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
	},
}))

const Main = () => {
	const [anchorEl, setAnchorEl] = useState(null)
	const [anchorElUser, setAnchorElUser] = useState(null)
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

	const openUser = Boolean(anchorElUser)
	const handleUserExpendClick = event => {
		if (session.data) {
			setAnchorElUser(event.currentTarget)
		}
	}

	useEffect(() => {
		calculateTotalPrice()
	}, [cartStore.data])

	useEffect(() => {
		if (totalPrice == 0) setAnchorEl(null)
	}, [totalPrice])

	const handleProceedClick = () => {
		navigate('/login')
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleUserClose = () => {
		setAnchorElUser(null)
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

	const handleLogoutClick = () => {
		dispatch(UserActions.logout())
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
					<IconButton onClick={handleUserExpendClick} size="large" edge="start" color="inherit" sx={{mr: 2}}>
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
			<div className={style.content}>
				<Outlet />
			</div>
			<AppBar className={style.footer} position="fixed" color="primary" sx={{top: 'auto', bottom: 0}}>
				<Typography variant="h6" component="div">
					{translate.string('title').toUpperCase()}
				</Typography>
			</AppBar>

			<Menu className={style.card} anchorEl={anchorEl} open={open} onClose={handleClose}>
				<Stack className={style.cardAll}>
					<Stack className={style.title}>
						<Typography component="div" fontWeight={'bolder'} variant="h4">
							{translate.string('shopCart.pageTitle')}
						</Typography>
					</Stack>
					<Divider />
					<Stack className={style.cartItems}>
						{Object.keys(cartStore.data).map(p => (
							<MenuItem key={p}>
								<CartItem
									item={cartStore.data[p]}
									onAddCart={() => handleAddCart(cartStore.data[p].product)}
									onRemoveCart={() => handleRemoveCart(cartStore.data[p].product)}
								/>
							</MenuItem>
						))}
					</Stack>
					<Divider />
					<Stack className={style.cartActions} direction="row">
						<Stack direction={'row'}>
							<IconButton onClick={handleRouteClick} size="large" edge="start" color="inherit" sx={{mr: 2}}>
								<ShoppingCartIcon color="success" />
								<Typography fontWeight={'bold'}>{translate.string('shopCart.go')}</Typography>
							</IconButton>
							<IconButton onClick={handleProceedClick} size="large" edge="start" color="inherit" sx={{mr: 2}}>
								<ShoppingCartIcon color="success" />
								<Typography fontWeight={'bold'}>{translate.string('shopCart.proceed')}</Typography>
							</IconButton>
						</Stack>
						<Typography fontWeight={'bold'} color="text.secondary" component="div">
							{translate.string('shopCart.total')}: ${totalPrice.toFixed(2)}
						</Typography>
					</Stack>
				</Stack>
			</Menu>
			<Menu className={style.card} anchorEl={anchorElUser} open={openUser} onClose={handleUserClose}>
				<Stack className={style.cardAll}>
					<IconButton onClick={handleLogoutClick} size="large" edge="start" color="inherit" sx={{mr: 2}}>
						<LogoutIcon color="warning" />
						<Typography fontWeight={'bold'}>{translate.string('logout.submit')}</Typography>
					</IconButton>
				</Stack>
			</Menu>
		</Stack>
	)
}

export default Main
