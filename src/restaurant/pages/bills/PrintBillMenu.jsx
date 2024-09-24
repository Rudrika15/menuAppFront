import React from "react";
import RestaurantSidebar from "../../component/RestaurantSidebar";
import { useEffect, useState } from "react";
import RestaurantBreadcrumbs from "../../component/RestaurantBreadcrumbs";

const PrintBillMenu = () => {
  const [billData, setBillData] = useState([]);
  const [loader, setLoader] = useState(false);

  // Fetch bill data from API
  useEffect(() => {
    const fetchBillData = async () => {
      try {
        // const response = await axios.get("YOUR_API_ENDPOINT");
        // setBillData(response.data); // Assuming the response has bill items data
      } catch (error) {
        console.error("Error fetching bill data:", error);
      }
    };

    fetchBillData();
  }, []);

  const calculateTotal = () => {
    return billData.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  const handlePrint = () => {
    window.print();
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
              <div className="col-md-4 offset-md-2">
                <h2>Print Bill</h2>
                <div className="border p-3" id="bill-print">
                  <h3>Restaurant Bill</h3>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {billData.map((item, index) => (
                        <tr key={index}>
                          <td>{item.itemName}</td>
                          <td>{item.quantity}</td>
                          <td>₹{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <h4>Total: ₹{calculateTotal()}</h4>
                </div>
                <button className="btn btn-primary mt-3" onClick={handlePrint}>
                  Print Bill
                </button>
              </div>
              <div className="col-md-4 offset-md-2">
                <h2>Print Bill</h2>
                <div className="border p-3" id="bill-print">
                  <h3>Restaurant Bill</h3>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {billData.map((item, index) => (
                        <tr key={index}>
                          <td>{item.itemName}</td>
                          <td>{item.quantity}</td>
                          <td>₹{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <h4>Total: ₹{calculateTotal()}</h4>
                </div>
                <button className="btn btn-primary mt-3" onClick={handlePrint}>
                  Print Bill
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default PrintBillMenu;
