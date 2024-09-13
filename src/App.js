import {
  BrowserRouter as Router,
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

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  const PrivateRoute = ({ element: Component, ...rest }) => {
    return isAuthenticated() ? Component : <Navigate to="/" />;
  };

  return (
    <Router>
      <ToastContainer />
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />
        {/* Protected Routes */}
        <Route
          path="/add-new-staff"
          element={<PrivateRoute element={<AddStaff />} />}
        />

        {/* edit route */}
        <Route
          path="/staff/:id"
          element={<PrivateRoute element={<AddStaff />} />}
        />
        {/* Reusing AddStaff component */}
        <Route
          path="/view-staff"
          element={<PrivateRoute element={<ViewStaff />} />}
        />
        <Route
          path="/trash-staff"
          element={<PrivateRoute element={<TrashStaff />} />}
        />
        <Route
          path="/add-new-category"
          element={<PrivateRoute element={<AddCategory />} />}
        />
        <Route
          path="/view-category"
          element={<PrivateRoute element={<ViewCategory />} />}
        />
        <Route
          path="/edit-category/:categoryId"
          element={<PrivateRoute element={<EditCategory />} />}
        />
        <Route
          path="/trash-category"
          element={<PrivateRoute element={<TrashCategory />} />}
        />
        <Route
          path="/add-new-table"
          element={<PrivateRoute element={<AddTable />} />}
        />
        <Route
          path="/view-table"
          element={<PrivateRoute element={<ViewTable />} />}
        />
        <Route
          path="/Trash-table"
          element={<PrivateRoute element={<TrashTable />} />}
        />
        <Route
          path="/view-menu"
          element={<PrivateRoute element={<View />} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
