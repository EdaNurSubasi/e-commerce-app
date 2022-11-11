import {Grid, Stack} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Filter, Product} from '../components'
import {ProductActions} from '../store/actions'

const Home = () => {
	const dispatch = useDispatch()
	const products = useSelector(state => state.product.products)

	const [limit, setLimit] = useState(10)
	const [sort, setSort] = useState('asc')

	const handleLimitChange = limit => {
		setLimit(limit)
	}
	const handleSortChange = sort => {
		setSort(sort)
	}

	useEffect(() => {
		dispatch(ProductActions.products(limit, sort))
	}, [limit, sort])

	return (
		<Stack>
			<Filter limit={limit} sort={sort} onLimitChange={handleLimitChange} onSortChange={handleSortChange} />
			<Grid
				container
				direction="row"
				alignItems={'flex-start'}
				justifyContent="center"
				spacing={{xs: 2, md: 3}}
				columns={{xs: 4, sm: 6, md: 12}}>
				{products.data.map(product => (
					<Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
						<Product product={product} />
					</Grid>
				))}
			</Grid>
		</Stack>
	)
}

export default Home
