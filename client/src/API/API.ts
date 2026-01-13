import Document from "../entities/document";

const baseURL = "http://localhost:3001/api/";

async function getDocuments() {
  const response = await fetch(baseURL + "documents/", {
    credentials: "include",
  });
  if (response.ok) {
    const documents: Document[] = await response.json();
    return documents;
  } else {
    const errDetail = await response.json();
    if (errDetail.error) throw errDetail.error;
    if (errDetail.message) throw errDetail.message;
    throw new Error("Error. Please reload the page");
  }
}

async function addDocument(document: Document) {
  const response = await fetch(baseURL + "documents/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(document),
  });
  return response;
}

const API = {
  getDocuments,
  addDocument,
};

export default API;
