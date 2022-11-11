import {Grid} from '@mui/material'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Product} from '../components'
import {ProductActions} from '../store/actions'

const Home = () => {
	const dispatch = useDispatch()
	const products = useSelector(state => state.product.products)

	useEffect(() => {
		dispatch(ProductActions.products())
	}, [])

	return (
		<Grid container justify="center" spacing={2}>
			{products.data.map(product => (
				<Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
					<Product product={product} />
				</Grid>
			))}
		</Grid>
	)
}

export default Home
