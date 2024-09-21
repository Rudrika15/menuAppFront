import React, { useEffect, useState } from "react";
import RestaurantSidebar from "../../component/RestaurantSidebar";
import RestaurantBreadcrumbs from "../../component/RestaurantBreadcrumbs";
import { menuPhoto, restoreMenu, trashMenu } from "../../../api/Api";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const TrashMenu = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTrashMenu = async () => {
    try {
      const response = await axios.get(trashMenu, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      console.log(response, "test response");
      if (response.data?.status) {
        setMenu(response.data.data);
        setLoading(false);
      } else {
        setMenu([]);
      }
    } catch (error) {
      console.error("Failed to fetch trash Menu:", error);
      setMenu([]);
    }
  };
  const restoreMenu = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, restore it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(`${restoreMenu}/${id}`, null, {
            headers: {
              token: localStorage.getItem("token"),
            },
          });
          if (response.data.status) {
            toast.success(response.data.message);
            getTrashMenu();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error("API error");
        }
      }
    });
  };
  useEffect(() => {
    getTrashMenu();
  }, []);

  return (
    <>
      <RestaurantSidebar />
      <main id="main" className="main">
        <RestaurantBreadcrumbs
          title="Trash Menu"
          link="/view-menu"
          linkTitle="Back"
        />
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body pt-5">
                  {loading ? (
                    <div className="d-flex justify-content-center">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
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
                        {menu.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="text-center">
                              No data found
                            </td>
                          </tr>
                        ) : (
                          menu.map((menu) => (
                            <tr key={menu.id}>
                              <td>{menu.name}</td>
                              <td>{menu.price}</td>
                              <td style={{ width: "400px" }}>
                                <img
                                  src={`${menuPhoto}${menu.photo}`}
                                  className="img-fluid w-25 h-25"
                                  alt="Category"
                                />
                              </td>
                              <td>
                                <Link
                                  to="#"
                                  onClick={() => restoreMenu(menu.id)}
                                >
                                  <i className="btn btn-success bi bi-arrow-counterclockwise"></i>
                                </Link>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default TrashMenu;
