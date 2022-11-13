import React from 'react'
import {Routes, Route} from 'react-router-dom'

import {CartPage, HomePage, LoginPage, MainPage, ProductPage} from '../pages'

export default RouteStack => {
	return (
		<div style={{display: 'flex', flex: 1, flexDirection: 'column', height: '100vh'}}>
			<Routes>
				<Route path="/" element={<MainPage />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/product/:id" element={<ProductPage />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/login" element={<LoginPage />} />
				</Route>
			</Routes>
		</div>
	)
}
