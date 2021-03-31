import React, { useEffect, useState } from "react";

const getAnomalies = (files) => {
  let formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append(`file[]`, files[i]);
  }

  return fetch("http://localhost:5000/anomalies/left", {
    method: "POST",
    headers: {
      // "Content-Type": "multipart/form-data"
    },
    body: formData,
  });
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
  const [data, setData] = useState(undefined);
  const [err, setErr] = useState(undefined);

  useEffect(() => {
    selectedFiles &&
      getAnomalies(selectedFiles)
        .then(responseOrThrow)
        .then(toJson)
        .then(setData)
        .catch(setErr);
  }, [selectedFiles]);

  // console.log(data);
  console.log(err);

  if (err) {
    return (
      <div>
        <p>
          There was an error :( <br />
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setData(undefined);
              setErr(undefined);
            }}
          >
            back
          </a>
        </p>
        <p>Details: {err.message}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Analyze MS Teams Attendance Lists</h1>

      <p>Load your attendance list</p>
      <form encType="multipart/form-data">
        <input
          type="file"
          multiple
          onChange={(e) => setSelectedFiles(e.target.files)}
        />
      </form>

      <div style={{ marginTop: 20 }}>
        {data &&
          data.anomalies.map((x, i) => (
            <div key={`anomalies-${i}`} style={{ marginTop: 20 }}>
              <table>
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
              </table>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
