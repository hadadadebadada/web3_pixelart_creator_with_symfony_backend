/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';
import './tailwind.css'
// start the Stimulus application
import './bootstrap';
import React from "react";
import {render} from 'react-dom'
import { BrowserRouter as Router, Route, Routes, Navigate, Switch } from 'react-router-dom'
import Navbar2 from "./components/navbar/Navbar2";
import Footer from "./components/footer/Footer";
import Login from "./components/login/Login"
import TorusTunnel2 from "./components/login/TorusTunnel2";
import StartScreen from "./components/startpage/StartScreen";
import Install from "./components/startpage/Install";

const App = () => {

    return(
        <>
            <div id="App">


                <Router>

                    <Navbar2 />

                    <Routes>

                       {/* <Route exact path='/roadmap' element={<Roadmap></Roadmap>} ></Route>*/}
                        <Route path='/login' element={<TorusTunnel2 />} />
                        <Route path='/login2' element={<Login/>} />

                    </Routes>

                </Router>



   {/*             {
                    window.ethereum ?  <StartScreen/> : <Install />

                }*/}

            </div>

{/*            <div style={{height: '8800px'}}>
                <h1 style={{color:"white"}}>Hello</h1>
                <StartScreen/>
            </div>*/}

            <div>
                <StartScreen/>

                <h1 style={{color:"white"}}>CYA</h1>
            </div>

            <Router>
                <Footer></Footer>
            </Router>

        </>
    )
}


render(<App></App>, document.getElementById("root"));
