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
      {/* // <div className="footer-basic">
    //   <footer>
    //     {user && (
    //       <ul className="list-inline">
    //         <li className="list-inline-item animaLinkSM">
    //           <Link to="/createStore">Create store</Link>
    //         </li>
    //         <li className="list-inline-item animaLinkSM">
    //           <Link to="/myStores">My stores</Link>
    //         </li>
    //       </ul>
    //     )}
    //     <p className="copyright">Foodzone © {dt.getFullYear()}</p>
    //   </footer>
    // </div> */}
      <Nav className="justify-content-center " activeKey="/home">
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
      <p className="text-center mt-4 mb-4">Foodzone © {dt.getFullYear()}</p>
    </>
  );
}

export default Footer;
