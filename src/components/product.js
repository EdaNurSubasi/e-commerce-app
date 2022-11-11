import {Card, CardContent, CardMedia, Typography} from '@mui/material'
import {makeStyles} from '@mui/styles'
import React from 'react'
import {translate} from '../localization'

/**
 * {
		id: 1,
		title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
		price: 109.95,
		description:
			'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
		category: "men's clothing",
		image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
		rating: {
			rate: 3.9,
			count: 120,
		},
	}
*/

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
	},
}))

//TODO: Other Fields, Clicking
const Product = ({product}) => {
	const style = useStyles()
	return (
		<Card className={style.container}>
			<CardMedia component="img" image={product.image} sx={{width: '50%'}} />
			<CardContent>
				<Typography gutterBottom textAlign="center" variant="h3" component="div">
					{product.title}
				</Typography>
				<Typography gutterBottom paragraph color="textSecondary" component="div">
					{translate.string('generic.description')}: {product.description}
				</Typography>
				<Typography gutterBottom variant="h5" component="div">
					{translate.string('generic.price')}: ${product.price}
				</Typography>
			</CardContent>
		</Card>
	)
}

export default Product
