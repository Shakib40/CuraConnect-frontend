import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      phoneNumber: "",
      role: "USER",
    },

    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be less than 20 characters")
        .required("Username is required"),

      firstname: Yup.string()
        .max(30, "First name must not exceed 30 characters")
        .required("First name is required"),

      lastname: Yup.string()
        .max(30, "Last name must not exceed 30 characters")
        .required("Last name is required"),

      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),

      phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
        .required("Phone number is required"),

      role: Yup.string().required("Role is required"),
    }),

    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await axios.post(
          "http://localhost:8080/api/auth/register",
          values
        );

        navigate("/login", { replace: true });
      } catch (err) {
        setErrors({
          email: err?.response?.data?.message || "Registration failed",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-950">
      <div className="mx-auto max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Register
        </h2>

        <form onSubmit={formik.handleSubmit} className="mt-4 space-y-3">

          {[
            { label: "Username", name: "username" },
            { label: "First Name", name: "firstname" },
            { label: "Last Name", name: "lastname" },
            { label: "Email", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" },
            { label: "Phone Number", name: "phoneNumber" },
          ].map((field) => (
            <div key={field.name}>
              <label className="text-sm text-gray-700 dark:text-gray-200">
                {field.label}
              </label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100"
              />
              {formik.touched[field.name] && formik.errors[field.name] && (
                <div className="text-sm text-red-600">
                  {formik.errors[field.name]}
                </div>
              )}
            </div>
          ))}

          {/* Role Dropdown */}
          <div>
            <label className="text-sm text-gray-700 dark:text-gray-200">
              Role
            </label>
            <select
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="mt-1 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100"
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Create Account
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-700 dark:text-gray-200">
          Have an account?{" "}
          <Link className="text-blue-600 hover:underline" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
