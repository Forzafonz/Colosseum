import React from 'react'
import {Navbar, Container, Row, Col} from 'react-bootstrap';
import SearchResultsItem from "./SearchResultsItem"

export default function SearchResultsContainer({searchResults, submitMedia}) {
  console.log("THIS IS SEACRH RESULTS:", searchResults)

  const results = Object.keys(searchResults).map(resultKey => {

      return (
        <Row key = {resultKey}>
            <Col className ="d-flex justify-content-center">
              <SearchResultsItem 
              {...searchResults[resultKey]}
              submitMedia = {submitMedia}
              />
            </Col>
        </Row>
      )

  })

  return (
  <Container fluid="md">
    {results}
  </Container>
  )
}
