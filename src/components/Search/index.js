import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const Search = ({ searchTerm, handleSubmit, handleChange }) => {
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row}>
          <Form.Label htmlFor="search" column sm={2}>
          </Form.Label>
          <Col sm="8">
            <Form.Control
              id="search"
              type="text"
              value={searchTerm}
              onChange={handleChange}
            ></Form.Control>
          </Col>
          <Button variant = "danger" type="submit">Search</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Search;
