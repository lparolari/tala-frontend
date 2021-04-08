import React from "react";
import { Col } from "react-bootstrap";
import { Trans } from "react-i18next";

const Error = () => {
  return (
    <Col md={12}>
      <p className="text-danger">
        <Trans>oops_error</Trans>
      </p>
    </Col>
  );
};

export default Error;
