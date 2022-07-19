import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { AiOutlineClose } from "react-icons/ai";
import { doApiGet } from "../../services/apiService";

function ResetPass(props) {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  let show = props.show;
  let handleToggle = props.handleToggle;
  let error = null;

  const handleReset = async () => {
    let url = "/users/resetPass/" + email;
    let resp = await doApiGet(url);
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleToggle}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleReset}>
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
