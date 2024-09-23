import React, { useEffect, useState } from "react";
import RestaurantSidebar from "../../component/RestaurantSidebar";
import RestaurantBreadcrumbs from "../../component/RestaurantBreadcrumbs";
import axios from "axios";
import {
  getMenuList,
  categoryImage,
  deleteMenuList,
  menuPhoto,
} from "../../../api/Api";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const View = () => {
  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");

  const getMenu = async () => {
    try {
      const config = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };

      let url = getMenuList;

      if (search.length > 3) {
        url += `?search=${search}`;
      }

      const response = await axios.get(url, config);

      if (response.data.status === true) {
        setMenu(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    console.log(id, "for test");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${deleteMenuList}/${id}`, {
            headers: {
              token: localStorage.getItem("token"),
            },
          });

          if (response.data.status === true) {
            toast.success(response.data.message);
            getMenu();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    });
  };

  useEffect(() => {
    getMenu();
  }, [search]);

  return (
    <>
      <RestaurantSidebar />
      <main id="main" className="main">
        <RestaurantBreadcrumbs
          title="View Menu"
          link="/add-menu"
          linkTitle="Add Menu"
        />
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body pt-5">
                  <div className="d-flex justify-content-end">
                    <div>
                      <input
                        type="text"
                        name="search"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        className="form-control mb-3"
                        placeholder="Search here"
                      />
                    </div>
                  </div>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Photo</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {menu.length === 0 && (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No Data Found
                          </td>
                        </tr>
                      )}
                      {menu.map((item, index) => (
                        <tr key={index}>
                          <td>{item.title}</td>
                          <td>{item.price}</td>
                          <td>
                            <img
                              src={`${menuPhoto}/${item?.photo}`}
                              width="50"
                              height="50"
                              alt="Menu Item"
                            />
                          </td>
                          <td>
                            <Link to={`/edit-menu/${item.id}`}>
                              <i className="btn btn-primary bi bi-pencil text-white fs-5 p-2 me-2"></i>
                            </Link>
                            <i
                              className="btn btn-danger bi bi-trash text-white fs-5 p-2 me-2"
                              onClick={() => handleDelete(item.id)}
                            ></i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default View;
