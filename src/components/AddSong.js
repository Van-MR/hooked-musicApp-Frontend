import React,{ useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { SongContext } from '../context/SongContext'

const AddSong = (props) => {
  const { state, dispatch } = React.useContext(SongContext);
  const { state: authState } = React.useContext(AuthContext);

  const [title,setTitle] = useState('');
  const [artist,setArtist] = useState('');
  const [imageUrl,setImageUrl] = useState('');

  const isButtonDisabled = title === "" || artist === "" || imageUrl === "" || state.isSongSubmitting;


  const onSubmit = () => {
     dispatch({
       type:'ADD_SONG_REQUEST'
     })

     const song = {
       title,
       imageUrl,
       artist
     }

     fetch('http://localhost:5000/api/songs',{
       method:'POST',
       headers:{
         Authorization: `Bearer ${authState.token}`,
         'Content-Type':'application/json'
       },
       body: JSON.stringify(song)
     })
      .then(res => {
        if(res.ok) {
          return res.json()
        }else{
          throw res;
        }
      })
      .then(data => {
         setTitle('')
         setImageUrl('')
         setArtist('')
         dispatch({
           type:'ADD_SONG_SUCCESS',
           payload:data
         })
         onClose();
      })
      .catch(error => {
        dispatch({
          type:'ADD_SONG_FAILURE'
        })
      })
  }

  const onClose = e => {
      props.onClose && props.onClose(e);
  }


  return (
    <div class="modal" id="modal">
       <div className="modal-table-container">
        <div className="modal-table-cell">
         <div className="modal-overlay small">
              <div className="modal-header">
                <h1 className="modal-title">
                  ADD NEW SONG
                </h1>
              </div>
              <form className="modal-form">
                <div className="modal-form-inputs">

                <label htmlFor="title">Title</label>
                    <input
                    id="title"
                    name="title"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="text-input"
                    />

                <label htmlFor="artist">Artist</label>
                    <input
                    id="artist"
                    name="artist"
                    type="text"
                    value={artist}
                    onChange={e => setArtist(e.target.value)}
                    className="text-input"
                    />

                <label htmlFor="imageUrl">Image URL</label>
                    <input
                    id="imageUrl"
                    name="imageUrl"
                    type="text"
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                    className="text-input"
                    />
                </div>



                <div className="form-error">
                      <p>
                        {state.songHasError && "Error Creating Song!"}
                      </p>
                </div>
                <div className="form-action clearfix">
                    <button
                      type="button"
                      id="overlay-confirm-button"
                      className="button button-primary"
                      onClick={onSubmit}
                      disabled={isButtonDisabled}
                    >
                      {state.isSongSubmitting ? "Submitting..." : "Submit"}
                    </button>
                    <button
                      type="button"
                      id="overlay-cancel-button"
                      className="button button-default small close-overlay pull-right"
                      onClick={onClose}
                    >
                          Cancel
                    </button>
                </div>
              </form>
        </div>
        </div>
       </div>
      </div>
  )
}

export default AddSong;
