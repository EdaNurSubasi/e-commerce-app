import {AccountCircle} from '@mui/icons-material'
import {AppBar, IconButton, Menu, MenuItem, Toolbar, Typography} from '@mui/material'
import {Stack} from '@mui/system'
import React, {useState} from 'react'
import {Outlet} from 'react-router-dom'
import {translate} from '../localization'

const Main = () => {
	return (
		<Stack>
			<AppBar position="static">
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}></IconButton>
					<Typography variant="h6" component="div" sx={{flexGrow: 1}}>
						{translate.string('title').toUpperCase()}
					</Typography>
				</Toolbar>
			</AppBar>
			<Outlet />
			<AppBar position="static">
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}></IconButton>
					<Typography variant="h6" component="div" sx={{flexGrow: 1}}>
						{translate.string('title').toUpperCase()}
					</Typography>
				</Toolbar>
			</AppBar>
		</Stack>
	)
}

export default Main
