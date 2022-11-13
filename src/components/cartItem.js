import {Box, Card, CardContent, CardMedia, IconButton, Stack, Typography} from '@mui/material'
import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const CartItem = ({item, onAddCart, onRemoveCart}) => {
	const handleAdd = () => {
		onAddCart()
	}

	const handleRemove = () => {
		onRemoveCart()
	}

	return (
		<Stack>
			<Card sx={{display: 'flex', flexDirection: 'row'}}>
				<CardMedia component="img" sx={{flex: 1, width: '10%'}} image={item.product.image} />
				<CardContent sx={{flex: 1, width: 400}}>
					<Typography component="div" variant="h5" noWrap width={300}>
						{item.product.title}
					</Typography>
					<Typography variant="subtitle1" color="text.secondary" component="div">
						{item.product.category}
					</Typography>
				</CardContent>
				<Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1, flex: 5}}>
					{onAddCart && (
						<IconButton onClick={handleRemove}>
							<RemoveIcon />
						</IconButton>
					)}

					<Typography variant="subtitle1" color="text.secondary" component="div">
						{item.quantity}
					</Typography>

					{onAddCart && (
						<IconButton onClick={handleAdd}>
							<AddIcon />
						</IconButton>
					)}

					<Typography fontWeight={'bold'} color="text.secondary" component="div">
						${item.quantity * item.product.price}
					</Typography>
				</Box>
			</Card>
		</Stack>
	)
}

export default CartItem
