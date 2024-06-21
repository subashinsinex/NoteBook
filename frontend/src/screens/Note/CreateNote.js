import React, { useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Alert, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNotes } from "../../actions/notesAction";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notesCreate = useSelector((state) => state.notesCreate);
  const { loading } = notesCreate;

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

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !category.trim()) {
      setMessage("Please fill all the fields.");
    } else {
      dispatch(createNotes(title, content, category));
      resetHandler();
      navigate("/mynotes");
    }
  };

  return (
    <MainScreen title="Create a Note">
      <div className="createNote">
        {message && <Alert variant="primary">{message}</Alert>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="title" className="mt-2">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              placeholder="Enter the title"
              onChange={handleTitleChange}
            />
          </Form.Group>

          <Form.Group controlId="content" className="mt-2">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              value={content}
              placeholder="Enter the content"
              rows={4}
              onChange={handleContentChange}
            />
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
          </Form.Group>

          <Form.Group controlId="category" className="mt-2">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={category}
              placeholder="Enter the category"
              onChange={handleCategoryChange}
            />
          </Form.Group>

          <div className="mt-2">
            {loading && <Loading />}
            <Button type="submit" variant="primary">
              Create Note
            </Button>
            <Button
              className="ml-2"
              onClick={resetHandler}
              variant="info"
              style={{ marginLeft: 7 }}
            >
              Reset Fields
            </Button>
          </div>
        </Form>
        <div className="mt-2">
          <small className="text-muted">
            Creating on - {new Date().toLocaleDateString()}
          </small>
        </div>
      </div>
    </MainScreen>
  );
}

export default CreateNote;
