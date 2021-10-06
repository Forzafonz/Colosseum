import React from 'react'
import {Button} from 'react-bootstrap';
import './searchResultsItem.scss'
import {Navbar, Container, Row, Col} from 'react-bootstrap';


export default function SearchResultsItem({link, thumbnail, title, description, submitMedia}) {
  
  const clickHandler = () =>{
    submitMedia({url: link, desc: description, image: thumbnail.url});
  }
  
  return (
    <div className = "search-result-item">
      {/* <div>{link}</div> */}
      <div className = "button-image">
      <Button variant="warning" onClick = {clickHandler}>ADD</Button>
        <img src = {thumbnail.url} alt = "thumbnail"/>
      </div>
        <hr/>
      <div>{title}</div>
      {/* <div>{description}</div> */}
    </div>
  )
}
