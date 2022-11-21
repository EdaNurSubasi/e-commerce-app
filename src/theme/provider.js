import {createTheme, ThemeProvider} from '@mui/material'
import {createContext, useContext} from 'react'
import {ConfigContext} from '../config'
import colors from './colors'

const Context = createContext(null)
Context.displayName = 'ThemeContext'

const Provider = ({children}) => {
	const {theme} = useContext(ConfigContext)

	let mode = 'light'

	const override = createTheme({
		palette: {
			...colors,
			type: mode,
		},
	})
	return <ThemeProvider theme={override}>{children}</ThemeProvider>
}

export {Context, Provider}
