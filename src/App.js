
import './App.css';
import React from 'react';
import Home from './Home';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Useredit from './Useredit';
import Userdelete from './Userdelete';
import Adduser from './Adduser';

function App() {
  return <>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home/>} ></Route>
    <Route path='/addnewuser' element={<Adduser/>} ></Route>
    <Route path='/useredit/:id' element={<Useredit/>} ></Route>
    <Route path='/userdelete/:id' element={<Userdelete/>} ></Route>
  </Routes>
  </BrowserRouter>
  
  </>
}
export default App;
