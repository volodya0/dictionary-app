import React,{useState, createRef, useEffect} from 'react'
import {Button, Loader, Error} from '../components/components'
import {useHistory} from 'react-router-dom';


function Dictionaries(props) {
	const status = props.status.type
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
					/>
				}{
				status === 'load'?
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
						dictionaries ={props.status.dictionaries}
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
			<div>
				<Button options = {{
					class:'add-dictionary-btn',
					text:'Create new',
					onClick:() => {props.setAddMode(mode => !mode)}
				}}/>
			</div>
		</div>
	)	
}

function List(props) {
	const history = useHistory()
	return(
		<div className='row dictionary-list'>
			{
				props.dictionaries.map(item => {
					return(
						<div className='col-sm-4' key={item.name}>
							<div className='card'>
								<div className='card-body'>
									<h5 className='card-title'>{item.name}</h5>
									<p className='card-text'>{`From : ${item.from.language}`}</p>
									<p className='card-text'>{`To : ${item.to.language}`}</p>
									<p className='card-text'>{`Words : ${item.words}`}</p>
									<p className='card-text'>{`Created : ${new Date(+item.date).toLocaleString()}`}</p>
									<Button options={{
										color: 'success',
										text: 'Learn',
										onClick: () => {alert('learn')}
									}} />
									<Button options={{
										color: 'primary',
										text: 'Edit',
										onClick: () => {history.push(`/edit/${item.name}/${item.from.code}/${item.to.code}`)}
									}} />
									<Button options={{
										color: 'warning',
										text: 'Delete',
										onClick: () => {
											alert('Are you sirius?')
											props.rem(item.name)
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
			color:'success',
			text:'Add',
			disabled: ((name === '')||(selectTo.language === selectFrom.language)),
			onClick: () => { 
			console.log('onClick', selectFrom, selectTo)
			props.add(name, selectFrom, selectTo)
		}			
		}}/>
		<Button options = {{
			color:'warning',
			text:'Cancel',
			onClick: props.cancel
		}}/>
	</form>
	)
}