import React from "react";
import { Formik, validateYupSchema } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

function Login() {
  const router = useRouter();

  return (
    <Formik
      validationSchema={schema}
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values) => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
          let response = await res.json();
          if (response.success) {
            alert("Successfully Logged In");
            await localStorage.setItem("msg", "success");
            router.push("/home");
          } else {
            alert("Login failed");
          }
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <section className="Login">
          <form
            className="lg:w-1/2 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 items-center"
            onSubmit={handleSubmit}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-6 LoginInputs">
                  <div className="row LoginLogo">
                    <p className="text-4xl	 font-medium	 text-blue-700 w-auto ">
                      Jumji
                    </p>
                    <p className="w-auto font-medium">
                      Champion Your Amazon Business
                    </p>
                  </div>
                  <div className="LoginInput">
                    <div className=" relative mb-4">
                      <label
                        htmlFor="email"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                      <p className="error text-red-500">
                        {errors.email && touched.email && errors.email}
                      </p>
                    </div>
                    <div className="relative mb-4">
                      <label
                        htmlFor="full-name"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                      <p className="error text-red-500">
                        {errors.password && touched.password && errors.password}
                      </p>
                    </div>
                  </div>
                  <div className="LoginSubmit">
                    <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                      Login
                    </button>
                    <p className="">
                      New User ?{" "}
                      <span className="text-blue-500">
                        <button
                          onClick={() => {
                            router.push("/signup");
                          }}
                        >
                          Signup
                        </button>
                      </span>
                    </p>
                  </div>
                </div>
                <div className="col-md-6 LoginImage">
                  <img src="" />
                </div>
              </div>
            </div>
          </form>
        </section>
      )}
    </Formik>
  );
}

export default Login;
