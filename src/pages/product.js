import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {CartActions, ProductActions} from '../store/actions'
import {Button, CardMedia, CircularProgress, Divider, Paper, Rating, Stack, Typography} from '@mui/material'
import {makeStyles} from '@mui/styles'
import {translate} from '../localization'

import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import BorderColorIcon from '@mui/icons-material/BorderColor'

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		margin: 5,
	},
	content: {
		width: '100%',
		height: '100%',
	},
	title: {
		display: 'flex',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	actions: {
		display: 'flex',
		flex: 0.25,
		width: '100%',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	imageContainer: {
		display: 'flex',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	info: {
		display: 'flex',
		flex: 2,
		width: '100%',
	},
	description: {
		display: 'flex',
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		width: '100%',
		paddingRight: 5,
	},
	priceContainer: {
		display: 'flex',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		width: '100%',
	},
	price: {
		display: 'flex',
		flex: 1,
		width: '100%',
	},
	buy: {
		display: 'flex',
		flex: 0.5,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
}))

const Product = () => {
	const {id} = useParams()
	const style = useStyles()
	const dispatch = useDispatch()
	const product = useSelector(state => state.product.product)

	const handleClick = () => {
		dispatch(CartActions.store(product.data, 1))
	}

	useEffect(() => {
		dispatch(ProductActions.product(id))
	}, [id])

	return (
		<Stack className={style.container}>
			<Stack className={style.content}>
				{product.data?.id ? (
					<>
						<Stack className={style.actions} direction="row" spacing={2}>
							<Button className={style.remove} onClick={handleClick} variant="outlined" color="warning">
								<Typography paddingRight={1} fontWeight={'bold'}>
									{translate.string('shopCart.update')}
								</Typography>
								<BorderColorIcon />
							</Button>
							<Button className={style.remove} onClick={handleClick} variant="outlined" color="error">
								<Typography paddingRight={1} fontWeight={'bold'}>
									{translate.string('shopCart.delete')}
								</Typography>
								<DeleteForeverIcon />
							</Button>
						</Stack>
						<Stack className={style.title} spacing={2}>
							<Typography fontWeight={'bold'} variant="h3">
								{product.data.title}
							</Typography>
							<Typography fontWeight={'bold'} variant="subtitle1">
								{translate.string(`product.category.${product.data.category}`).toUpperCase()}
							</Typography>
						</Stack>
						<Stack display={'flex'} flex={3} flexDirection={'row'}>
							<Stack className={style.imageContainer}>
								<CardMedia component="img" image={product.data.image} sx={{maxWidth: '50%'}} />
							</Stack>
							<Stack className={style.info}>
								<Stack className={style.description}>
									<Typography variant="h5" padding={20}>
										{product.data.description}
									</Typography>
								</Stack>
								<Divider variant="middle" flexItem />
								<Stack className={style.priceContainer} flexDirection="row">
									<Stack className={style.price}>
										<Typography variant="h4">${product.data.price}</Typography>
									</Stack>
									<Stack className={style.price}>
										<Stack direction={'row'} spacing={2} justifyContent="center" alignItems={'center'}>
											<Rating value={product.data.rating.rate} readOnly />
											<Typography variant="h5"> {product.data.rating.rate}</Typography>
										</Stack>
									</Stack>
									<Stack className={style.price}>
										<Stack direction={'row'} spacing={2} justifyContent="center" alignItems={'center'}>
											<Typography variant="h5">
												{' '}
												{`${product.data.rating.count} ${translate.string('product.count')}`}
											</Typography>{' '}
										</Stack>
									</Stack>
								</Stack>
							</Stack>
						</Stack>

						<Divider variant="middle" flexItem />
						<Stack className={style.buy}>
							<Button className={style.remove} onClick={handleClick} variant="contained" color="success">
								<ShoppingCartCheckoutIcon />
								<Typography className={style.error} fontWeight={'bold'}>
									{translate.string('shopCart.addCart')}
								</Typography>
							</Button>
						</Stack>
					</>
				) : product.waiting ? (
					<CircularProgress />
				) : (
					<Stack item className={style.dataError}>
						<Typography className={style.error} fontWeight={'bold'}>
							{translate.string('error.dataNotFound')}
						</Typography>
					</Stack>
				)}
			</Stack>
		</Stack>
		// <Stack>
		// 	{product.waiting && <CircularProgress />}
		// 	{product.data?.id && (
		// 		<div className={style.container}>
		// 			<div className={style.title}>{product.data.title}</div>
		// 			<div className={style.category}>{product.data.category.toUpperCase()}</div>
		// 			<img className={style.image} src={product.data.image} />
		// 			<div className={style.price}>${product.data.price}</div>
		// 			<div className={style.description}>{product.data.description}</div>
		// 			<div className={style.rating}>
		// 				<Stack direction={'row'} spacing={2} justifyContent="center" alignItems={'center'}>
		// 					<Rating value={product.data.rating.rate} readOnly />
		// 					<Typography variant="h5"> {product.data.rating.rate}</Typography>
		// 				</Stack>
		// 			</div>
		// 			<div className={style.rating}>
		// 				<Stack direction={'row'} spacing={2} justifyContent="center" alignItems={'center'}>
		// 					<Typography variant="h5"> {`${product.data.rating.count} ${translate.string('product.count')}`}</Typography>
		// 				</Stack>
		// 			</div>
		// 		</div>
		// 	)}
		// </Stack>
	)
}

export default Product
