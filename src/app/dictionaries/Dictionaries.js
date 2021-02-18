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
									<p className='card-text'>{`To : ${item.to}`}</p>
									<p className='card-text'>{`From : ${item.from}`}</p>
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
										onClick: () => {history.push(`/edit/${item.name}`)}
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
	const [select, setSelect] = useState({from:'en', to:'ru'})
	const [message, setMessage] = useState(null)

return(
	<form className='dictionary-form'>
		<div className='input-group my-4'>
			<label className='form-label mx-3'>Name:</label>
			<input 
				type='text' 
				className='form-control'  
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
		</div>

		<label className='form-label mb-3 w-100 text-center'>Please input params:</label>
		<div class='input-group mb-3'>

			<label className='form-label mx-3'>From:</label>
			<select className='form-select' value = {select.from} onChange={e => setSelect({from:select.to, from:e.target.value})}>
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
			<select className='form-select' value = {select.to} onChange={e => setSelect({from:select.from, to:e.target.value})}>
				{
					props.langArray.map(language => 
						<option  	
							value={language[1]}>
							{language[0]}
						</option>
					)
				}
			</select>


		</div>
		<Error message={message}/>
		<Button options = {{
			color:'success',
			text:'Add',
			disabled: ((name === '')||(select.to === select.from)),
			onClick: () => {props.add(name, select.from, select.to)}			
		}}/>
		<Button options = {{
			color:'warning',
			text:'Cancel',
			onClick: props.cancel
		}}/>
	</form>
	)
}