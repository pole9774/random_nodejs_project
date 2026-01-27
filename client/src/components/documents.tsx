import { useState, useEffect } from 'react';
import Document from "../entities/document";
import API from "../API/API";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { showToast } from '../utilities/toast';

function Documents(props: any) {

  const [documents, setDocuments] = useState<Document[]>([]);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [dirty, setDirty] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await API.addDocument(new Document(0, title, description));

      if (response && response.ok) {
        showToast.success("Document created successfully");
        setTitle("");
        setDescription("");
        setDirty(true);
      } else {
        showToast.error("Failed to create the document");
      }
    } catch (error) {
      showToast.error("Failed to create the document");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const documents = await API.getDocuments();
        setDocuments(documents);
        setDirty(false);
      } catch (error) {
        showToast.error('Failed to load documents');
      }
    };

    loadDocuments();
  }, [dirty]);

  return (
    <>
      {
        props.loggedIn ? (
          <h1>Logged in as {props.user.name} {props.user.surname}</h1>
        ) : (
          <h1>Not logged in</h1>
        )
      }

      {
        documents.map((document) => (
          <div key={document.id}>
            <h2>{document.id + " - " + document.title}</h2>
            <p>{document.description}</p>
          </div>
        ))
      }

      { props.loggedIn ? ( <Form onSubmit={handleSubmit}>

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
      </Form> ) : ( <p>Please log in to create a document.</p> )}

      <Button onClick={() => navigate("/")}>Back to Home</Button>
    </>
  )
}

export default Documents;
