import React, { useState, useEffect } from "react";
import RestaurantSidebar from "../../component/RestaurantSidebar";
import RestaurantBreadcrumbs from "../../component/RestaurantBreadcrumbs";
import { addTable, getTableListById, updateTable } from "../../../api/Api";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AddTable = () => {
  const [tableNumber, setTableNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [loader, setLoader] = useState(false);

  const { tableId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (tableId) {
      setLoader(true);
      const fetchTableDetails = async () => {
        try {
          const response = await axios.get(`${getTableListById}/${tableId}`, {
            headers: {
              token: localStorage.getItem("token"),
            },
          });
          console.log(response.data.data, "response of data");
          if (response.data.status === true) {
            setTableNumber(response.data.data.tableNumber);
            setCapacity(response.data.data.capacity);
            setLoader(false);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          setLoader(false);
          toast.error("Failed to fetch table details.");
        }
      };
      fetchTableDetails();
    }
  }, [tableId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!tableNumber) {
      toast.error("Please enter table number");
      return;
    }
    if (!capacity) {
      toast.error("Please enter capacity");
      return;
    }
    const tableData = {
      tableNumber: tableNumber,
      capacity: capacity,
    };

    try {
      if (tableId) {
        const response = await axios.put(
          `${updateTable}/${tableId}`,
          tableData,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        if (response.data.status === true) {
          toast.success(response.data.message);
          navigate("/view-table");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(addTable, tableData, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        if (response.data.status === true) {
          toast.success(response.data.message);
          navigate("/view-table");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error("Failed to add table. Please try again.");
    }
  };

  return (
    <>
      <RestaurantSidebar />
      <main id="main" className="main">
        <RestaurantBreadcrumbs
          title={tableId ? "Edit Table" : "Add Table"}
          link="/view-table"
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
                          onChange={(e) => setTableNumber(e.target.value)}
                          value={tableNumber}
                          className="form-control"
                          id="floatingName"
                          placeholder="Table No"
                        />
                        <label htmlFor="floatingName">Table No</label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          onChange={(e) => setCapacity(e.target.value)}
                          value={capacity}
                          className="form-control"
                          id="floatingCapacity"
                          placeholder="Capacity"
                        />
                        <label htmlFor="floatingCapacity">Capacity</label>
                      </div>
                    </div>
                    <div className="">
                      <input
                        type="submit"
                        value={tableId ? "Update" : "Submit"}
                        className="btn btn-primary"
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

export default AddTable;
