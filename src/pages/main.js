import {AccountCircle} from '@mui/icons-material'
import {AppBar, Badge, Box, Divider, IconButton, Menu, MenuItem, Toolbar, Typography} from '@mui/material'
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
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		padding: 30,
	},
	card: {
		maxWidth: '55%',
	},
}))

const Main = () => {
	const [anchorEl, setAnchorEl] = useState(null)
	const [totalPrice, setTotalPrice] = useState(0.0)

	const style = useStyles()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const cartStore = useSelector(state => state.cart.store)

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
		<Stack>
			<AppBar position="sticky" sx={{top: 0, bottom: 'auto'}}>
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
						<AccountCircle />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Outlet />
			<AppBar className={style.footer} position="sticky" sx={{bottom: 0}}>
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit" sx={{mr: 2}}></IconButton>
					<Typography variant="h6" component="div" sx={{flexGrow: 1}}>
						{translate.string('title').toUpperCase()}
					</Typography>
				</Toolbar>
			</AppBar>
			<Menu className={style.card} anchorEl={anchorEl} open={open} onClose={handleClose}>
				{Object.keys(cartStore.data).map(p => (
					<MenuItem>
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
