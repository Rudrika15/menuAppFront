import React, { useEffect, useState } from "react";
import RestaurantSidebar from "../../component/RestaurantSidebar";
import { Link } from "react-router-dom";
import RestaurantBreadcrumbs from "../../component/RestaurantBreadcrumbs";
import axios from "axios";
import { toast } from "react-toastify";
import {
  categoryImage,
  categoryList,
  deleteCategories,
} from "../../../api/Api";
import Swal from "sweetalert2";
const ViewCategory = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loader, setLoader] = useState(true);

  const deleteCategory = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(deleteCategories + id, {
            headers: {
              token: localStorage.getItem("token"),
            },
          });
          if (response.data) {
            if (response.data.status === true) {
              toast.success(response.data.message);
              getCategory();
            } else {
              toast.error(response.data.message);
            }
          }
        } catch (error) {
          toast.error("API error");
        }
      }
    });
  };

  const getCategory = async () => {
    try {
      const response = await axios.get(categoryList, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      if (response.data.status === true) {
        if (response.data.data) {
          setCategoryData(response.data.data);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("API error");
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <RestaurantSidebar />
      <main id="main" className="main">
        <RestaurantBreadcrumbs
          title="View Category"
          link="/add-new-category"
          linkTitle="Add New Category"
        />
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body pt-5">
                  {loader ? (
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
                          <th>Photo</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categoryData.length === 0 ? (
                          <tr>
                            <td colSpan="3" className="text-center">
                              No Category Found
                            </td>
                          </tr>
                        ) : (
                          categoryData.map((category) => (
                            <tr key={category.id}>
                              <td>{category.title}</td>
                              <td>
                                <img
                                  src={`${categoryImage}${category.photo}`}
                                  className="img-fluid w-25"
                                  alt="Category"
                                />
                              </td>
                              <td>
                                <Link to={`/edit-category/${category.id}`}>
                                  <i className="bi bi-pen bg-primary text-white fs-5 p-2 me-2"></i>
                                </Link>
                                <Link
                                  onClick={() => deleteCategory(category.id)}
                                >
                                  <i className="bi bi-trash bg-danger text-white fs-5 p-2 me-2"></i>
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

export default ViewCategory;
