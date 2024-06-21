import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotes, editNotes } from "../../actions/notesAction";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";
import { useParams, useNavigate } from "react-router-dom";

function EditNote() {
  const { id } = useParams(); // Get id from URL params
  const navigate = useNavigate(); // To navigate programmatically
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility

  const dispatch = useDispatch();

  const notesUpdate = useSelector((state) => state.notesUpdate);
  const { loading, error } = notesUpdate;

  const notesDelete = useSelector((state) => state.notesDelete);
  const { loading: loadingDelete, error: errorDelete } = notesDelete;
  const [message, setMessage] = useState(null);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const deleteHandler = () => {
    dispatch(deleteNotes(id));
    navigate("/mynotes");
  };

  useEffect(() => {
    const fetching = async () => {
      try {
        const { data } = await axios.get(`/api/notes/${id}`);
        setTitle(data.title);
        setContent(data.content);
        setCategory(data.category);
        setDate(data.updatedAt);
      } catch (error) {
        setMessage("Error fetching note:", error);
      }
    };

    if (id) {
      fetching();
    }
  }, [id]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(capitalizeFirstLetter(value));
  };

  const handleContentChange = (e) => {
    const value = e.target.value;
    setContent(capitalizeFirstLetter(value));
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(capitalizeFirstLetter(value));
  };

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
    setMessage(null);
  };

  const updateHandler = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !category.trim()) {
      setMessage("Please fill all the fields.");
    } else {
      dispatch(editNotes(id, title, content, category));
      resetHandler();
      navigate("/mynotes");
    }
  };

  return (
    <MainScreen title="Edit Note">
      <div className="editNote">
        {loadingDelete && <Loading />}
        {message && <Alert variant="primary">{message}</Alert>}
        {error && <Alert variant="primary">{error}</Alert>}
        {errorDelete && <Alert variant="primary">{errorDelete}</Alert>}
        <Form onSubmit={updateHandler}>
          <Form.Group controlId="title" className="mt-2">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the title"
              value={title}
              onChange={handleTitleChange}
            />
          </Form.Group>

          <Form.Group controlId="content" className="mt-2">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter the content"
              rows={4}
              value={content}
              onChange={handleContentChange}
            />
          </Form.Group>
          {content && (
            <div className="mt-2">
              <div className="card text-white bg-primary">
                <div className="card-header">Note Preview</div>
                <div className="card-body">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
              </div>
            </div>
          )}

          <Form.Group controlId="category" className="mt-2">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the category"
              value={category}
              onChange={handleCategoryChange}
            />
          </Form.Group>
          {loading && <Loading />}
          <div className="mt-2">
            <Button variant="primary" type="submit">
              Update Note
            </Button>
            <Button
              style={{ marginLeft: 7 }}
              variant="info"
              onClick={handleShow}
            >
              Delete Note
            </Button>
          </div>
        </Form>
        <div className="mt-2">
          <small className="text-muted">
            Created on - {date.substring(0, 10)}
          </small>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Body>Are you sure you want to delete this note?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="info" onClick={deleteHandler}>
            Delete Note
          </Button>
        </Modal.Footer>
      </Modal>
    </MainScreen>
  );
}

export default EditNote;
