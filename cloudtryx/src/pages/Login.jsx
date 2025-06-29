import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/UserSlice";
import axios from 'axios';


export const Login = ()=>{
	const [passShow,setPassShow] = useState(false);
	const [isLoading,setIsLoading] = useState(false);
	const input = useRef(null);
	const dispatch = useDispatch();
	const [formData,setFormData] = useState({
		username:'',
		password:'',
		first_name:'',
		last_name:'',
		email:'',
	});

	const [error,setError] = useState('');
	const [formError,setFormError] = useState({});
	const [response,setResponse] = useState('');

	const [formState,setFormState] = useState('login');

	useEffect(()=>{
		input.current.focus();
	},[]);

	const handleLogin = ()=>{
		setError('');
		setResponse('');
		setIsLoading(true);
		axios.post('http://127.0.0.1:8000/api/login/',formData).then((res)=>{
			setResponse(res.data.message);
			setIsLoading(false);
			setTimeout(() => {
				dispatch(login({token:res.data.token,user:res.data.user}));
			}, 1000);
		}).catch((error)=>{
			console.log(error);
			setError(error.response.data.message);
			setIsLoading(false);
		});
	}

	const handleSignup = ()=>{
		setFormError({});
		setIsLoading(true);
		axios.post('http://127.0.0.1:8000/api/signup/',formData).then((res)=>{
			setResponse(res.data.message);
			setIsLoading(false);
			setTimeout(() => {
				dispatch(login({token:res.data.token,user:res.data.user}));
			}, 1000);
		}).catch((error)=>{
			console.log(error.response);
			setFormError({...error.response.data});
			setIsLoading(false);
		});
	}

	return(
		<>
		 <div id="form-modal">
			{formState=='login'?
				<form action="" className="form-container">
					<h2>Login</h2>
					<label htmlFor="username">
						<input type="text" value={formData.username} name="username" onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}} ref={input}></input>
						<span style={formData.username?{top:'0px',left: '.3rem',fontSize: '0.8rem'}:null}>Enter Username</span>
					</label>
					<label htmlFor="password">
						<input type={passShow?"text":"password"} value={formData.password} name="password" onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}}></input>
						<img src={`/images/${passShow?'hide.png':'view.png'}`} onClick={()=>setPassShow(!passShow)} className="pass-show-hide" alt="" ></img>
						<span style={formData.password?{top:'0px',left: '.3rem',fontSize: '0.8rem'}:null}>Enter Password</span>
					</label>
					<p className="error-message">{error}</p>
					<p className="success-message">{response}</p>
					<div className="submit">
						<button type="button" className="submit-btn btn" onClick={handleLogin}>Submit</button>
							or
						<button type="button" className="submit-btn btn" onClick={()=>{setFormState('signup')}}>Sign up</button>
					</div>
				</form>
		 :
			<form className="form-container">
				<h2>Sign Up</h2>
				<label htmlFor="first_name">
					<input type="text" value={formData.first_name} name="first_name" onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}} ref={input}></input>
					<span style={formData.first_name?{top:'0px',left: '.3rem',fontSize: '0.8rem'}:null}>Enter First Name</span>
				</label>
				{formError.first_name? <p className="error-message">{formError.first_name[0]}</p>:''}
				<label htmlFor="last_name">
					<input type="text" value={formData.last_name} name="last_name" onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}}></input>
					<span style={formData.last_name?{top:'0px',left: '.3rem',fontSize: '0.8rem'}:null}>Enter Last Name</span>
				</label>
				{formError.last_name? <p className="error-message">{formError.last_name[0]}</p>:''}
				<label htmlFor="email">
					<input type="text" value={formData.email} name="email" onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}}></input>
					<span style={formData.email?{top:'0px',left: '.3rem',fontSize: '0.8rem'}:null}>Enter Email</span>
				</label>
				{formError.email? <p className="error-message">{formError.email[0]}</p>:''}
				<label htmlFor="username">
					<input type="text" value={formData.username} name="username" onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}}></input>
					<span style={formData.username?{top:'0px',left: '.3rem',fontSize: '0.8rem'}:null}>Enter Username</span>
				</label>
				{formError.username? <p className="error-message">{formError.username[0]}</p>:''}
				<label htmlFor="password">
					<input type={passShow?"text":"password"} value={formData.password} name="password" onChange={(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}}></input>
					<img src={`/images/${passShow?'hide.png':'view.png'}`} onClick={()=>setPassShow(!passShow)} className="pass-show-hide" alt="" />
					<span style={formData.password?{top:'0px',left: '.3rem',fontSize: '0.8rem'}:null}>Enter Password</span>
				</label>
				{formError.password? <p className="error-message">{...formError.password}</p>:''}
				<div className="submit">
					<button type="button" className="submit-btn btn" onClick={handleSignup}>Submit</button>
						or
					<button type="button" className="submit-btn btn" onClick={()=>{setFormState('login')}}>Login</button>
				</div>
			</form>}
		 </div>
		 {isLoading?
		 <div id="loader">
			<div className="spinner"></div>
		 </div>:null}
		 </>
	);
}