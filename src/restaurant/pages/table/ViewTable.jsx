import React, { useEffect, useState } from "react";
import RestaurantSidebar from "../../component/RestaurantSidebar";
import RestaurantBreadcrumbs from "../../component/RestaurantBreadcrumbs";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl, getTableList, deleteTables } from "../../../api/Api";
import { Link } from "react-router-dom";
import QRCode from "qrcode.react";
import Swal from "sweetalert2"; // Import SweetAlert2

const ViewTable = () => {
  const [tables, setTables] = useState([]);
  const [loader, setLoader] = useState(true);
  const restaurantName = localStorage.getItem("restName") || "default"; // Default value if not set

  const getTables = async () => {
    try {
      const response = await axios.get(getTableList, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      if (response.data.status === true) {
        if (response.data.data) {
          const tableDataWithQr = response.data.data.map((table) => {
            const qrCodeUrl = `${baseUrl}${localStorage.getItem("id")}/${table.id}`;
            return { ...table, qrCodeUrl };
          });
          setTables(tableDataWithQr);
        }
      }
    } catch (error) {
      toast.error("API call failed!");
    } finally {
      setLoader(false);
    }
  };

  const deleteTable = async (id) => {
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
          const response = await axios.delete(deleteTables + id, {
            headers: {
              token: localStorage.getItem("token"),
            },
          });
          if (response.data.status === true) {
            toast.success("Table deleted successfully!");
            getTables();
          } else {
            toast.error(response.data.message || "Failed to delete table!");
          }
        } catch (error) {
          toast.error("API call failed! Please try again later.");
        }
      }
    });
  };

  useEffect(() => {
    getTables();
  }, []);

  return (
    <>
      <RestaurantSidebar />
      <main id="main" className="main">
        <RestaurantBreadcrumbs
          title="View Table"
          link="/add-new-table"
          linkTitle="Add New Table"
        />
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body pt-5">
                  {loader ? (
                    <div className="d-flex justify-content-center">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Table Name</th>
                          <th>Capacity</th>
                          <th>Option</th>
                          <th>QR Code</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tables.map((table) => (
                          <tr key={table.id}>
                            <td>{table.tableNumber}</td>
                            <td>{table.capacity}</td>
                            <td>
                              <Link to={`/${restaurantName}/edit-table/${table.id}`}>
                                <i className="bi bi-pen bg-primary text-white fs-5 p-2 me-2"></i>
                              </Link>
                              <Link onClick={() => deleteTable(table.id)}>
                                <i className="bi bi-trash bg-danger text-white fs-5 p-2 me-2"></i>
                              </Link>
                            </td>
                            <td>
                              <QRCode
                                value={table.qrCodeUrl}
                                size={64} // You can adjust the size as needed
                              />
                            </td>
                          </tr>
                        ))}
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

export default ViewTable;
