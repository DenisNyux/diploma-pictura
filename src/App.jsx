import './App.css';
import MySideNav from './Components/MySideNav';
import React, { useState } from 'react';
import Modal from './Modal/Modal';
import { Form, FormGroup, FormText, Label, Input, Button, CardLink } from 'reactstrap';
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import icon11 from './Components/box-arrow-in-down.svg';
import MyCanvas from './Components/MyCanvas';


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
  
        <MySideNav>
          <NavItem className="navItem" onClick = {() => setModalActive(true)}>
            <NavIcon><img className='icon1' alt='icon1' src={icon11}></img></NavIcon><NavText>Загрузка</NavText></NavItem>
            <NavItem className="navItem"><NavIcon></NavIcon><NavText>Ластик</NavText></NavItem>
        </MySideNav>  
        

        {/* Окно загрузки изображения */}
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
        <MyCanvas/>
      </div>
    );
};

export default App;