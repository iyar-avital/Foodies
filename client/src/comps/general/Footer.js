import React from "react";
import { BsFacebook, BsTwitter, BsSnapchat, BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Nav } from "react-bootstrap";
function Footer(props) {
  const dt = new Date();
  const user = useSelector((state) => state.user);

  return (
    <>
      <Nav className="justify-content-center mt-4" activeKey="/home">
        {user && (
          <>
            <Nav.Item>
              <Nav.Link className="text-secondary" href="/createStore">
                Create store
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="text-secondary" href="/myStores">
                My stores
              </Nav.Link>
            </Nav.Item>
          </>
        )}
        <Nav.Item>
          <Nav.Link className="text-secondary" eventKey="link-2">
            Customers service
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <p className="text-center py-3">Foodzone © {dt.getFullYear()}</p>
    </>
  );
}

export default Footer;
