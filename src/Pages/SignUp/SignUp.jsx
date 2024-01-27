import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { createUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log(data);

      // Use await with createUser directly
      const result = await createUser(data.email, data.password);
      const user = result.user;
      console.log(user);

      // Make a POST request to your Django backend
      const response = await axios.post('http://127.0.0.1:8000/users/register/', data);

      // Handle the response as needed
      console.log('Form submitted:', response.data);

      navigate('/login');

      // You may want to redirect or perform other actions after successful submission
      // navigate('/login');
    } catch (error) {
      // Handle errors, log them, etc.
      console.error('Error submitting form:', error);
    }
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              {...register('username', { required: 'Username is required' })}
              className={`mt-1 p-2 w-full border rounded ${errors.username ? 'border-red-500' : ''}`}
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className={`mt-1 p-2 w-full border rounded ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-600">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              {...register('first_name', { required: 'First Name is required' })}
              className={`mt-1 p-2 w-full border rounded ${errors.first_name ? 'border-red-500' : ''}`}
            />
            {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-600">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              {...register('last_name', { required: 'Last Name is required' })}
              className={`mt-1 p-2 w-full border rounded ${errors.last_name ? 'border-red-500' : ''}`}
            />
            {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
              })}
              className={`mt-1 p-2 w-full border rounded ${errors.password ? 'border-red-500' : ''}`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password"
              {...register('confirm_password', {
                required: 'Confirm Password is required',
                validate: (value) => value === watch('password') || 'Passwords do not match',
              })}
              className={`mt-1 p-2 w-full border rounded ${errors.confirm_password ? 'border-red-500' : ''}`}
            />
            {errors.confirm_password && <p className="text-red-500 text-xs mt-1">{errors.confirm_password.message}</p>}
          </div>

          

          <div className="mb-4">
            <label htmlFor="mobile_number" className="block text-sm font-medium text-gray-600">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobile_number"
              {...register('mobile_number')}
              className={`mt-1 p-2 w-full border rounded ${errors.mobile_number ? 'border-red-500' : ''}`}
            />
            {errors.mobile_number && <p className="text-red-500 text-xs mt-1">{errors.mobile_number.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            disabled={!Object.keys(errors).length === 0}
          >
            Sign Up
          </button>

          <p className="mt-4 text-sm">
            Already have an account? <Link className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800" to="/login">Log In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
