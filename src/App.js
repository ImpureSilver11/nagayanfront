import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Image from './components/imagePost'


class App extends Component {
  render() {
    return (
      <div className="App">
          <div>
            <Route path='/Image' component={Image}/>
          </div>
      </div>
    );
  }
}


export default App;
