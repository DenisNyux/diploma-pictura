import './App.css';
import MyNavigation from './Components/MyNavigation';
import React, { useState } from 'react';
import Modal from './Modal/Modal';

const axios = require('axios');

const App = () => {
  const [modalActive, setModalActive] = useState(true);
  const [drag, setDrag] = useState(false);

  function dragStartHandler(e) {
    e.preventDefault();
    setDrag(true); 
  };

  function dragLeaveHandler(e) {
    e.preventDefault();
    setDrag(false); 
  }

  function onDropHandler(e) {
    e.preventDefault();
    let files = [...e.dataTransfer.files];
    console.log(files);
    //const formData = new FormData();
    //formData.append('file', files[0]);
    //formData.append('userId', 1);
    //axios.post('url', formData);
    setDrag(false);

    
  }

    return ( 
      <div className = "App" >
        <div class = "horizontal-nav">
        <button className='load-btn' onClick = {() => setModalActive(true)}>Открыть окно загрузки</button>

        </div>
        <Modal active={modalActive} setActive={setModalActive}>
          
          {drag
          ? <div className="drop-area"
              onDragStart={e => dragStartHandler(e)}
              onDragLeave={e => dragLeaveHandler(e)}
              onDragOver={e => dragStartHandler(e)}
              onDrop={e => onDropHandler(e)}
          >Отпустите файлы</div>
          : <div className="drop-area"
              onDragStart={e => dragStartHandler(e)}
              onDragLeave={e => dragLeaveHandler(e)}
              onDragOver={e => dragStartHandler(e)}
              >Перетащите файлы сюда
            </div>
        }
        </Modal>
      </div>
    );
};

export default App;