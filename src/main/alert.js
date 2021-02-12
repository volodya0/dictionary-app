import store from './store'
import React,{useState, useEffect} from 'react'

export default function Alert(){	

	function Options(props) {
		if ((props.options === [])||(!["buttons", "loader"].includes(props.options.type))){
			return null
		}else{
			if (props.options.type === "buttons"){
				return(
					<div className="alert-buttons-wrapper" >
						{props.options.buttons.map((btn) => {
							return(
								<button 
									id="btn-submit" 
									type="button" 
									className={`btn btn-${btn.color} alert-btn`}
									onClick={btn.onClick}
									>
										{btn.text}
								</button>
							)
						})}
					</div>
				)
			}
			if (props.options.type === "loader"){
				return(
					<div className="alert-loader spinner-border text-primary " role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				)
			}
		}	
	}

	let alert = store.getState().alert 

	const [forUpdate, setUpdate] = useState(true)
	store.subscribe(() => {setUpdate(!forUpdate)})

	if(!alert.show){return null}
	return (
		<div className={`myAlert my-bg-${alert.sign}`}>
			<span>{alert.message}</span>
			<Options options={alert.options}/>
		</div>
	)
}

