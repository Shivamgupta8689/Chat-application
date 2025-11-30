import React from 'react';
import { useForm } from "react-hook-form";
import { useAuth } from '../context/Authprovider';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../utils/axiosInstance';

const Login = () => {
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await API.post("/api/user/login", userInfo);

      if (response.data?.user) {
        toast.success("Login Successful!");

        // Store in expected format
        const userData = { user: response.data.user };

        localStorage.setItem("messenger", JSON.stringify(userData));
        setAuthUser(userData);

        // Small delay to update state before redirect
        setTimeout(() => navigate("/", { replace: true }), 100);

      } else {
        toast.error("Invalid response from server");
      }

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data?.message || "Login failed");
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="border-black">
        <div className="flex justify-center items-center h-screen">
          <fieldset className="fieldset bg-base-200 border-black rounded-box w-[400px] border p-4">
            <h1 className="text-xl text-center">Login</h1>

            <label className="label">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Enter Email"
              {...register("email", { required: true })} />
            {errors.email && <span className='text-red-600'>**This field is required**</span>}

            <label className="label">Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Enter Password"
              {...register("password", { required: true })} />
            {errors.password && <span className='text-red-600'>**This field is required**</span>}

            <input type="submit" value="Login" className='btn btn-primary w-full mt-3' />

            <p className="text-center mt-3">
              Don't have an account?
              <Link to="/signup" className="text-blue-500 underline ml-1 text-sm">
                signup
              </Link>

              <Link to="/forgotPassword" className="text-blue-500 underline ml-3 text-sm">
                forgot password
              </Link>
            </p>
          </fieldset>
        </div>
      </form>
    </div>
  );
};

export default Login;
