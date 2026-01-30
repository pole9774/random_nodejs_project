import { useState, useEffect } from 'react';
import Document from "../entities/document";
import API from "../API/API";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { showToast } from '../utilities/toast';

function Documents(props: any) {

  const [documents, setDocuments] = useState<Document[]>([]);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [editingDocumentId, setEditingDocumentId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [dirty, setDirty] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsCreating(true);

    try {
      const response = await API.addDocument(title, description);

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
      setIsCreating(false);
    }
  };

  const handleEditClick = (document: Document) => {
    setEditingDocumentId(document.id);
    setEditTitle(document.title);
    setEditDescription(document.description);
  };

  const handleSaveEdit = async (documentId: number) => {
    setIsUpdating(true);

    try {
      const response = await API.updateDocument(documentId, editTitle, editDescription);

      if (response && response.ok) {
        showToast.success("Document updated successfully");
        setEditingDocumentId(null);
        setDirty(true);
      } else {
        showToast.error("Failed to update the document");
      }
    } catch (error) {
      showToast.error("Failed to update the document");
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const documents = await API.getDocuments();
        const sortedDocuments = documents.sort((a, b) => a.pos - b.pos);
        setDocuments(sortedDocuments);
        setDirty(false);
      } catch (error) {
        showToast.error('Failed to load documents');
      }
    };

    loadDocuments();
  }, [dirty]);

  return (
    <Container className="my-5">
      <Row>
        <Col>

          <h1 className="mb-4">Documents</h1>
          <div className="mb-4">
            {
              documents.map((document) => (
                <Card key={document.id} className="mb-3 shadow-sm">
                  <Card.Body>
                    {editingDocumentId === document.id ? (
                      <>
                        <Form.Group controlId={`edit-title-${document.id}`} className="mb-3">
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            required
                          />
                        </Form.Group>

                        <Form.Group controlId={`edit-description-${document.id}`} className="mb-3">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            required
                          />
                        </Form.Group>

                        <Button
                          variant="success"
                          size="sm"
                          className="me-2"
                          onClick={() => handleSaveEdit(document.id)}
                          disabled={isUpdating}
                        >
                          {isUpdating ? "Saving..." : "Save"}
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setEditingDocumentId(null)}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Card.Title>{document.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          Index: {document.pos}
                        </Card.Subtitle>
                        <Card.Text>{document.description}</Card.Text>
                        {props.loggedIn && (
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleEditClick(document)}
                          >
                            Edit
                          </Button>
                        )}
                      </>
                    )}
                  </Card.Body>
                </Card>
              ))
            }
          </div>

          {props.loggedIn ? (

            <Card className="shadow">
              <Card.Header as="h5" className="bg-primary text-white">
                Create New Document
              </Card.Header>
              <Card.Body>

                <Form onSubmit={handleSubmit}>

                  <Form.Group controlId="title" className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter document title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      disabled={isCreating}
                    />
                  </Form.Group>

                  <Form.Group controlId="description" className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Enter document description"
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      disabled={isCreating}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isCreating}
                  >
                    {isCreating ? "Submitting..." : "Create Document"}
                  </Button>
                </Form>

              </Card.Body>
            </Card>
          ) : (
            <Card className="border-warning">
              <Card.Body className="text-center">
                <Card.Text className="mb-0">
                  Please log in to create a document.
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Documents;
