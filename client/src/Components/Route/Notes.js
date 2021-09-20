import React from 'react';
import Nav from './Nav'
import Main from '../MyNote/Main';
const Notes = (props) => {
    
    return (
        <div>
            <Nav email={props.email}/>
            <Main/>
        </div>
    );
};

export default Notes;