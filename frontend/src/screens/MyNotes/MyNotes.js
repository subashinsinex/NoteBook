import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Accordion, Badge, Button, Card, Alert, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import { deleteNotes, listNotes } from "../../actions/notesAction";
import Loading from "../../components/Loading";

const MyNotes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notesList = useSelector((state) => state.notesList);
  const { loading, notes, error } = notesList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const notesDelete = useSelector((state) => state.notesDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = notesDelete;

  const [showModal, setShowModal] = useState(false);
  const [noteIdToDelete, setNoteIdToDelete] = useState(null);

  const handleShow = (id) => {
    setNoteIdToDelete(id);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  const deleteHandler = () => {
    dispatch(deleteNotes(noteIdToDelete));
    handleClose();
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(listNotes());
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  return (
    <MainScreen title={`Welcome ${userInfo.name},`}>
      <Link to="/createnote">
        <Button style={{ marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>
      {errorDelete && <Alert variant="primary">{errorDelete}</Alert>}
      {error && <Alert variant="primary">{error}</Alert>}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {!loading && !error && notes && notes.length === 0 && (
        <Alert variant="primary">
          No notes available. Create a new note to get started!
        </Alert>
      )}
      <Accordion defaultActiveKey="0">
        {notes?.map((note, index) => (
          <Accordion.Item
            eventKey={index.toString()}
            key={note._id}
            style={{ marginBottom: 10 }}
          >
            <Accordion.Header>
              <span
                style={{
                  textDecoration: "none",
                  flex: 1,
                  cursor: "pointer",
                  alignSelf: "center",
                  fontSize: 18,
                }}
              >
                {note.title}
              </span>
            </Accordion.Header>
            <Accordion.Body>
              <Card className="border-primary mb-3">
                <Card.Body className="text-dark">
                  <h4>
                    <Badge bg="success">Category - {note.category}</Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <p>{note.content}</p>
                    <figcaption
                      className="blockquote-footer text-dark-emphasis"
                      style={{ marginTop: 1, fontSize: 12, marginBottom: 6 }}
                    >
                      Created On{" "}
                      <cite title="Source Title">
                        {note.createdAt.substring(0, 10)}
                      </cite>
                    </figcaption>
                  </blockquote>
                  <div>
                    <Link to={`/editnote/${note._id}`}>
                      <Button variant="primary">Edit</Button>
                    </Link>
                    <Button
                      variant="info"
                      style={{ marginLeft: 6 }}
                      onClick={() => handleShow(note._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

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
};

export default MyNotes;
