import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import './App.css'
import {ConfigProvider} from './config'
import {LocalizationProvider} from './localization'
import RouteStack from './routes/index'
import {SecurityProvider} from './security'

function App() {
	return (
		<ConfigProvider>
			<LocalizationProvider>
				<BrowserRouter>
					<SecurityProvider>
						<RouteStack />
					</SecurityProvider>
				</BrowserRouter>
			</LocalizationProvider>
		</ConfigProvider>
	)
}

export default App
