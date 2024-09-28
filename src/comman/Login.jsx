import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router
import { login } from "../api/Api"; // Ensure `login` is a string URL
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const validate = () => {
    let errors = {};
    if (!email) {
      toast.error("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email address");
    }
    if (!password) {
      toast.error("Password is required");
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await fetch(login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to log in");
      }

      const data = await response.json();
      console.log(data);

      if (data.status === true) {
        const token = data.token;
        localStorage.setItem("token", token);
        console.log(token, "start log in token");
        localStorage.setItem("name", data.data.name);
        localStorage.setItem("id", data.data.id);
        toast.success("Login successful");
        navigate("/add-new-staff");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setErrors({ apiError: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container py-5">
        <div className="py-5 wrapper d-flex align-items-center justify-content-center h-100">
          <div className="py-2 card login-form">
            <div className="card-body">
              <h5 className="card-title text-center">Login</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>

                <div className="sign-up mt-4">
                  Don't have an account? <a href="#">Create One</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
