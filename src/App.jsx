import './App.css';
import MyCanvas from './Components/MyCanvas';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';

import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const App = () => {
    
  return ( 
      <div className = "App">
        <div className='authWindow'>
          <Form id="auth">
            <FormGroup>
              <Label for="exampleEmail">
                Email
              </Label>
              <Input
                id="exampleEmail"
                name="email"
                placeholder="Ваша почта"
                type="email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">
                Пароль
              </Label>
              <Input
                id="examplePassword"
                name="password"
                placeholder="Ваш пароль"
                type="password"
              />
            </FormGroup>
            <Button id="login" >
              <a href='/canvas'>Войти</a>
            </Button>
          </Form>
        </div>
        <Router>
          <Routes>
            <Route path='/canvas' element={<MyCanvas />} />
          </Routes>
        </Router>
      </div>
    );
};

export default App;