import {Alert, Button, Card, CardActions, CardContent, CardMedia, Snackbar, Typography} from '@mui/material'
import {makeStyles} from '@mui/styles'
import React from 'react'
import {translate} from '../localization'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {CartActions} from '../store/actions'

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'column',
		height: 500,
		padding: 20,
	},
	image: {
		height: 120,
		maxWidth: '100%',
	},
	info: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
}))

const Product = ({product, onProductAddClicked}) => {
	const dispatch = useDispatch()

	const style = useStyles()
	const navigate = useNavigate()

	const handleDetailClick = () => {
		navigate(`/product/${product.id}`)
	}

	const handleAddCartClick = () => {
		dispatch(CartActions.store(product, 1))
		onProductAddClicked()
	}

	return (
		<Card className={style.container} elevation={4}>
			<div className={style.image}>
				<CardMedia component="img" image={product.image} sx={{maxWidth: '100%', maxHeight: '100%'}} />
			</div>
			<CardContent className={style.info}>
				<Typography gutterBottom textAlign="center" variant="h6" component="div">
					{product.category}
				</Typography>
				<Typography gutterBottom textAlign="center" variant="h5" component="div">
					{product.title}
				</Typography>
				<Typography className="bottom" display="flex" justifyContent="space-between" variant="subtitle1" component="div">
					{translate.string('product.price')}: ${product.price}
				</Typography>
			</CardContent>
			<CardActions>
				<Button onClick={handleDetailClick}>{translate.string('product.details')}</Button>
				<Button onClick={handleAddCartClick}>{translate.string('shopCart.addCart')}</Button>
			</CardActions>
		</Card>
	)
}

export default Product
