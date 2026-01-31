import { Card, Button, Form } from "react-bootstrap";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Document from "../entities/document";

interface SortableCardProps {
    document: Document;
    editingDocumentId: number | null;
    editTitle: string;
    editDescription: string;
    isUpdating: boolean;
    loggedIn: boolean;
    onEditClick: (document: Document) => void;
    onSaveEdit: (documentId: number) => void;
    onCancelEdit: () => void;
    setEditTitle: (title: string) => void;
    setEditDescription: (description: string) => void;
}

function SortableCard(props: SortableCardProps) {
    const {
        document,
        editingDocumentId,
        editTitle,
        editDescription,
        isUpdating,
        loggedIn,
        onEditClick,
        onSaveEdit,
        onCancelEdit,
        setEditTitle,
        setEditDescription,
    } = props;

    // This hook gives us drag-and-drop powers!
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: document.id });

    // Apply smooth animations when dragging
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <Card
            ref={setNodeRef}
            style={style}
            className="mb-3 shadow-sm"
        >
            <Card.Body>
                {editingDocumentId === document.id ? (
                    // EDITING MODE
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
                            onClick={() => onSaveEdit(document.id)}
                            disabled={isUpdating}
                        >
                            {isUpdating ? "Saving..." : "Save"}
                        </Button>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={onCancelEdit}
                        >
                            Cancel
                        </Button>
                    </>
                ) : (
                    // VIEW MODE - Now with drag handle
                    <>
                        <div className="d-flex justify-content-between align-items-start">
                            <div className="flex-grow-1">
                                <Card.Title>{document.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    Index: {document.pos}
                                </Card.Subtitle>
                                <Card.Text>{document.description}</Card.Text>
                            </div>

                            {/* DRAG HANDLE - Only show when logged in */}
                            {loggedIn && (
                                <div
                                    {...attributes}
                                    {...listeners}
                                    style={{
                                        cursor: 'grab',
                                        padding: '8px',
                                        fontSize: '20px',
                                    }}
                                    title="Drag to reorder"
                                >
                                    ⠿
                                </div>
                            )}
                        </div>

                        {loggedIn && (
                            <Button
                                variant="outline-primary"
                                size="sm"
                                className="mt-2"
                                onClick={() => onEditClick(document)}
                            >
                                Edit
                            </Button>
                        )}
                    </>
                )}
            </Card.Body>
        </Card>
    );
}

export default SortableCard;
