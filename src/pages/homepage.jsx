import React from 'react';
import NavBar from '../components/navbar';


const Homepage = (props) =>{
    console.log(props)
    return(
        <div>
            <NavBar></NavBar>
            <h1>Home Page</h1>
            
        </div>
    );
}

export default Homepage;