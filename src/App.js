/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Container, Jumbotron, Form, Row, Col } from "react-bootstrap";
import { withTranslation, Trans } from "react-i18next";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "./components/Loading";
import PleaseSelect from "./components/PleaseSelect";
import Error from "./components/Error";
import { responseOrThrow, toJson } from "./promise";
import AnomaliesViewer from "./components/AnomaliesViewer";
import i18n from "./i18n";

const getAnomalies = (files, analysis_type) => {
  let formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append(`file[]`, files[i]);
  }

  return fetch(
    `https://tala-backend.herokuapp.comqWW/anomalies?analysis_type=${escape(
      analysis_type
    )}`,
    {
      method: "POST",
      body: formData,
    }
  );
};

// eslint-disable-next-line react/prop-types
function App({ t }) {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [selectedAnalysisType, setSelectedAnalysisType] = useState("Left");
  const [data, setData] = useState(undefined);
  const [err, setErr] = useState(undefined);

  const { promiseInProgress } = usePromiseTracker();

  const isLoading = promiseInProgress;
  const isError = !!err;
  const isSelected = !!selectedFiles;

  useEffect(() => {
    selectedFiles &&
      trackPromise(
        getAnomalies(selectedFiles, selectedAnalysisType)
          .then(responseOrThrow)
          .then(toJson)
          .then(setData)
          .catch(setErr)
      );
  }, [selectedFiles, selectedAnalysisType]);

  return (
    <Container className="p-3">
      <Row>
        <Col>
          <Jumbotron>
            <h1 className="header">
              <Trans>Analyze MS Teams Attendance Lists</Trans>
            </h1>
            <p dangerouslySetInnerHTML={{ __html: t("main_description") }} />
            <p>{t("results_description")}</p>
            <ul>
              <li
                dangerouslySetInnerHTML={{ __html: t("joined_description") }}
              />
              <li dangerouslySetInnerHTML={{ __html: t("left_description") }} />
            </ul>
          </Jumbotron>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form encType="multipart/form-data">
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                <Trans>Attendance list(s)</Trans>
              </Form.Label>
              <Col sm={10}>
                <Form.File
                  id="attendanceLists"
                  label={t("Select .csv files")}
                  custom
                  onChange={(e) => setSelectedFiles(e.target.files)}
                  multiple
                  style={{ maxWidth: 280 }}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                <Trans>Analysis type</Trans>
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="select"
                  value={selectedAnalysisType}
                  onChange={(e) => setSelectedAnalysisType(e.target.value)}
                  custom
                  style={{ maxWidth: 280 }}
                >
                  <option value="Joined">{t("Joined")}</option>
                  <option value="Left">{t("Left")}</option>
                </Form.Control>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md="12">
          <p>
            <b>
              <Trans>Results</Trans>
            </b>
          </p>
        </Col>

        <Col>
          <Row>
            {(isLoading && <Loading />) ||
              (isError && <Error />) ||
              (!isSelected && <PleaseSelect />) || (
                <AnomaliesViewer data={data} />
              )}
          </Row>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <p className="text-muted">
            &copy; 2021 - Luca Parolari (
            <a href="mailto:luca.paroalri23@gmail.com">
              luca.parolari23@gmail.com
            </a>
            )
          </p>
        </Col>
        <Col className="text-right">
          <button onClick={() => i18n.changeLanguage("it")} className="btn">
            IT
          </button>
          <button onClick={() => i18n.changeLanguage("en")} className="btn">
            EN
          </button>
        </Col>
      </Row>
    </Container>
  );
}

export default withTranslation("translations")(App);
