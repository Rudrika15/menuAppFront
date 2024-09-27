import React, { useEffect, useState, useRef } from "react";
import RestaurantSidebar from "../../component/RestaurantSidebar";
import RestaurantBreadcrumbs from "../../component/RestaurantBreadcrumbs";
import { getBillvalue } from "../../../api/Api";
import axios from "axios";

const PrintBillMenu = () => {
  const [billData, setBillData] = useState([]);
  const [loader, setLoader] = useState(false);
  const printRefs = useRef([]); // Create an array of refs for each bill

  // Fetch bill data from API
  useEffect(() => {
    const fetchBillData = async () => {
      setLoader(true); // Show loader while fetching
      try {
        const response = await axios.get(getBillvalue, {
          headers: {
            // token: localStorage.getItem("token"),

            token:
              "5d7915a377634567c446db126c9caf645211187c8ed909180835db468227b9c9",
          },
        });

        if (response.data.status == true) {
          if (response.data.data) {
            setBillData(response?.data?.data);
          }
        }
      } catch (error) {
        console.error("Error fetching bill data:", error);
      } finally {
        setLoader(false); // Hide loader after fetching
      }
    };

    fetchBillData();
  }, []);

  const handlePrint = (index) => {
    const printContent = printRefs.current[index];
    if (printContent) {
      const originalContent = document.body.innerHTML;
      document.body.innerHTML = printContent.innerHTML; // Temporarily replace page content
      window.print();
      document.body.innerHTML = originalContent; // Restore original page content
      window.location.reload(); // Reload page to reattach event listeners and restore state
    }
  };

  return (
    <>
      <main id="main" className="main">
        <RestaurantSidebar />
        <RestaurantBreadcrumbs title="Print Bill" linkTitle="Back" link="#" />

        {/* Main Content */}
        {loader ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="col-md-10">
            <div className="row">
              {billData.map((bill, index) => (
                <div key={bill.id} className="col-md-4 offset-md-2 mb-4">
                  <div
                    className="border p-3"
                    ref={(el) => (printRefs.current[index] = el)}
                  >
                    <h3>Restaurant Bill</h3>
                    <h4>Table Number: {bill.tableNumber}</h4>
                    <h5>Customer Name: {bill.get_orders[0]?.name || "N/A"}</h5>
                    <h6>
                      Contact Number:{" "}
                      {bill.get_orders[0]?.contactNumber || "N/A"}
                    </h6>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Quantity</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bill.get_orders.flatMap((order) =>
                          order.order_details.map((item) => (
                            <tr key={item.id}>
                              <td>{item.menu.title}</td>
                              <td>{item.qty}</td>
                              <td>₹{item.menu.price}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                    <h4>
                      Total: ₹
                      {bill.get_orders
                        .flatMap((order) =>
                          order.order_details.map(
                            (item) => item.qty * item.menu.price
                          )
                        )
                        .reduce((total, price) => total + price, 0)}
                    </h4>
                  </div>
                  <button
                    className="btn btn-primary mt-3"
                    onClick={() => handlePrint(index)}
                  >
                    Print Bill #{bill.id}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default PrintBillMenu;
