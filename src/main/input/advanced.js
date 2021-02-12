import React from 'react'
import {InputComponent} from "./InputComponent" 

export 	function Advanced(props){
	console.info("advanced render")
	return(
		<form className={"row gy-2 gx-3 align-items-center advanced-form"}>
			<InputComponent	
				id = {"advanced-original"}	
				placeholder =  {"Original"}
				value = {props.values.original}	
				setValue =	{props.set.setOrig}	
			/>
			<InputComponent	
				id = {"advanced-translate"}	
				placeholder =  {"Translate"}
				value = {props.values.translate}	
				setValue =	{props.set.setTran}	
			/>
			<InputComponent	
				id = {"advanced-description"}	
				placeholder =  {"Description"}
				value = {props.values.description}	
				setValue =	{props.set.setDesc}	
			/>
			<div className = "mt-4 d-flex flex-row">
				<div className="mx-2">
					<button 
						id="btn-submit" 
						type="button" 
						className="btn btn-primary"
						onClick={props.submit}
						>
							Submit
						</button>
				</div>

				<div className="mx-2">
					<button 
						id="button-reset" 
						type="button" 
						className="btn btn-warning"
						onClick={props.clear}
						>
							Clear
						</button>
				</div>

				<div className="mx-2">
					<button 
						id="button-simply" 
						type="button" 
						className="btn btn-success"
						onClick={props.toggle} 
						>
							Back
						</button>
				</div>

			</div>
		</form>
	)
}
