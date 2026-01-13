import { useState, useEffect } from 'react';
import Document from "../entities/document";
import API from "../API/API";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Documents() {

  const [documents, setDocuments] = useState<Document[]>([]);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [dirty, setDirty] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await API.addDocument(new Document(0, title, description));

      if (response && response.ok) {
        setSuccessMessage("Document created successfully!");
        setTitle("");
        setDescription("");
        setDirty(true);
      } else {
        setErrorMessage("Failed to create the document. Please try again later.");
      }
    } catch (error) {
      console.error("Error creating document: ", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    API.getDocuments().then((documents: any) => {
      setDocuments(documents);
      setDirty(false);
    });
  }, [dirty]);

  return (
    <>
      {
        documents.map((document) => (
          <div key={document.id}>
            <h2>{document.id + " - " + document.title}</h2>
            <p>{document.description}</p>
          </div>
        ))
      }

      <Form onSubmit={handleSubmit}>
        
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter document title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter document description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Create Document"}
        </Button>
      </Form>

      <Button onClick={() => navigate("/")}>Back to Home</Button>
    </>
  )
}

export default Documents;
