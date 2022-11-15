import {FormControl, InputLabel, MenuItem, Select} from '@mui/material'
import {Stack} from '@mui/system'
import React from 'react'
import {translate} from '../localization'

const Filter = ({limit, sort, onSortChange, onLimitChange}) => {
	const handleSortChange = event => {
		onSortChange(event.target.value)
	}
	const handleLimitChange = event => {
		onLimitChange(event.target.value)
	}
	return (
		<Stack padding={2} direction={'row'} spacing={2}>
			<FormControl fullWidth>
				<InputLabel>{translate.string('generic.sort')}</InputLabel>
				<Select value={sort} label={translate.string('generic.sort')} onChange={handleSortChange}>
					<MenuItem value={'asc'}>{translate.string('generic.asc')}</MenuItem>
					<MenuItem value={'desc'}>{translate.string('generic.desc')}</MenuItem>
				</Select>
			</FormControl>
			<FormControl fullWidth>
				<InputLabel>{translate.string('generic.limit')}</InputLabel>
				<Select value={limit} label={translate.string('generic.limit')} onChange={handleLimitChange}>
					<MenuItem value={5}>5</MenuItem>
					<MenuItem value={10}>10</MenuItem>
					<MenuItem value={20}>20</MenuItem>
					<MenuItem value={40}>40</MenuItem>
				</Select>
			</FormControl>
		</Stack>
	)
}

export default Filter
