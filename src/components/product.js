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

//TODO: Clicking - Routing
const Product = ({product}) => {
	const style = useStyles()
	const navigate = useNavigate()

	const showDetails = () => {
		navigate(`/product/${product.id}`)
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
					{translate.string('generic.price')}: ${product.price}
				</Typography>
			</CardContent>
			<CardActions>
				<Button onClick={showDetails}>{translate.string('generic.details')}</Button>
			</CardActions>
		</Card>
	)
}

export default Product
