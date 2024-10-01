import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Footer from "./admin/component/Footer";
import { AddCategory } from "./restaurant/pages/category/AddCategory";
import ViewCategory from "./restaurant/pages/category/ViewCategoty";
import EditCategory from "./restaurant/pages/category/EditCategory";
import AddStaff from "./restaurant/pages/staff/AddStff";
import ViewStaff from "./restaurant/pages/staff/ViewStaff";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddTable from "./restaurant/pages/table/AddTable";
import ViewTable from "./restaurant/pages/table/ViewTable";
import Login from "./comman/Login";
import TrashCategory from "./restaurant/pages/category/TrashCategory";
import TrashStaff from "./restaurant/pages/staff/TrashStaff";
import TrashTable from "./restaurant/pages/table/TrashTable";
import View from "./restaurant/pages/menu/View";
import { useEffect } from "react";
import AddMenu from "./restaurant/pages/menu/AddMenu";
import TrashMenu from "./restaurant/pages/menu/TrashMenu";
import PrintBillMenu from "./restaurant/pages/bills/PrintBillMenu";

function App() {
  const restaurantName = localStorage.getItem("restName") || "default";

  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  const PrivateRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/" replace />;
  };

  useEffect(() => {
    document.body.classList.remove("toggle-sidebar");
  }, []);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Routes */}
        <Route path="/" element={<Login />} />

        {/* Staff Routes */}
        <Route
          path={`/${restaurantName}/add-new-staff`}
          element={<PrivateRoute element={<AddStaff />} />}
        />
        <Route
          path={`/${restaurantName}/staff/:id`}
          element={<PrivateRoute element={<AddStaff />} />}
        />
        <Route
          path={`/${restaurantName}/view-staff`}
          element={<PrivateRoute element={<ViewStaff />} />}
        />
        <Route
          path={`/${restaurantName}/trash-staff`}
          element={<PrivateRoute element={<TrashStaff />} />}
        />

        {/* Categories */}
        <Route
          path={`/${restaurantName}/add-new-category`}
          element={<PrivateRoute element={<AddCategory />} />}
        />
        <Route
          path={`/${restaurantName}/view-category`}
          element={<PrivateRoute element={<ViewCategory />} />}
        />
        <Route
          path={`/${restaurantName}/edit-category/:id`}
          element={<PrivateRoute element={<AddCategory />} />}
        />
        <Route
          path={`/${restaurantName}/trash-category`}
          element={<PrivateRoute element={<TrashCategory />} />}
        />

        {/* Table Routes */}
        <Route
          path={`/${restaurantName}/add-new-table`}
          element={<PrivateRoute element={<AddTable />} />}
        />
        <Route
          path={`/${restaurantName}/view-table`}
          element={<PrivateRoute element={<ViewTable />} />}
        />
        <Route
          path={`/${restaurantName}/edit-table/:tableId`}
          element={<PrivateRoute element={<AddTable />} />}
        />
        <Route
          path={`/${restaurantName}/trash-table`}
          element={<PrivateRoute element={<TrashTable />} />}
        />

        {/* Menu Routes */}
        <Route
          path={`/${restaurantName}/view-menu`}
          element={<PrivateRoute element={<View />} />}
        />
        <Route
          path={`/${restaurantName}/add-menu`}
          element={<PrivateRoute element={<AddMenu />} />}
        />
        <Route
          path={`/${restaurantName}/trash-menu`}
          element={<PrivateRoute element={<TrashMenu />} />}
        />
        <Route
          path={`/${restaurantName}/edit-menu/:id`}
          element={<PrivateRoute element={<AddMenu />} />}
        />

        {/* Bill Routes */}
        <Route
          path={`/${restaurantName}/bill`}
          element={<PrivateRoute element={<PrintBillMenu />} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
