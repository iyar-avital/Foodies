import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteUserMutation } from "../../redux/appApi";
import { Col, Container, InputGroup, Row, Spinner, Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { API_URL, doApiMethod } from "../../services/apiService";

function DeleteAccount(props) {
  const [password, setPassword] = useState("");
  const [deleteUser, { Loading, error }] = useDeleteUserMutation();
  const nav = useNavigate();

  let show = props.show;
  let handleToggle = props.handleToggle;

  const onDeleteClick = async () => {
    if (password) {
      await setPassword(password.toString());
      console.log(password);
      if (window.confirm("You are about to delete your account")) {
        try {
          let url = API_URL + "/users/";
          let data = await axios({
            method: "DELETE",
            url: url,
            withCredentials: true,
          });
          return data;
        } catch (err) {
          throw err;
        }
        handleToggle();
      } else {
        handleToggle();
      }
    } else {
      alert("Password requierd");
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleToggle} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete your account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-start">Please enter your password</p>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="submit" onClick={handleToggle}>
            Close
          </Button>
          <Button variant="primary" onClick={onDeleteClick}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteAccount;