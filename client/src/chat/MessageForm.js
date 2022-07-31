import React, { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import {
  Form,
  Row,
  Col,
  FormGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import "./css/MessageForm.css";

function MessageForm() {
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user);
  const { socket, currentRoom, setMessages, messages, serviceMsg } =
    useContext(AppContext);
  const messageEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const getFromattedDate = () => {
    let date = new Date();
    // returns date in format of mm-dd-yyyy
    date = new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }).format(date);
    return date;
  };
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const todayDate = getFromattedDate();

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    setMessages(roomMessages);
  });

  const handelSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const time = today.toLocaleTimeString([], {
      hour: "2-digit",
      hour12: false,
      minute: "2-digit",
    });
    const roomId = currentRoom;
    console.log(roomId);
    socket.emit("message-room", roomId, message, user, time, todayDate);
    setMessage("");
  };
  return (
    <>
      <div className="messages-output">
        {!user && <div className="alert alert-danger">Please login</div>}
        {user &&
          messages.map(({ _id: date, messagesByDate }, idx) => (
            <div key={idx}>
              <p className="alert alert-info text-center message-date-indicator">
                {date}
              </p>
              {messagesByDate.map(({ content, time, from: sender }, idx) => (
                <div
                  className={
                    sender._id === user._id ? "message" : "incoming-message"
                  }
                  key={idx}
                >
                  <div className="message-inner">
                    {!serviceMsg && (
                      <div className="d-flex align-items-center">
                        <img
                          src={sender.picture}
                          style={{
                            width: 35,
                            heigth: 35,
                            objectFit: "cover",
                            borderRadius: "50%",
                            marginRight: 10,
                          }}
                          alt=""
                        />
                        <p className="message-sender">
                          {sender._id === user._id ? "You" : sender.name}
                        </p>
                      </div>
                    )}
                    <p className="message-content">{content}</p>
                    <p className="message-timetamp-left">{time}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        <div ref={messageEndRef} />
      </div>
      <Form onSubmit={handelSubmit}>
        <Row>
          <Col md={11}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="your message"
                disabled={!user}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={1}>
            <Button
              varient="primary"
              type="submit"
              style={{ width: "100%", background: "orange" }}
              disabled={!user}
            >
              <i className="fa fa-paper-plane"></i>
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
export default MessageForm;
