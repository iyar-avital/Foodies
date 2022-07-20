import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { AiOutlineClose } from "react-icons/ai";
import { API_URL, doApiGet } from "../../services/apiService";
import isEmail from "validator/lib/isEmail";
import axios from "axios";

function ResetPass(props) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [emailSent, setEmailSent] = useState(true);
  const [resetCode, setResetCode] = useState("");

  let show = props.show;
  let handleToggle = props.handleToggle;
  let error = null;

  const handleReset = async () => {
    let url = API_URL + "/users/resetPass";
    let resp = await axios.get(url, {
      headers: {
        "x-api-key": email,
      },
    });
    if (resp.data.emailSent) {
      setEmailSent(true);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleToggle} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reset password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && (
            <p className="alert alert-danger">
              {error.data?.err ? error.data.err : "It's not you, it's up. Please thy again later."}
            </p>
          )}
          <Form>
            {emailSent ? (
              <>
                <Form.Label>Reset code sent to {email}</Form.Label>
                <Form.Group className="mb-3 text-start" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Enter code"
                    onChange={(e) => setResetCode(e.target.value)}
                    value={resetCode}
                    required
                  />
                </Form.Group>
              </>
            ) : (
              <>
                <Form.Label>Please enter your email address</Form.Label>
                <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleToggle}>
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={handleReset}
            disabled={!email && !resetCode}
          >
            Reset
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    // <div className="reset reset-bg reset">
    //   <div className="light_box">
    //     <div className="inside_box">
    //       <div>
    //         <button className="btn btn-outline-danger close_button">
    //           <AiOutlineClose />
    //         </button>
    //         <h2 className="mb-4">Password Reset</h2>
    //         <p className="test-start">please enter your email</p>
    //         <input
    //           type="email"
    //           className="form-control mb-3"
    //           placeholder="Email"
    //           onChange={(e) => setEmail(e.target.value)}
    //         />

    //         <Button variant="primary" type="submit" onClick={handleSubmit}>
    //           Submit
    //         </Button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default ResetPass;
