import React from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import notes from "../../data/notes";

const MyNotes = () => {
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      // Add delete logic here
    }
  };

  return (
    <MainScreen title="Welcome Back Subashinsinex..">
      <Link to="/createnote">
        <Button style={{ marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>
      <Accordion defaultActiveKey="0">
        {notes.map((note, index) => (
          <Accordion.Item
            eventKey={index.toString()}
            key={note._id}
            style={{ marginBottom: 10 }} // Adjust spacing here
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
                  <div>
                    <h5>{note.content}</h5>
                    <p>Created On - {note.createdAt}</p>
                  </div>
                  <div>
                    <Link to={`/note/${note._id}`}>
                      <Button>Edit</Button>
                    </Link>
                    <Button
                      style={{ marginLeft: 6 }}
                      onClick={() => deleteHandler(note._id)}
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
    </MainScreen>
  );
};

export default MyNotes;
