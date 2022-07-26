import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import { addNotifications, resetNotifications } from "../fetures/userSlice";
import { API_URL } from "../services/apiServices";
import "./css/Sidebar.css";

function Sidebar() {
  const user = useSelector((state) => state.user);
  const {
    socket,
    members,
    setMembers,
    setCurrentRoom,
    rooms,
    setRooms,
    privateMemberMsg,
    setPrivateMemberMsg,
    currentRoom,
  } = useContext(AppContext);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setCurrentRoom("general");
      getRooms();
      console.log("sent");
      socket.emit("join-room", "general");
      socket.emit("new-user");
    }
  }, []);

  //switch the evernt off before on to prevert bugs
  socket.off("new-user").on("new-user", (payload) => {
    payload = payload.filter((member) => member._id !== user._id);
    setMembers(payload);
  });
  const getRooms = async () => {
    let url = API_URL + "/rooms";
    let resp = await axios(url);
    setRooms(resp.data);
    console.log(resp.data);
  };

  const joinRoom = (_room, _isPublic = true) => {
    if (!user) {
      return alert("Please login first");
    }
    socket.emit("join-room", _room);
    setCurrentRoom(_room);

    if (_isPublic) {
      setPrivateMemberMsg(null);
    }
    dispatch(resetNotifications(_room));
  };

  socket.off("notifications").on("notifications", (_room) => {
    if (currentRoom !== _room) dispatch(addNotifications(_room));
  });

  const orderIds = (_id1, _id2) => {
    if (_id1 > _id2) {
      return _id1 + _id2;
    } else {
      return _id2 + _id1;
    }
  };

  const handlePrivateMemberMsg = (_member) => {
    setPrivateMemberMsg(_member);
    const roomId = orderIds(_member._id, user._id);
    joinRoom(roomId, false);
  };

  if (!user) {
    return <></>;
  }
  return (
    <>
      <h2>Available rooms</h2>
      <ListGroup>
        {rooms.map((room, idx) => (
          <ListGroup.Item
            key={idx}
            onClick={() => joinRoom(room)}
            active={room === currentRoom}
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {room}
            {currentRoom !== room && (
              <span className="badge rounded-pill bg-primary">
                {user.newMessages[room]}
              </span>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h2>Members</h2>
      {members.map((member) => (
        <ListGroup.Item
          key={member._id}
          active={privateMemberMsg?._id === member?._id}
          style={{ cursor: "pointer" }}
          onClick={() => handlePrivateMemberMsg(member)}
        >
          <Row className="justify-content-between pe-2 ">
            <Col xs={2} className="member-status">
              <img src={member.picture} className="member-status-img" />
              {member.status === "online" ? (
                <i className="fas fa-circle sidebar-online-status"></i>
              ) : (
                <i className="fas fa-circle sidebar-offline-status"></i>
              )}
            </Col>
            <Col xs={9}>{member.name} </Col>
            <Col xs={1}>
              <span className="badge rounded-pill bg-primary">
                {user.newMessages[orderIds(member._id, user._id)]}
              </span>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </>
  );
}

export default Sidebar;