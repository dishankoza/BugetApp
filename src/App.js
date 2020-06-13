import React, {Component} from 'react';
import Formpage from './pages/form';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import HomePage from './pages/homepage'
import Milklog from './pages/milklog';




class App extends Component{
  constructor(){
    super();
    this.state = {
      FormView : false,
      Milklog : false,
      HomePage : true
    }
  }
  
  render(){
    return(
    <div>
      <Router>
                <Switch>
                    <Route path = '/addmilklog'>
                        <Formpage></Formpage>
                    </Route>
                    <Route path = '/milklog'>
                        <Milklog></Milklog>
                    </Route>
                    <Route path = '/'>
                        <HomePage></HomePage>
                    </Route>
                </Switch>
            </Router>
    </div>
       
    );
  }



}

export default App;