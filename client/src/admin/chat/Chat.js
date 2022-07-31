import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import MessageForm from "./MessageForm";
import Sidebar from "./Sidebar";
import "./css/chat.css";

function Chat() {
  return (
    <div className="container-fluid chat__bg p-4">
      <Container>
        <Row>
          <Col md={4}>
            <Sidebar />
          </Col>
          <Col md={8}>
            <MessageForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Chat;
