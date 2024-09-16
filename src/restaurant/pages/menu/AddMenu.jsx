import React from "react";
import RestaurantBreadcrumbs from "../../component/RestaurantBreadcrumbs";
import RestaurantSidebar from "../../component/RestaurantSidebar";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { getSingleMenuData } from "../../../api/Api";

const AddMenu = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loader, setLoader] = useState(false);
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
      if (response.data.status === true) {
        const menu = response.data.data[0];
        setName(menu.name);
        setPrice(menu.price);
        setPhoto(menu.photo);
      }
    } catch (error) {
      setLoader(false);
      toast.error("Failed to fetch menu details!");
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
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body pt-5">
                  <form className="row g-3">
                    <div className="col-md-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingName"
                          placeholder="Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
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
                          onChange={(e) => setPhoto(e.target.files[0])}
                        />
                        <label htmlFor="floatingPhoto">Photo</label>
                      </div>
                    </div>

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
      </main>
    </>
  );
};

export default AddMenu;
