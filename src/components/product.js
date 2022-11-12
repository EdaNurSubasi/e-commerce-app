import {Button, Card, CardActions, CardContent, CardMedia, Typography} from '@mui/material'
import {makeStyles} from '@mui/styles'
import React from 'react'
import {translate} from '../localization'
import {Navigate, useNavigate} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		height: 600,
	},
}))

const Product = ({product}) => {
	const style = useStyles()
	const navigate = useNavigate()

	const handleDetailClick = () => {
		navigate(`/product/${product.id}`)
	}

	const handleAddCartClick = () => {
		console.log(product)
	}

	return (
		<Card className={style.container}>
			<CardMedia component="img" image={product.image} sx={{width: '25%'}} />
			<CardContent>
				<Typography gutterBottom textAlign="center" variant="h4" component="div">
					{product.title}
				</Typography>
				<Typography gutterBottom textAlign="center" variant="h6" component="div">
					{product.category}
				</Typography>
				<Typography className="bottom" display="flex" justifyContent="space-between" textAlign="center" variant="h5" component="div">
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
