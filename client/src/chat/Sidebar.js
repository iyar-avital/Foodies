import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import { addNotifications, resetNotifications } from "../redux/userSlice";

import "./css/Sidebar.css";
import { API_URL } from "../services/apiService";

function Sidebar() {
  const user = useSelector((state) => state.user);
  const {
    socket,
    setCurrentRoom,
    rooms,
    setRooms,
    currentRoom,
    serviceMsg,
    setServiceMsg,
  } = useContext(AppContext);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      getRooms();
    }
  }, []);

  //switch the event off before on to prevert bugs
  socket.off("update-forums").on("update-forums", (payload) => {
    setRooms(payload);
  });
  const getRooms = async () => {
    let url = API_URL + "/chat/rooms";
    let resp = await axios(url);
    setRooms(resp.data);
  };

  const joinRoom = (_room, _isPublic = true) => {
    if (!user) {
      return alert("Please login first");
    }
    if (_isPublic) {
      setServiceMsg(false);
    }
    socket.emit("join-room", _room);
    setCurrentRoom(_room);
    dispatch(resetNotifications(_room));
  };

  socket.off("notifications").on("notifications", (_room) => {
    if (currentRoom !== _room) dispatch(addNotifications(_room));
  });

  const handleServiceMsg = () => {
    setServiceMsg(true);
    joinRoom(user._id, false);
  };

  if (!user) {
    return <></>;
  }
  return (
    <>
      <h2 className="display-4">Forums</h2>
      <ListGroup>
        {rooms.map((room, idx) => (
          <ListGroup.Item
            key={idx}
            onClick={() => joinRoom(room.name)}
            active={room.name === currentRoom}
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {room.name}
            {currentRoom !== room.name && (
              <span className="badge rounded-pill bg-primary">
                {user.newMessages[room.name]}
              </span>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <h2>Customers Service</h2>
      <ListGroup.Item
        active={user._id === currentRoom}
        style={{ cursor: "pointer" }}
        onClick={handleServiceMsg}
      >
        <Row className="justify-content-between pe-2 ">
          <Col xs={9}>Contact Us</Col>
          <Col xs={1}>
            <span className="badge rounded-pill bg-primary">
              {user.newMessages[user._id]}
            </span>
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  );
}

export default Sidebar;
