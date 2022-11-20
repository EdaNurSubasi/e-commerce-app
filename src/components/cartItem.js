import {Card, CardActions, CardContent, CardMedia, IconButton, Stack, Typography} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import {makeStyles} from '@mui/styles'

import {translate} from '../localization'

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flex: 1,
	},
	image: {
		display: 'flex',
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	info: {
		display: 'flex',
		flexDirection: 'column',
		flex: 8,
		width: '50%',
		justifyContent: 'center',
	},
	actions: {
		display: 'flex',
		flexDirection: 'column',
		flex: 4,
		justifyContent: 'center',
		alignItems: 'center',
	},
	action: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
}))

const CartItem = ({item, onAddCart, onRemoveCart}) => {
	const style = useStyles()

	const handleAdd = () => {
		onAddCart()
	}

	const handleRemove = () => {
		onRemoveCart()
	}

	return (
		<Card className={style.container} elevation={4}>
			<Stack className={style.image}>
				<CardMedia component="img" sx={{maxWidth: '75%'}} image={item.product.image} />
			</Stack>
			<CardContent className={style.info}>
				<Typography variant="h5" noWrap>
					{item.product.title}
				</Typography>
				<Typography variant="subtitle1" color="text.secondary">
					{item.product.category}
				</Typography>
			</CardContent>
			<CardActions className={style.actions}>
				{onAddCart ? (
					<>
						<Stack className={style.action} direction={'row'}>
							<IconButton onClick={handleRemove}>
								<RemoveIcon />
							</IconButton>
							<Typography variant="subtitle1" color="text.secondary" component="div">
								{item.quantity}
							</Typography>
							<IconButton onClick={handleAdd}>
								<AddIcon />
							</IconButton>
						</Stack>
					</>
				) : (
					<Stack className={style.action} direction={'row'}>
						<Typography variant="subtitle1" paddingRight={2} color="text.secondary" component="div">
							{translate.string('product.quantity')}:
						</Typography>
						<Typography variant="subtitle1" paddingRight={2} color="text.secondary" component="div">
							{item.quantity}
						</Typography>
					</Stack>
				)}
				<Typography fontWeight={'bold'} color="text.secondary" component="div">
					${(item.quantity * item.product.price).toFixed(2)}
				</Typography>
			</CardActions>
		</Card>
	)
}

export default CartItem
