import React, { useEffect,useReducer } from  'react';
import './App.css';
import Header from './components/Header'
import Login from './components/Login'
import Home from './components/Home'
import { AuthContext } from './context/AuthContext'


const App = () => {
  const initialState = {
    isAuthenticated: false,
    user: null,
    token: null
  }

  const reducer = (state,action) => {
    switch (action.type) {
      case 'LOGIN':
        return{
          ...state,
          isAuthenticated: true,
          user: action.payload.user,
          token: action.payload.token
        }
      case 'LOGOUT':
        return{
          ...state,
          isAuthenticated: false,
          user: null,
          token: null
        }
      default:
        return state;
    }
  }

  const [state,dispatch] = useReducer(reducer,initialState);

  return (
    <AuthContext.Provider value={{state,dispatch}}>
       <Header/>
       <div className="App">
         {state.isAuthenticated ? <Home/> : <Login/>}
       </div>
    </AuthContext.Provider>
  );
}

export default App;
