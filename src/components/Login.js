import React, { useState, useContext }from 'react';
import { AuthContext } from '../context/AuthContext'

const Login = () => {
  const { dispatch } = useContext(AuthContext)


  const initialState = {
    email: '',
    password: '',
    isSubmitting: false,
    errorMessage: null
  }

  const [data, setData] = useState(initialState)

  const handleInputChange =  e  => {
     setData({
       ...data,
       [e.target.name]:e.target.value
     })
  }

  const handleFormSubmit = e => {
     e.preventDefault()
     fetch('http://localhost:5000/api/login',{
       method: 'POST',
       headers:{
         'Content-Type':'application/json'
       },
       body: JSON.stringify({
          username: data.email,
          password: data.password
       })
     })
       .then(res => {
         if (res.ok) {
          return res.json();
         }
         throw res;
       })
       .then(data => {
          dispatch({
            type:'LOGIN',
            payload:data
          })
       })
       .catch(error => {
         console.log(error);
         setData({
           ...data,
           isSubmitting: false,
           errorMessage: error.message || error.statusText
         })
       })
  }

  return(
    <div className="login-container">
       <div className="card">
          <div className="container">
              <form onSubmit={handleFormSubmit}>
                  <h1>Login</h1>

                  <label htmlFor="email">
                      Email Address
                      <input
                         type="text"
                         value={data.email}
                         onChange={handleInputChange}
                         name="email"
                         id="email"
                      />
                  </label>
                  <label htmlFor="password">
                      Password
                      <input
                         type="password"
                         value={data.password}
                         onChange={handleInputChange}
                         name="password"
                         id="password"
                      />
                  </label>

                  {data.errorMessage && (
                    <span className="form-error">{data.errorMessage}</span>
                  )}

                  <button>Login</button>
              </form>
          </div>
       </div>
    </div>
  )
}

export default Login;
