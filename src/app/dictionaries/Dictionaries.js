import React,{useState, useEffect} from 'react'
import {Button, Loader} from '../components/components'

function Dictionaries(props) {
	const status = props.status
	return(
		<div>
			<div className='row dictionary-wrapper'>
				{props.addMode ? 
					<AddDictionary 
						langArray={props.langArray}
						add={props.add}
						cancel={() => {props.setAddMode(false)}}
					/> 
					:
					<Info
						setAddMode={props.setAddMode}
						refresh={props.refresh}
					/>
				}{
				status === 'request'?
					<Loader 
						options={{size:60,color:'success'}}
					/>:
				status === 'empty'?
					<div className='my-border'>
						<h5>Is Empty</h5>
						<Button options = {{
							class:'add-dictionary-btn',
							text:'Click for create new',
							onClick:() => {props.setAddMode(true)}
						}}/>
					</div>
					:
					<List
						dictionaries ={props.dictionaries}
						rem={props.rem}
						addMode={props.addMode}
						setAddMode={props.setAddMode}
					/>
			  }
			</div>	
		</div>
	)	
}

export default Dictionaries

function Info(props) {
	return(
		<div className='info-dic'>
			<div>
				<h1>Dictionaries</h1>
			</div>
			<div className='dictionaries-info-buttons'>
				<Button options = {{
					color:'secondary',
					text:'Back to main',
					linkTo:'main'
				}}/>
				<Button options = {{
					text:'Refresh',
					onClick:props.refresh
				}}/>
				<Button options = {{
					color:'success',
					class:'add-dictionary-btn',
					text:'Create new',
					onClick:() => {props.setAddMode(mode => !mode)}
				}}/>
			</div>
		</div>
	)	
}

function List(props) {
	return(
		<div className='row dictionary-list'>
			{
				props.dictionaries.map(dict => {
					return(
						<div className='col-sm-4' key={dict.date}>
							<div className='card'>
								<div className='card-body'>
									<h5 className='card-title'>{dict.name}</h5>
									<p className='card-text'>{`From : ${dict.from.language}`}</p>
									<p className='card-text'>{`To : ${dict.to.language}`}</p>
									<p className='card-text'>{`Words : ${dict.items ? Object.keys(dict.items).length : 0}`}</p>
									<p className='card-text'>{`Created : ${new Date(+dict.date).toLocaleString()}`}</p>
									<Button options={{
										color: 'success',
										text: 'Learn',
										onClick: () => {}
									}} />
									<Button options={{
										color: 'primary',
										text: 'Edit',
										linkTo: 'edit/'+dict.date
									}} />
									<Button options={{
										color: 'warning',
										text: 'Delete',
										onClick: () => {
											const c = window.confirm('Delete '+dict.name+'?')
											if (c) props.rem(dict.date)
										;}
									}} />
								</div>
							</div>
						</div>
					)
				})
			}	
			{!props.addMode? 
				<div className='col-sm-4' >
				<div className='card-button-wrapper'>
					<Button options={{
						class: 'card-button',
						color: 'info',
						text: '+ NEW',
						onClick:() => {props.setAddMode(mode => !mode)}
					}} />
				</div>
			</div>:<></>}
		</div>
	)
}

function AddDictionary(props) {

	const [name, setName] = useState('')
	const [selectFrom, setFrom] = useState({code:'en', language:'english'})
	const [selectTo, setTo] = useState({code:'ru', language:'russian'})

	const onSelect = (eTarget, type) => {
		const option = eTarget[eTarget.selectedIndex]
		const object = {code:option.value, language:option.text}
		type === 'from' ? setFrom(object) : setTo(object)
	}

	useEffect(() => {
		setName(`${selectFrom.language} - ${selectTo.language}`)
	}, [selectTo, selectFrom])

return(
	<form className='dictionary-form'>

		<label className='form-label my-3 w-100 text-center'><h3>Please input params</h3></label>
		<div class='input-group mb-1'>

			<label className='form-label mx-3'>From:</label>
			<select 
				name = 'from'
				className='form-select' 
				value = {selectFrom.code} 
				onChange={(e) => onSelect(e.target, 'from')}
				>
					{
						props.langArray.map(language => 
							<option  	
								value={language[1]}>
								{language[0]}
							</option>
						)
					}
			</select>

			<label className='form-label mx-3'>To:</label>
			<select 
				name='to'
				className='form-select' 
				value = {selectTo.code} 
				onChange={(e) => onSelect(e.target, 'to')}
			>
				{
					props.langArray.map(language => 
						<option  	
							value={language[1]}>
							{language[0]}
						</option>
					)
				}
			</select>

			<div className='input-group mt-4 mb-2'>
				<label className='form-label mx-3'>Name:</label>
				<input 
					type='text' 
					className='form-control'  
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>


		</div>
		<Button options = {{
			color:'secondary',
			text:'<-- Back to main',
			linkTo:'main'
		}}/>
		<Button options = {{
			color:'success',
			text:'Add',
			disabled: ((name === '')||(selectTo.language === selectFrom.language)),
			onClick: () => props.add(name, selectFrom, selectTo)
		}}/>
		<Button options = {{
			color:'warning',
			text:'Cancel',
			onClick: props.cancel
		}}/>
	</form>
	)
}