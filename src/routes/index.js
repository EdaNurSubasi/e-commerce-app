import React from 'react'
import {useSelector} from 'react-redux'
import {Routes, Route, useLocation, Navigate} from 'react-router-dom'

import {CartPage, CheckoutPage, HomePage, LoginPage, MainPage, ProductPage} from '../pages'

function Authenticated({children}) {
	const session = useSelector(state => state.user.session)
	let location = useLocation()

	let path = '/login'

	if (!session.data) {
		return <Navigate to={path} state={{from: location}} />
	}

	return children
}

export default RouteStack => {
	return (
		<div style={{display: 'flex', flex: 1, flexDirection: 'column', height: '100vh'}}>
			<Routes>
				<Route path="/" element={<MainPage />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/product/:id" element={<ProductPage />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route
						path="/payment"
						element={
							<Authenticated>
								<CheckoutPage />
							</Authenticated>
						}
					/>
				</Route>
			</Routes>
		</div>
	)
}
