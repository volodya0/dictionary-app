import React,{useState, useEffect} from 'react'
import {Button, Loader} from '../components/components'
import styled from 'styled-components'
import colors from '../../colors'
import { DictionariesTexts as Text } from '../../languages' 

function Dictionaries(props) {
	const status = props.status
	return(
		<div>
			<div className='row dictionaries-wrapper'>
				{props.addMode ? 
					<AddDictionary 
						lang = {props.lang}
						langArray={props.langArray}
						add={props.add}
						cancel={() => {props.setAddMode(false)}}
						theme={props.theme}
					/> 
					:
					<Info
						lang = {props.lang}
						setAddMode={props.setAddMode}
						refresh={props.refresh}
						theme={props.theme}
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
						lang = {props.lang}
						theme={props.theme}
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
	const InfoStyle = styled.div`
    background-color: ${colors.secondHead[+props.theme]};
  `
	return(
		<InfoStyle className='info-dic'>
			<div>
				<h1>{Text.header_text[props.lang]}</h1>
			</div>
			<div className='dictionaries-info-buttons'>
				<Button options = {{
					color:'secondary',
					text: `${Text.back_button_text[props.lang]}`,
					linkTo:'main'
				}}/>
				<Button options = {{
					text: `${Text.refresh_button_text[props.lang]}`,
					onClick:props.refresh
				}}/>
				<Button options = {{
					color:'success',
					class:'add-dictionary-btn',
					text:`${Text.create_button_text[props.lang]}`,
					onClick:() => {props.setAddMode(mode => !mode)}
				}}/>
			</div>
		</InfoStyle>
	)	
}

function List(props) {

	const CardStyled = styled.div`
    background-color: ${colors.info[+props.theme]};
  `

	return(
		<div className='row dictionary-list'>
			{
				props.dictionaries.map(dict => {
					return(
						<div className='col-sm-4' key={dict.date}>
							<CardStyled className='card'>
								<div className='card-body'>
									<h5 className='card-title'>{dict.name}</h5>
									<p className='card-text'>{`${Text.card_from_text[props.lang]} : ${dict.from.language}`}</p>
									<p className='card-text'>{`${Text.card_to_text[props.lang]} : ${dict.to.language}`}</p>
									<p className='card-text'>{`${Text.card_words_text[props.lang]} : ${dict.items ? Object.keys(dict.items).length : 0}`}</p>
									<p className='card-text'>{`${Text.card_created_text[props.lang]} : ${new Date(+dict.date).toLocaleString()}`}</p>
									<Button options={{
										color: 'primary',
										text: `${Text.edit_card_btn_text[props.lang]}`,
										linkTo: 'edit/'+dict.date
									}} />
									<Button options={{
										color: 'warning',
										text: `${Text.delete_card_btn_text[props.lang]}`,
										onClick: () => {
											const c = window.confirm(`${Text.delete_card_btn_text[props.lang]} ${dict.name} ?`);
											if (c) props.rem(dict.date);
										}
									}} />
								</div>
							</CardStyled>
						</div>
					)
				})
			}	
			<div className='col-sm-4' >
				<div className='card-button-wrapper'>
					<Button options={{
						class: `card-button ${props.addMode? 'card-button-disabled' : ''}`,
						color: 'light',
						text: `${Text.new_card_text[props.lang]}`,
						onClick:() => {
							props.setAddMode(true)
							window.scrollTo(0,0)
						}
					}} />
				</div>
			</div>
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

	const FormStyle = styled.div`
    background-color: ${colors.secondHead[+props.theme]};
  `

return(
	<FormStyle className='dictionary-form' id='dictionaries-input'>

		<label className='form-label my-3 w-100 text-center'><h3>{Text.input_header_text[props.lang]}</h3></label>
		<div class='input-group mb-1'>

			<label className='form-label mx-3'>{Text.input_from_text[props.lang]}</label>
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

			<label className='form-label mx-3'>{Text.input_to_text[props.lang]}</label>
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
				<label className='form-label mx-3'>{Text.input_name_text[props.lang]}</label>
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
			text:`${Text.back_button_text[props.lang]}`,
			linkTo:'main'
		}}/>
		<Button options = {{
			color:'success',
			text:`${Text.add_button_text[props.lang]}`,
			disabled: ((name === '')||(selectTo.language === selectFrom.language)),
			onClick: () => props.add(name, selectFrom, selectTo)
		}}/>
		<Button options = {{
			color:'warning',
			text:`${Text.cancel_button_text[props.lang]}`,
			onClick: props.cancel
		}}/>
	</FormStyle>
	)
}