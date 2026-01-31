import { useState, useEffect } from 'react';
import Document from "../entities/document";
import API from "../API/API";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { showToast } from '../utilities/toast';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableCard from './SortableCard'

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

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    // If dropped outside the list or in the same position, do nothing
    if (!over || active.id === over.id) {
      return;
    }

    // Find the new position
    const newIndex = documents.findIndex((doc) => doc.id === over.id);
    const newPos = documents[newIndex].pos;

    // Call the API to save the new position
    try {
      const response = await API.updateDocumentPosition(Number(active.id), newPos);

      if (response && response.ok) {
        showToast.success("Document position updated");
      } else {
        showToast.error("Failed to update document position");
      }
    } catch (error) {
      showToast.error("Failed to update document position");
    } finally {
      setDirty(true);
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
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={documents.map((doc) => doc.id)}
                strategy={verticalListSortingStrategy}
              >
                {documents.map((document) => (
                  <SortableCard
                    key={document.id}
                    document={document}
                    editingDocumentId={editingDocumentId}
                    editTitle={editTitle}
                    editDescription={editDescription}
                    isUpdating={isUpdating}
                    loggedIn={props.loggedIn}
                    onEditClick={handleEditClick}
                    onSaveEdit={handleSaveEdit}
                    onCancelEdit={() => setEditingDocumentId(null)}
                    setEditTitle={setEditTitle}
                    setEditDescription={setEditDescription}
                  />
                ))}
              </SortableContext>
            </DndContext>
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
