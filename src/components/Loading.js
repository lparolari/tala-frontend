import React from "react";
import { Col, Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <Col md={12}>
      <Spinner animation="border" />
    </Col>
  );
};

export default Loading;
