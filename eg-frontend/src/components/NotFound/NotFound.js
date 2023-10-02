import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../App.css";

function NotFound() {
  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center mt-5 mb-5">
        <Col xs={10} sm={8} md={8} lg={4}>
          <div className="mb-3 mt-4">
            <h1 className="fw-bold mb-2 text-uppercase">
              Oops, page not found
            </h1>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;
