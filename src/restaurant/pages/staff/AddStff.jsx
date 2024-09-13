import React, { useState, useEffect } from "react";
import RestaurantSidebar from "../../component/RestaurantSidebar";
import RestaurantBreadcrumbs from "../../component/RestaurantBreadcrumbs";
import { toast } from "react-toastify";
import axios from "axios";
import { addStff, getSingleStaffData, updateStaffApi } from "../../../api/Api";
import { useParams, useNavigate } from "react-router-dom";

const AddStff = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [staffType, setStaffType] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchStaffDetails(id);
    }
  }, [id]);

  const fetchStaffDetails = async (staffId) => {
    try {
      const response = await axios.get(`${getSingleStaffData}/${staffId}`, {
        headers: { token: localStorage.getItem("token") },
      });
      console.log(response, "data response");
      const staff = response.data.data[0];
      setName(staff.name);
      setEmail(staff.email);
      setContactNumber(staff.contactNumber);
      setStaffType(staff.staffType);
    } catch (error) {
      toast.error("Failed to fetch staff details!");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Name is required");
      return;
    }
    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!password && !isEditMode) {
      toast.error("Password is required");
      return;
    }
    if (!contactNumber) {
      toast.error("Contact number is required");
      return;
    }
    if (contactNumber.length != 10) {
      toast.error("Contact number should be 10 digits");
      return;
    }
    if (!staffType) {
      toast.error("Staff type is required");
      return;
    }

    // const data = {
    //   name,
    //   email,
    //   password,
    //   contactNumber,
    //   staffType,
    // };

    const data = {
      name,
      email,
      contactNumber,
      staffType,
      ...(isEditMode ? {} : { password }),
    }; // Password is not required when editing

    try {
      if (isEditMode) {
        const response = await axios.put(`${updateStaffApi}/${id}`, data, {
          headers: { token: localStorage.getItem("token") },
        });
        if (response.data.status === true) {
          toast.success(response.data.message);
          navigate("/view-staff");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(addStff, data, {
          headers: { token: localStorage.getItem("token") },
        });
        if (response.data.status === true) {
          toast.success(response.data.message);
          navigate("/view-staff");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error("API error");
    }
  };

  return (
    <>
      <RestaurantSidebar />
      <main id="main" className="main">
        <RestaurantBreadcrumbs
          title={isEditMode ? "Edit Staff" : "Add Staff"}
          link="/view-staff"
          linkTitle="Back"
        />
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
                          placeholder="Enter name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="floatingName">Name</label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control"
                          id="floatingEmail"
                          placeholder="Enter email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="floatingEmail">Email</label>
                      </div>
                    </div>
                    {!isEditMode && (
                      <div className="col-md-12">
                        <div className="form-floating">
                          <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label htmlFor="floatingPassword">Password</label>
                        </div>
                      </div>
                    )}

                    <div className="col-md-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingContactNumber"
                          placeholder="Enter contact number"
                          value={contactNumber}
                          onChange={(e) => setContactNumber(e.target.value)}
                        />
                        <label htmlFor="floatingContactNumber">
                          Contact Number
                        </label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-floating">
                        <select
                          className="form-select"
                          id="floatingStaffType"
                          value={staffType}
                          onChange={(e) => setStaffType(e.target.value)}
                        >
                          <option disabled selected value="">
                            Select Staff Type
                          </option>
                          <option value="manager">Manager</option>
                          <option value="waiter">Waiter</option>
                          <option value="chef">Chef</option>
                        </select>
                        <label htmlFor="floatingStaffType">Staff Type</label>
                      </div>
                    </div>
                    <div className="">
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value={isEditMode ? "Update Staff" : "Add Staff"}
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

export default AddStff;
