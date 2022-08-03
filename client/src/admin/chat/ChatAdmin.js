import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import MessageForm from "../../chat/MessageForm";
import AuthAdminComp from "../../comps/auth/authAdminComp";
import SideBarAdmin from "./SideBarAdmin";

function ChatAdmin() {
  return (
    <div className="container-fluid chat__bg p-4">
      <AuthAdminComp />
      <Container>
        <Row>
          <Col md={5}>
            <SideBarAdmin />
          </Col>
          <Col md={7}>
            <MessageForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ChatAdmin;
