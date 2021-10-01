import React from 'react'
import {Button} from 'react-bootstrap';
import './searchResultsItem.scss'

export default function SearchResultsItem({link, thumbnail, title, description, submitMedia}) {
  
  const clickHandler = () =>{
    submitMedia({url: link, desc: description, image: thumbnail.url});
  }
  
  return (
    <div className = "search-result-item">
      <Button variant="success" onClick = {clickHandler}>SELECT!!!!!!</Button>
      <div>{link}</div>
      <div><img src = {thumbnail.url} /></div>
      <div>{title}</div>
      <div>{description}</div>
    </div>
  )
}
