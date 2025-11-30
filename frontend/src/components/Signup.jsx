import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../utils/axiosInstance";
import { useAuth } from "../context/Authprovider";

const Signup = () => {
  const { setAuthUser } = useAuth();
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const validatePasswordMatch = (value) =>
    value === password || "Passwords do not match";

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("confirmpassword", data.confirmpassword);
      formData.append("image", image);

      const response = await API.post("/api/user/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Signup successful! Please login.");

      // ❗ DO NOT auto-login after signup
      // Just redirect to login page
      setTimeout(() => navigate("/login", { replace: true }), 500);

    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center items-center h-screen">
        <fieldset className="fieldset bg-base-200 border rounded-box w-[400px] p-4">
          <h1 className="text-xl text-center font-bold">Sign Up</h1>

          <label className="label font-bold">Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("name", { required: true })}
          />
          {errors.name && <span className="text-red-600">Required</span>}

          <label className="label font-bold">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            {...register("email", { required: true })}
          />
          {errors.email && <span className="text-red-600">Required</span>}

          <label className="label font-bold">Password</label>
          <input
            type="password"
            className="input input-bordered w-full"
            {...register("password", { required: true })}
          />
          {errors.password && <span className="text-red-600">Required</span>}

          <label className="label font-bold">Confirm Password</label>
          <input
            type="password"
            className="input input-bordered w-full"
            {...register("confirmpassword", {
              required: true,
              validate: validatePasswordMatch,
            })}
          />
          {errors.confirmpassword && (
            <span className="text-red-600">
              {errors.confirmpassword.message}
            </span>
          )}

          <label className="label font-bold mt-2">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={(e) => setImage(e.target.files[0])}
          />

          {image && (
            <img
              src={URL.createObjectURL(image)}
              className="w-20 h-20 mt-2 rounded-full object-cover"
            />
          )}

          <input
            type="submit"
            value="Sign Up"
            className="btn btn-primary w-full mt-4"
          />

          <p className="text-center mt-3 text-sm">
            Already have an account?
            <Link to="/login" className="underline text-blue-500 ml-1">
              Login
            </Link>
          </p>
        </fieldset>
      </div>
    </form>
  );
};

export default Signup;
