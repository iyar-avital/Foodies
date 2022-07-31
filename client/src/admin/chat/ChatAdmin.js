import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import MessageForm from "../../chat/MessageForm";
import SideBarAdmin from "./SideBarAdmin";

function ChatAdmin() {
  return (
    <div className="container-fluid chat__bg p-4">
      <Container>
        <Row>
          <Col md={4}>
            <SideBarAdmin />
          </Col>
          <Col md={8}>
            <MessageForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ChatAdmin;
