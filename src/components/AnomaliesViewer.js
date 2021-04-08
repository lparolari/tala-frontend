import React from "react";
import { Trans } from "react-i18next";
import PropTypes from "prop-types";
import { Col, Card, Table } from "react-bootstrap";

const AnomaliesViewer = ({ data }) => {
  if (!data)
    return (
      <Col md={12}>
        <p>
          <Trans>No data</Trans>
        </p>
      </Col>
    );

  if (data.length == 0)
    return (
      <Col md={12}>
        <p>
          <Trans>no_anomalies</Trans>
        </p>
      </Col>
    );

  return (
    <>
      {data.map((x, i) => (
        <Col key={`card-${i}`}>
          <Card className="mt-2">
            <Card.Header>{x.filename}</Card.Header>
            <Card.Body>
              <Table>
                <thead>
                  <tr>
                    <th>
                      <Trans>Name</Trans>
                    </th>
                    <th>
                      <Trans>Anomaly</Trans> (+/-mm:ss)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {x &&
                    x.outliers.map((x, j) => (
                      <tr key={`anomaly-${i}-${j}`}>
                        <td>{x.participant}</td>
                        <td>{x.delta}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </>
  );
};

AnomaliesViewer.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ participant: PropTypes.string, delta: PropTypes.string })
  ),
};

export default AnomaliesViewer;
