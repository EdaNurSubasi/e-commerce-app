import {
	Button,
	CircularProgress,
	Divider,
	FormControl,
	Grid,
	InputLabel,
	LinearProgress,
	MenuItem,
	Pagination,
	Paper,
	Select,
	Stack,
	Typography,
} from '@mui/material'
import {makeStyles} from '@mui/styles'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Filter, Product, Toast} from '../components'
import {translate} from '../localization'
import {ProductActions} from '../store/actions'
import {height} from '@mui/system'

const useStyles = makeStyles(theme => ({
	container: {
		overflow: 'hidden',
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		height: '100%',
	},
	categories: {
		display: 'flex',
		flex: 2,
		padding: 5,
		backgroundColor: 'lightgray',
	},
	products: {
		flex: 10,
		overflow: 'auto',
		padding: 20,
		width: '100%',
		height: '100%',
	},
	category: {
		alignContent: 'center',
		justifyContent: 'center',
	},
}))

const Home = () => {
	const dispatch = useDispatch()
	const style = useStyles()
	const products = useSelector(state => state.product.products)
	const categories = useSelector(state => state.product.categories)

	const [limit, setLimit] = useState(10)
	const [sort, setSort] = useState('asc')
	const [cat, setCat] = useState(null)
	const [open, setOpen] = useState(false)
	const [item, setItem] = useState(0)
	const [selected, setSelected] = useState([])

	const handleLimitChange = limit => {
		setLimit(limit)
	}

	const handleSortChange = sort => {
		setSort(sort)
	}

	const handleCatChange = category => {
		setCat(category)
	}

	const handleProductAddClick = () => {
		setOpen(true)
	}

	const handlePageChange = (data, page) => {
		console.log(page)
		setItem((page - 1) * 4)
	}

	useEffect(() => {
		setSelected(products.data.slice(item, 4 + item))
		setItem(0)
	}, [products.data])

	useEffect(() => {
		setSelected(products.data.slice(item, 4 + item))
	}, [item])

	useEffect(() => {
		dispatch(ProductActions.products(limit, sort, cat))
	}, [limit, sort, cat])

	useEffect(() => {
		dispatch(ProductActions.categories())
	}, [])

	return (
		<>
			<Toast open={open} message={translate.string('product.addMessage')} severity="success" setOpen={setOpen} />
			<Stack className={style.container} direction="row">
				<Stack className={style.categories}>
					<Typography gutterBottom fontWeight={'bolder'} marginTop={6} marginBottom={6} textAlign="center" variant="h5">
						{translate.string('generic.cat')}
					</Typography>
					{!categories.waiting ? (
						<Stack className={style.category} spacing={2}>
							<Divider />
							<Button variant="text" onClick={() => handleCatChange(null)} color="warning">
								{translate.string('product.category.all')}
							</Button>
							<Divider />
							{categories.data.map((category, i) => (
								<>
									<Button variant="text" key={category} onClick={() => handleCatChange(category)} color="warning">
										{translate.string(`product.category.${category}`)}
									</Button>
									<Divider />
								</>
							))}
						</Stack>
					) : (
						<LinearProgress />
					)}
				</Stack>
				<Stack className={style.products}>
					<Filter limit={limit} sort={sort} onLimitChange={handleLimitChange} onSortChange={handleSortChange} />
					{!products.waiting ? (
						<>
							<Grid container direction="row" justifyContent="center" alignItems={'center'} spacing={{xs: 2, md: 3}}>
								{selected.map(product => (
									<Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
										<Product product={product} onProductAddClicked={handleProductAddClick} />
									</Grid>
								))}
							</Grid>
							<Stack alignItems={'center'} marginTop={5}>
								<Pagination count={Math.ceil(products.data.length / 4)} shape="rounded" onChange={handlePageChange} />
							</Stack>
						</>
					) : (
						<LinearProgress />
					)}
				</Stack>
			</Stack>
		</>
	)
}

export default Home
