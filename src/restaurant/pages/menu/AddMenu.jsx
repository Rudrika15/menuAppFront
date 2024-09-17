import React from "react";
import RestaurantBreadcrumbs from "../../component/RestaurantBreadcrumbs";
import RestaurantSidebar from "../../component/RestaurantSidebar";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
  getSingleMenuData,
  categoryImage,
  addMenu,
  updateMenuApi,
} from "../../../api/Api";

const AddMenu = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loader, setLoader] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchMenuDetails(id);
    }
  }, [id]);

  const fetchMenuDetails = async (id) => {
    try {
      setLoader(true);
      const response = await axios.get(`${getSingleMenuData}/${id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setLoader(false);

      if (response.data.status == true) {
        console.log(response.data);

        const menu = response.data.data;
        setTitle(menu.title);
        setPrice(menu.price);
        setPhoto(menu.photo);
      }
    } catch (error) {
      setLoader(false);
      toast.error("Failed to fetch menu details!");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      toast.error("Name is required");
      return;
    }
    if (!price) {
      toast.error("Price is required");
      return;
    }
    if (!photo && !isEditMode) {
      toast.error("Photo is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      setLoader(true);

      if (isEditMode) {
        const response = await axios.put(`${updateMenuApi}/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          },
        });
        setLoader(false);
        if (response.data.status === true) {
          toast.success(response.data.message);
          navigate("/view-menu");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(addMenu, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          },
        });
        setLoader(false);
        if (response.data.status === true) {
          toast.success(response.data.message);
          navigate("/view-menu");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      setLoader(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      <RestaurantSidebar />
      <main id="main" className="main">
        <RestaurantBreadcrumbs
          title={isEditMode ? "Edit Menu" : "Add Menu"}
          link="/view-menu"
          linkTitle="Back"
        />

        {loader ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <section className="section">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body pt-5">
                    <form className="row g-3" onSubmit={handleFormSubmit}>
                      <div className="col-md-12">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingName"
                            placeholder="Name"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                          <label htmlFor="floatingName">Name</label>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingName"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                          <label htmlFor="floatingName">Price</label>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-floating">
                          <input
                            type="file"
                            className="form-control"
                            id="floatingPhoto"
                            placeholder="Your photo"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                setPhoto(file);
                                setPreviewImage(URL.createObjectURL(file));
                              }
                            }}
                          />
                          <label htmlFor="floatingPhoto">Photo</label>
                        </div>
                      </div>
                      {(previewImage || (isEditMode && photo)) && (
                        <div className="mt-3">
                          <img
                            src={previewImage || `${categoryImage}/${photo}`}
                            alt="Category Preview"
                            style={{ width: "150px", height: "150px" }}
                          />
                        </div>
                      )}
                      <div className="">
                        <input
                          type="submit"
                          className="btn btn-primary"
                          value={isEditMode ? "Update Menu" : "Add Menu"}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default AddMenu;
