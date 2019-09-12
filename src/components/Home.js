import React,{ useState, useEffect, useReducer, useContext } from 'react';
import Card from './Card'
import AddSong from "./AddSong";
import { AuthContext }  from '../context/AuthContext'
import { SongContext } from '../context/SongContext'

const Home = () => {
  const initialState = {
    songs: [],
    isFetching: false,
    hasError: false,
    isSongSubmitting: false,
    songHasError: false
  }

  const reducer = (state,action) => {
      switch (action.type) {
        case 'FETCH_SONGS_REQUEST':
          return{
            ...state,
            isFetching: true,
            hasError: false
          }
        case 'FETCH_SONGS_SUCCESS':
           return{
             ...state,
             isFetching: false,
             songs: action.payload
           }
        case 'FETCH_SONGS_FAILURE':
            return{
              ...state,
              hasError: true,
              isFetching: false
            }
        case 'ADD_SONG_REQUEST':
            return{
              ...state,
              isSongSubmitting:true,
              songHasError:false
            }
        case 'ADD_SONG_SUCCESS':
            return{
              ...state,
              isSongSubmitting:false,
              songs:[...state.songs,action.payload]
            }
        case 'ADD_SONG_FAILURE':
            return{
              ...state,
              isSongSubmitting:false,
              songHasError: true
            }
        default:
          return state
      }
  }

  const { state: authState } = useContext(AuthContext)
  const [state,dispatch] = useReducer(reducer,initialState)

  const [isAddSongModalVisible, setAddSongModalVisibility] = useState(false);

  const toggleAddSong = () => {
    setAddSongModalVisibility(!isAddSongModalVisible);
  }

  useEffect(() => {
    dispatch({
      type:'FETCH_SONGS_REQUEST'
    })

    fetch("http://localhost:5000/api/songs",{
      headers:{
        Authorization: `Bearer ${authState.token}`
      }
    })
       .then(res => {
         if(res.ok){
           return res.json()
         }
       })
       .then(data => {
          console.log(data);
          dispatch({
            type:'FETCH_SONGS_SUCCESS',
            payload: data
          })
       })
       .catch(error => {
         console.log(error);
         dispatch({
           type:'FETCH_SONGS_FAILURE'
         })
       })

  },[authState.token])
  return(
    <React.Fragment>
      <SongContext.Provider value={{state,dispatch}}>
        <button className="toggle-button" onClick={toggleAddSong}>ADD SONG</button>
        {
          isAddSongModalVisible && <AddSong onClose={toggleAddSong} />
        }
      </SongContext.Provider>
      <div className="home">
         {state.isFetching ? (
           <span className="loader">LOADING...</span>
         ) :  state.hasError ? (
           <span className="error">AN ERROR HAS OCCURED</span>
         ) : (
           <>
              {state.songs.length>0 &&
                state.songs.map((song,index) => (
                  <Card  key={song.id.toString()} song={song} />
              ))}
           </>
         )}
      </div>
    </React.Fragment>
  )
}

export default Home;
