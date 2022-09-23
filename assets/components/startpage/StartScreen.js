import React, { Component } from 'react';
import Animations from './Animations';
import Pixelart from './pixelartcreator/Pixelart';
import Home from './Home';
import TestTailwind from './Roadmap';

//import TestingJQuery from './TestingJQuery';
class StartScreen extends Component {

  
    render() {
        return (
            <div>

             {/*   <Animations></Animations>*/}
                <Home></Home>



                <Pixelart></Pixelart>

                <TestTailwind></TestTailwind>

                {/* <TestingJQuery></TestingJQuery> */}
            </div>
        );
    }
}

export default StartScreen;