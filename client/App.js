import React, { Component } from 'react';
import UI from './pages/UI.js';

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <UI />
                {/* <MainContainer /> */}
            </div>
        );
    }
}


export default App;