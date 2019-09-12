import React,{ useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Header = () => {
    const { state, dispatch } = useContext(AuthContext)
    return (
      <nav id="navigation">
         <h1>
            HOOKED
         </h1>
         <button onClick={() => dispatch({type:'LOGOUT'})}>
             {state.isAuthenticated && (
               <h1>hi {state.user.firstName} (Logout)</h1>
             )}
         </button>
      </nav>
    )
}

export default Header;
