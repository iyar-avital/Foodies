import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import MessageForm from "../comps/MessageForm";
import Sidebar from "../comps/Sidebar";

function Chat() {
  return (
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
  );
}

export default Chat;
