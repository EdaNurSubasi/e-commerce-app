import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import './App.css'
import {ConfigProvider} from './config'
import {LocalizationProvider} from './localization'
import RouteStack from './routes/index'

function App() {
	return (
		<ConfigProvider>
			<LocalizationProvider>
				<BrowserRouter>
					<RouteStack />
				</BrowserRouter>
			</LocalizationProvider>
		</ConfigProvider>
	)
}

export default App
