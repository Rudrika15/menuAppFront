import React, { useState, useEffect } from "react";
import RestaurantSidebar from "../../component/RestaurantSidebar";
import RestaurantBreadcrumbs from "../../component/RestaurantBreadcrumbs";
import axios from "axios"; // Import axios for making API calls
import {
  addCategory,
  updateCategory,
  getSingleCategory,
  categoryImage,
} from "../../../api/Api";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

export const AddCategory = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [loader, setLoader] = useState(false);
  const [previewImage, setPreviewImage] = useState(""); // State to store the preview image
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      fetchCategoryData(id);
    }
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get(`${getSingleCategory}/${id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      if (response.data) {
        if (response.data.status === true) {
          setTitle(response?.data?.data[0]?.title);
          setPhoto(response?.data?.data[0]?.photo);
          setLoader(false);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(error.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      toast.error("Please fill the title field");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    if (typeof photo === "object") {
      formData.append("photo", photo);
    }
    setLoader(true);
    try {
      let response;
      if (isEditing) {
        response = await axios.post(`${updateCategory}/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          },
        });
      } else {
        response = await axios.post(addCategory, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          },
        });
      }

      if (response.data.status === true) {
        toast.success(
          isEditing
            ? "Category updated successfully!"
            : "Category added successfully!"
        );
        navigate("/view-category");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error occurred");
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <RestaurantSidebar />
      <main id="main" className="main">
        <RestaurantBreadcrumbs
          title={isEditing ? "Edit Category" : "Add Category"}
          link="/view-category"
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
                            placeholder="Your category"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                          <label htmlFor="floatingName">Category</label>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-floating">
                          <input
                            type="file"
                            className="form-control"
                            id="floatingPhoto"
                            placeholder="Your photo"
                            onChange={handleFileChange}
                          />
                          <label htmlFor="floatingPhoto">Photo</label>
                        </div>
                      </div>
                      {(previewImage || (isEditing && photo)) && (
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
                          value={isEditing ? "Update Category" : "Add Category"}
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
