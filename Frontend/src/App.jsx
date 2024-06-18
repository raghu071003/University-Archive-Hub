import React from 'react';
import './App.css';
import Upload from './Components/Upload';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Folders from './Components/Folders';
import Login from './Components/Login';
import Logout from './Components/Logout';
import SignUp from './Components/Signup';

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Navbar />
                <div className="content">
                    <Routes>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/folders' element={<Folders />}></Route>
                        <Route path='/login' element={<Login />}></Route>
                        <Route path='/signup' element={<SignUp />}></Route>
                        <Route path='/logout' element={<Logout/>}></Route>
                    </Routes>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
