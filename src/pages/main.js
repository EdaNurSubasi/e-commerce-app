import {AccountCircle} from '@mui/icons-material'
import {AppBar, Badge, IconButton, Menu, MenuItem, Toolbar, Typography} from '@mui/material'
import {Stack} from '@mui/system'
import {makeStyles} from '@mui/styles'
import React, {useState} from 'react'
import {Outlet} from 'react-router-dom'
import {translate} from '../localization'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		padding: 30,
	},
}))

const Main = () => {
	const style = useStyles()
	return (
		<Stack>
			<AppBar position="sticky" sx={{top: 0, bottom: 'auto'}}>
				<Toolbar>
					<Typography variant="h6" component="div" sx={{flexGrow: 1, paddingLeft: 2}}>
						{translate.string('title').toUpperCase()}
					</Typography>
					<IconButton size="large" edge="start" color="inherit" sx={{mr: 2}}>
						<Badge badgeContent={4} color="secondary">
							<ShoppingCartIcon />
						</Badge>
					</IconButton>
					<IconButton size="large" edge="start" color="inherit" sx={{mr: 2}}>
						<AccountCircle />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Outlet />
			<AppBar position="sticky" sx={{top: 'auto', bottom: 0}}>
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit" sx={{mr: 2}}></IconButton>
					<Typography variant="h6" component="div" sx={{flexGrow: 1}}>
						{translate.string('title').toUpperCase()}
					</Typography>
				</Toolbar>
			</AppBar>
		</Stack>
	)
}

export default Main
