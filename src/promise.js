export const responseOrThrow = (response) => {
  if (!response.ok) {
    const err = new Error(`HTTP error code ${response.status}`);
    throw err;
  }
  return response;
};

export const toJson = (response) => {
  return response.json();
};
