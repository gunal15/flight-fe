import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { config } from "../config";

function Register() {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      username: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.username) {
        errors.username = "Please enter username";
      }
      if (!values.password) {
        errors.password = "Please enter password";
      }
      if (!values.email) {
        errors.email = "Please enter username";
      }
      if (!values.name) {
        errors.name = "Please enter password";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`${config.api}/api/auth/register`, values);
        alert(res.data.message);

        if (res.status === 200) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <h2 className="text-center mt-5">Ease My Trip</h2>
      <div className="container">
  <div className="row m-5 no-gutters shadow-lg">
    <div className="col-md-6 d-none d-md-block" style={{ padding: 0 }}>
      <img
        src="https://images.all-free-download.com/images/graphiclarge/aircraft_flight_image_06_hd_pictures_166323.jpg"
        className="img-fluid"
        alt="image"
        style={{ height: "100%", objectFit: "cover", objectPosition: "right" }}
      />
    </div>
    <div className="col-md-6 bg-white p-5">
      <h3 className="pb-3">Register Form</h3>
      <div className="form-style">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group pb-3">
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              style={{ borderRadius: "10px" }}
            />
          </div>
          <div className="form-group pb-3">
            <input
              type="text"
              placeholder="Username"
              className="form-control"
              id="username"
              aria-describedby="emailHelp"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              style={{ borderRadius: "10px" }}
            />
          </div>
          <div className="form-group pb-3">
            <input
              type="text"
              placeholder="Email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              style={{ borderRadius: "10px" }}
            />
          </div>
          <div className="form-group pb-3">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              style={{ borderRadius: "10px" }}
            />
          </div>

          <div className="pb-2">
            <button
              type="submit"
              className="btn btn-dark w-100 font-weight-bold mt-2"
              style={{ borderRadius: "10px" }}
            >
              Submit
            </button>
          </div>
        </form>

        <div className="pt-4 text-center">
          Already have an account?{" "}
          <Link to={"/"} style={{ color: "#333", fontWeight: "bold" }}>
            Login
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>


    </>
  );
}

export default Register;
