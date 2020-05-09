import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core';

class Routing extends React.Component {
  render(){
    return(
      <div>
        <Button variant="contained" >
          <Link to="/">Home</Link>
        </Button>
        <Button variant="contained" >
          <Link to="/Image">Image</Link>
        </Button>
      </div>
    )
  }
}

export default Routing;