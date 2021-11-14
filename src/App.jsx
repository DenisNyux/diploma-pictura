import './App.css';
import MyNavigation from './Components/MyNavigation';
import React, { useState } from 'react';
import Modal from './Modal/Modal';
import { Form, FormGroup, FormText, Label, Input, Button } from 'reactstrap';
// const axios = require('axios');
// import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [modalActive, setModalActive] = useState(false);
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
        <Button className='load-btn' onClick = {() => setModalActive(true)}>Открыть окно загрузки</Button>

        </div>
        <Modal active={modalActive} setActive={setModalActive}>
          <Form>
            <FormGroup>
              <Label for="exampleFile">
                Загрузите файл
              </Label>
              <Input
                id="exampleFile"
                name="file"
                type="file"
              />
            </FormGroup>
          </Form>
          <div className="text-between">или</div>
          {drag
          ? <div className="drop-area"
              onDragStart={e => dragStartHandler(e)}
              onDragLeave={e => dragLeaveHandler(e)}
              onDragOver={e => dragStartHandler(e)}
              onDrop={e => onDropHandler(e)}
            >Отпустите файл</div>
          : <div className="drop-area"
              onDragStart={e => dragStartHandler(e)}
              onDragLeave={e => dragLeaveHandler(e)}
              onDragOver={e => dragStartHandler(e)}
            >Перетащите файл сюда
            </div>
        }
        </Modal>
      </div>
    );
};

export default App;