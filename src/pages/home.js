import {Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Filter, Product} from '../components'
import {translate} from '../localization'
import {ProductActions} from '../store/actions'

const Home = () => {
	const dispatch = useDispatch()
	const products = useSelector(state => state.product.products)
	const categories = useSelector(state => state.product.categories)

	const [limit, setLimit] = useState(10)
	const [sort, setSort] = useState('asc')
	const [cat, setCat] = useState(null)

	const handleLimitChange = limit => {
		setLimit(limit)
	}

	const handleSortChange = sort => {
		setSort(sort)
	}

	const handleCatChange = category => {
		setCat(category)
		console.log(category)
	}

	useEffect(() => {
		dispatch(ProductActions.products(limit, sort, cat))
	}, [limit, sort, cat])

	useEffect(() => {
		dispatch(ProductActions.categories())
	}, [])

	return (
		<Stack display="flex" flexDirection="row">
			<Stack padding={1} direction={'column'} alignItems="center" spacing={2} width="100%">
				<Typography gutterBottom textAlign="center" marginTop={10} fontWeight={'bolder'} variant="h4" component="div">
					{translate.string('generic.cat')}
				</Typography>
				<Stack justifyContent="center" marginTop={20} padding={1} spacing={2}>
					{categories.data.map(category => (
						<Button variant="text" key={category} onClick={() => handleCatChange(category)}>
							{category}
						</Button>
					))}
				</Stack>
			</Stack>
			<Stack padding={5}>
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
		</Stack>
	)
}

export default Home
