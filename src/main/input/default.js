import React from 'react'
import {InputComponent} from "./InputComponent" 

export 	function Default(props){

	return(	
			<form 
				className={"row gy-2 gx-3 align-items-center default-form "} 
				onSubmit={e => {e.preventDefault(); props.submit();}}
			>

				<div className="default-input-wrapper">
					<InputComponent 
						id = "default-input"
						placeholder = ""
						value = {props.value}
						setValue = {props.setOriginal}
					/>
				</div>

				<div className="default-btn-wrapper">
					<button 
						id="btn-submit" 
						type="button" 
						className="btn btn-primary"
						onClick={props.submit}
						>
						Submit
					</button>
				</div>

				<div className="default-btn-wrapper">
					<button 
						id="button-adv" 
						type="button" 
						className="btn btn-success"
						onClick={props.toggle} 
					  >
						Advanced
					</button>
				</div>

			</form>
	)
}