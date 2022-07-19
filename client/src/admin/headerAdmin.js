import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdAdminPanelSettings, MdOutlineLogout, MdStorefront } from "react-icons/md";
import { BiHomeAlt, BiCategory } from "react-icons/bi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { RiShoppingCartLine } from "react-icons/ri";
import { FaUserAstronaut } from "react-icons/fa";

function HeaderAdmin(props) {
  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link to="/" className="logoFont">
            <h2>Foodzone</h2>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            style={{ maxWidth: "80vw" }}
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Admin Panel <MdAdminPanelSettings className="ms-2" />
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-start flex-grow-1 ps-5">
                <React.Fragment>
                  <li data-bs-dismiss="offcanvas">
                    <Link to="../logout" className="nav-link rounded text-danger">
                      Log out <MdOutlineLogout className="ms-1" />
                    </Link>
                  </li>
                  <li data-bs-dismiss="offcanvas">
                    <Link className="nav-link" to="/admin/home">
                      Home <BiHomeAlt className="ms-1" />
                    </Link>
                  </li>
                  <li data-bs-dismiss="offcanvas">
                    <Link className="nav-link" to="/admin/orders">
                      Orders <HiOutlineClipboardList className="ms-1" />
                    </Link>
                  </li>
                  <li data-bs-dismiss="offcanvas">
                    <Link className="nav-link" to="/admin/users">
                      Users <FaUserAstronaut className="ms-1" />
                    </Link>
                  </li>
                  <li data-bs-dismiss="offcanvas">
                    <Link className="nav-link" to="/admin/stores">
                      Stores <MdStorefront className="ms-1" />
                    </Link>
                  </li>
                  <li data-bs-dismiss="offcanvas">
                    <Link className="nav-link" to="/admin/products">
                      Products <RiShoppingCartLine className="ms-1" />
                    </Link>
                  </li>
                </React.Fragment>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default HeaderAdmin;
