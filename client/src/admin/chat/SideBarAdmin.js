import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotifications, resetNotifications } from "../../redux/userSlice";
import { AppContext } from "../../context/appContext";
import { API_URL, doApiGet, doApiMethod } from "../../services/apiService";
import axios from "axios";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { BsEraser } from "react-icons/bs";
import Collapse from "react-bootstrap/Collapse";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function SideBarAdmin() {
  const user = useSelector((state) => state.user);
  const {
    socket,
    currentRoom,
    setCurrentRoom,
    rooms,
    setRooms,
    clients,
    setClients,
    serviceMsg,
    setServiceMsg,
  } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [newForum, setNewForum] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    getRooms();
    getClients();
    socket.emit("join-room", rooms[0]?.name);
  }, []);

  //switch the event off before on to prevert bugs
  socket.off("update-forums").on("update-forums", (payload) => {
    setRooms(payload);
  });
  const getRooms = async () => {
    let url = API_URL + "/chat/rooms";
    let resp = await axios(url);
    setRooms(resp.data);
    console.log(resp.data);
  };

  const getClients = async () => {
    let url = API_URL + "/users/usersList";
    let resp = await doApiGet(url);
    let clients = resp.data.filter((client) => client.role !== "admin");
    setClients(clients);
  };

  const joinRoom = (_room, _isPublic = true) => {
    if (!user) {
      return alert("Please login first");
    }
    socket.emit("join-room", _room);
    setCurrentRoom(_room);

    if (_isPublic) {
      setServiceMsg(false);
    }
    dispatch(resetNotifications(_room));
  };

  socket.off("notifications").on("notifications", (_room) => {
    if (currentRoom !== _room) {
      dispatch(addNotifications(_room));
    }
  });

  const handleServiceMgs = (client) => {
    setServiceMsg(true);
    joinRoom(client._id, false);
  };

  const handelAddRmoveRoom = async (room) => {
    let url = API_URL + "/chat/addRmoveRoom/";
    let body = {
      name: room,
    };
    let resp = await doApiMethod(url, "POST", body);
  };
  //   const handelDeleteClientChat = (client) => {};

  if (!user) {
    return <></>;
  }
  return (
    <>
      <div className="mb-3">
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
          variant="outline-success"
          className="mb-2"
        >
          Add Forum
        </Button>
        <Collapse in={open}>
          <Row id="example-collapse-text d-flex align-items-center ">
            <Col xs={8}>
              <FloatingLabel controlId="floatingPassword" label="Forum name">
                <Form.Control
                  type="text"
                  placeholder="Forum name"
                  value={newForum}
                  onChange={(e) => setNewForum(e.target.value)}
                />
              </FloatingLabel>
            </Col>
            <Col xs={2}>
              <Button
                variant="success"
                onClick={() => {
                  setOpen(false);
                  handelAddRmoveRoom(newForum);
                  setNewForum("");
                }}
              >
                Add
              </Button>
            </Col>
          </Row>
        </Collapse>
      </div>
      <h2 className="display-4">Forums</h2>
      <ListGroup>
        {rooms.map((room, idx) => (
          <Row>
            <Col xs={8}>
              <ListGroup.Item
                key={idx}
                onClick={() => joinRoom(room.name)}
                active={room?.name === currentRoom}
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
            </Col>
            <Col xs={2}>
              <button
                onClick={() => handelAddRmoveRoom(room.name)}
                className="btn btn-outline-danger mx-2"
                title="Delete"
              >
                <BsEraser />
              </button>
            </Col>
          </Row>
        ))}
      </ListGroup>
      <h2 className="display-6 mt-4">Customers Service</h2>
      <ListGroup>
        {clients.map((client, idx) => (
          <Row>
            <Col xs={8}>
              <ListGroup.Item
                key={idx}
                onClick={() => handleServiceMgs(client)}
                active={client._id === currentRoom}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {client.name}
                {currentRoom !== client._id && (
                  <span className="badge rounded-pill bg-primary">
                    {user.newMessages[client._id]}
                  </span>
                )}
              </ListGroup.Item>
            </Col>
          </Row>
        ))}
      </ListGroup>
    </>
  );
}
export default SideBarAdmin;
