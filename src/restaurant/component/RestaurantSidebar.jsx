import React from "react";
import { Link } from "react-router-dom";
import RestaurantTopbar from "./RestaurantTopbar";

const RestaurantSidebar = () => {
  const name = localStorage.getItem("restName") || "default"; // Default value if not set
  const role = localStorage.getItem("role");

  return (
    <>
      <RestaurantTopbar />
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link className="nav-link collapsed" to={`/${name}/`}>
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </Link>
          </li>

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#staff"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="bi bi-journal-text"></i>
              <span>Staff</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="staff"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to={`/${name}/view-staff`}>
                  <i className="bi bi-circle"></i>
                  <span>View staff</span>
                </Link>
              </li>
              <li>
                <Link to={`/${name}/trash-staff`}>
                  <i className="bi bi-circle"></i>
                  <span>Trash staff</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#category"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="bi bi-journal-text"></i>
              <span>Category</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="category"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to={`/${name}/view-category`}>
                  <i className="bi bi-circle"></i>
                  <span>View category</span>
                </Link>
              </li>
              <li>
                <Link to={`/${name}/trash-category`}>
                  <i className="bi bi-circle"></i>
                  <span>Trash category</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#table"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="bi bi-journal-text"></i>
              <span>Table</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="table"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to={`/${name}/view-table`}>
                  <i className="bi bi-circle"></i>
                  <span>View table</span>
                </Link>
              </li>
              <li>
                <Link to={`/${name}/trash-table`}>
                  <i className="bi bi-circle"></i>
                  <span>Trash table</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#menu"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="bi bi-journal-text"></i>
              <span>Menu</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="menu"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to={`/${name}/view-menu`}>
                  <i className="bi bi-circle"></i>
                  <span>View Menu</span>
                </Link>
              </li>
              <li>
                <Link to={`/${name}/trash-menu`}>
                  <i className="bi bi-circle"></i>
                  <span>Trash Menu</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            {(role === "Cashier" ||
              role === "Manager" ||
              role === "Admin") ? (
              <Link className="nav-link collapsed" to={`/${name}/bills`}>
                <i className="bi bi-journal-text"></i>
                <span>Bills</span>
              </Link>
            ) : null}
          </li>
        </ul>
      </aside>
    </>
  );
};

export default RestaurantSidebar;
