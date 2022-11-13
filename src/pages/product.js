import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {ProductActions} from '../store/actions'
import {CircularProgress, Rating, Stack, Typography} from '@mui/material'
import {makeStyles} from '@mui/styles'
import {translate} from '../localization'

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		padding: 30,
	},
	title: {
		fontSize: 40,
		fontWeight: 'bolder',
		textAlign: 'center',
		padding: 10,
	},
	category: {
		fontSize: 30,
		color: 'GrayText',
		fontWeight: 'bolder',
		textAlign: 'center',
		padding: 10,
	},
	description: {
		fontSize: 20,
		color: 'GrayText',
		textAlign: 'center',
		padding: 10,
	},
	image: {
		width: '15%',
		padding: 10,
	},
	price: {
		color: 'red',
		fontWeight: 'bold',
		fontSize: 30,
		padding: 10,
	},
	rating: {
		color: 'mediumslateblue',
		fontWeight: 'bold',
		fontSize: 30,
		padding: 10,
	},
}))

const Product = () => {
	const {id} = useParams()
	const style = useStyles()
	const dispatch = useDispatch()
	const product = useSelector(state => state.product.product)

	useEffect(() => {
		dispatch(ProductActions.product(id))
	}, [id])

	return (
		<Stack>
			{product.waiting && <CircularProgress />}
			{product.data?.id && (
				<div className={style.container}>
					<div className={style.title}>{product.data.title}</div>
					<div className={style.category}>{product.data.category.toUpperCase()}</div>
					<img className={style.image} src={product.data.image} />
					<div className={style.price}>${product.data.price}</div>
					<div className={style.description}>{product.data.description}</div>
					<div className={style.rating}>
						<Stack direction={'row'} spacing={2} justifyContent="center" alignItems={'center'}>
							<Rating value={product.data.rating.rate} readOnly />
							<Typography variant="h5"> {product.data.rating.rate}</Typography>
						</Stack>
					</div>
					<div className={style.rating}>
						<Stack direction={'row'} spacing={2} justifyContent="center" alignItems={'center'}>
							<Typography variant="h5"> {`${product.data.rating.count} ${translate.string('product.count')}`}</Typography>
						</Stack>
					</div>
				</div>
			)}
		</Stack>
	)
}

export default Product
