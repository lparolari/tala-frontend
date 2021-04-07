import React, { useEffect, useState } from "react";
import {
  Container,
  Jumbotron,
  Form,
  Row,
  Col,
  Card,
  Table,
} from "react-bootstrap";

// const JOINED_ANALYSIS_TYPE = 1;
// const LEFT_ANALYSIS_TYPE = 2;

const getAnomalies = (files, analysis_type) => {
  let formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append(`file[]`, files[i]);
  }

  return fetch(
    `https://tala-backend.herokuapp.com/anomalies?analysis_type=${escape(analysis_type)}`,
    {
      method: "POST",
      body: formData,
    }
  );
};

const responseOrThrow = (response) => {
  if (!response.ok) {
    const err = new Error(`HTTP error code ${response.status}`);
    throw err;
  }
  return response;
};

const toJson = (response) => {
  return response.json();
};

function App() {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [selectedAnalysisType, setSelectedAnalysisType] = useState("Left");
  const [data, setData] = useState(undefined);
  const [err, setErr] = useState(undefined);

  useEffect(() => {
    selectedFiles &&
      getAnomalies(selectedFiles, selectedAnalysisType)
        .then(responseOrThrow)
        .then(toJson)
        .then(setData)
        .catch(setErr);
  }, [selectedFiles, selectedAnalysisType]);

  console.log(data);

  return (
    <Container className="p-3">
      <Row>
        <Col>
          <Jumbotron>
            <h1 className="header">Analyze MS Teams Attendance Lists</h1>
          </Jumbotron>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form encType="multipart/form-data">
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Attendance list(s)
              </Form.Label>
              <Col sm={10}>
                <Form.File
                  id="attendanceLists"
                  label="Select .csv files"
                  custom
                  onChange={(e) => setSelectedFiles(e.target.files)}
                  multiple
                  style={{ maxWidth: 280 }}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Analysis type
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="select"
                  value={selectedAnalysisType}
                  onChange={(e) => setSelectedAnalysisType(e.target.value)}
                  custom
                  style={{ maxWidth: 280 }}
                >
                  <option>Joined</option>
                  <option>Left</option>
                </Form.Control>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md="12">
          <p>
            <b>Results</b>
          </p>
        </Col>
        {(err && (
          <Col md={12}>
            <p className="text-danger">Oops, there was an error :(</p>
          </Col>
        )) || (
          <Col>
            <Row>
              {(!data && (
                <Col md={12}>
                  <p>Please select an attendance list</p>
                </Col>
              )) ||
                (data.length == 0 && (
                  <Col md={12}>
                    <p>No anomalies found :)</p>
                  </Col>
                )) ||
                data.map((x, i) => (
                  <Col key={`card-${i}`}>
                    <Card className="mt-2">
                      <Card.Header>{x.filename}</Card.Header>
                      <Card.Body>
                        <Table>
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Anomaly (+/-mm:ss)</th>
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
            </Row>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default App;
