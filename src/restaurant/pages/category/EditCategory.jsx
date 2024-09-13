import React from "react";
import { useState, useEffect } from "react";
import RestaurantSidebar from "../../component/RestaurantSidebar";
import RestaurantBreadcrumbs from "../../component/RestaurantBreadcrumbs";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  updateCategory,
  getSingleCategory,
  categoryImage,
} from "../../../api/Api";

const EditCategory = () => {
  const [title, setTitle] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [loader, setLoader] = useState(true);

  const { categoryId } = useParams();

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(`${getSingleCategory}/${categoryId}`, {
          headers: { token: localStorage.getItem("token") },
        });
        if (response.data) {
          if (response.data.status == true) {
            setTitle(response.data.data[0].title);
            setPhoto(response.data.data[0].photo);
            setLoader(false);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCategoryData();
  }, [categoryId]);

  const handleCategoryChange = (event) => {
    setTitle(event.target.value);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("category", title);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const response = await axios.put(
        `${updateCategory}/${categoryId}`,
        formData,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );

      console.log(response.data, "response of edit category");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <RestaurantSidebar />
      <main id="main" className="main">
        <RestaurantBreadcrumbs
          title="Edit Category"
          linkTitle="Back"
          link="/view-category"
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
                    <form className="row g-3" onSubmit={handleSubmit}>
                      <div className="col-md-12">
                        <div className="form-floating">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingName"
                            placeholder={title}
                            value={title}
                            onChange={handleCategoryChange}
                          />
                          <label htmlFor="floatingName">Category</label>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-floating">
                          <input
                            type="file"
                            className="form-control"
                            id="floatingEmail"
                            placeholder="your photo"
                            onChange={handlePhotoChange}
                          />
                          <label htmlFor="floatingEmail">Photo</label>
                        </div>
                      </div>
                      {photo && (
                        <div className="col-md-12">
                          <img
                            src={`${categoryImage}/${photo}`}
                            alt="Selected or Existing Photo"
                            style={{ width: "150px", height: "150px" }}
                          />
                        </div>
                      )}
                      <div className="">
                        <input type="submit" className="btn btn-primary" />
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

export default EditCategory;
