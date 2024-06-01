import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const host = 'http://localhost:8000';
    const [credential, setCredential] = useState({name: "", email: "", password: "", cpassword: ""});
    let Navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {name, email, password} = credential;
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
          });
          const json = await response.json();
          console.log(json);

          if(json.success){
            //save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            Navigate("/home", { replace: true });
          }
          else{
            alert("Internal server error");
          }
    }
    const handleChange = (e) =>{
        setCredential({...credential, [e.target.name]: e.target.value});
    }
  return (
    <>
    <div className="heading flex justify-center mt-10">
        <h2 className="heading text-3xl">Create an Account to use E-Notebook</h2>
    </div>
    <div className='flex justify-center mt-10'>
        <div className="block p-6 rounded-lg shadow-lg bg-gray-100 w-96">
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-6">
            <label htmlFor="exampleInputName2" className="form-label inline-block mb-2 text-gray-700">Name</label>
                <input type="text" name='name' value={credential.name} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="name" placeholder="Full Name" onChange={handleChange} required/>
            </div>
            <div className="form-group mb-6">
            <label htmlFor="exampleInputEmail2" className="form-label inline-block mb-2 text-gray-700">Email address</label>
                <input type="email" name='email' value={credential.email} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="email" placeholder="Email address" onChange={handleChange} required/>
            </div>
            <div className="form-group mb-6">
            <label htmlFor="exampleInputPassword2" className="form-label inline-block mb-2 text-gray-700">Password</label>
                <input type="password" name='password' value={credential.password} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="password" placeholder="Password" onChange={handleChange} minLength={5} required/>
            </div>
            <div className="form-group mb-6">
            <label htmlFor="exampleInputcPassword2" className="form-label inline-block mb-2 text-gray-700">Confirm Password</label>
                <input type="password" name='cpassword' value={credential.cpassword} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="cpassword" placeholder="Confirm Password" onChange={handleChange} minLength={5} required/>
            </div>
            <button type="submit" className=" w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Sign up</button>
        </form>
        </div>
    </div>
    </>
  )
}

export default Signup