import {authRequests} from '../../requests/request-database'
import {LogInForm, RegisterForm} from './Forms'
import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'


function AuthContainer(props){

	const history = useHistory()

	function login(email, password, message) {
		function onSuccess(res) {	
			authRequests.getUser(res.user.uid, 
				(user) => {
					history.push('/main')
					props.onLogin(user)
				},
				(e) => {
					message(e)
				}
			)
		}
		function onFail(e) {
			alert(e)
			message(e)
		}
		authRequests.logIn(email, password, onSuccess, onFail)
	}

	function register(name, email, password, message) {
		function onSuccess(res) {
			let user = {
				name,
				email: res.user.email,
				id: res.user.uid,
				metadata: res.user.metadata,
				isNew: res.additionalUserInfo.isNewUser
			}
			authRequests.addUser(user, (e) => {
				if(e){
					message(e)
				}else{
					login(email, password, message)
				}
			})
		}
		function onFail(e) {
			message(e)
		}
		authRequests.create(email, password, onSuccess, onFail)
	}
	
	
	const [type_login, setType] = useState(true)

	return(
		<>
			{type_login
				? <LogInForm toggle={setType} login={login}/>
				: <RegisterForm toggle={setType} register={register}/>
			}
		</>
	)

}

export default AuthContainer