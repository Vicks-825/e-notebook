import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const host = 'https://e-notebook-backend-jc6r.onrender.com';
    const [credential, setCredential] = useState({email: "", password: ""});
    let navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credential.email, password: credential.password})
          });
          const json = await response.json();
          console.log(json);

          if(json.success){
            //save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            navigate("/home", { replace: true });
          }
          else{
            alert("Invalid credentials");
          }
    }
    const handleChange = (e) =>{
        setCredential({...credential, [e.target.name]: e.target.value});
    }
    const handleClick = () =>{
      navigate("/signup", { replace: true });
    }
  return (
    <>
    <div className="heading flex justify-center mt-10">
        <h2 className="heading text-3xl">LogIn to use E-Notebook</h2>
    </div>
    <div className='flex justify-center mt-10'>
        <div className="block p-6 rounded-lg shadow-lg bg-gray-100 w-96">
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-6">
            <label htmlFor="exampleInputEmail2" className="form-label inline-block mb-2 text-gray-700">Email address</label>
            <input type="email" name='email' value={credential.email} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChange}/>
            </div>
            <div className="form-group mb-6">
            <label htmlFor="exampleInputPassword2" className="form-label inline-block mb-2 text-gray-700">Password</label>
            <input type="password" name='password' value={credential.password} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputPassword2" placeholder="Password" onChange={handleChange}/>
            </div>
            <div className="flex justify-between items-center mb-6">
            <div className="form-group form-check">
                <input type="checkbox" className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" id="exampleCheck2"/>
                <label className="form-check-label inline-block text-gray-800" htmlFor="exampleCheck2">Remember me</label>
            </div>
            <a href="#!"
                className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">Forgot
                password?</a>
            </div>
            <button type="submit" className=" w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Sign in</button>
            <p className="text-gray-800 mt-6 text-center">Not a member? <button
                className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out" onClick={handleClick}>Register</button>
            </p>
        </form>
        </div>
    </div>
    </>
  )
}

export default Login