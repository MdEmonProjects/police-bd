// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Registration from './Registration';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import ListOfUsers from './ListofUsers';

function App() {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/list_of_users' element={<ListOfUsers />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;




