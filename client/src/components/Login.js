import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        toast.success('Login successful');
        setUser(response.data.user);
        navigate('/dashboard');
      } else {
        toast.error('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Error logging in');
    }
  };

  return (
    <div className="flex flex-col md:flex-row p-2 h-screen bg-emerald-100 font-sans">
      <div className="max-w-md m-auto md:w-1/2">
        <h1 className="text-4xl text-center mb-5">My todo list</h1>
        <p className="text-1xl text-center">Maintain your tasks and notes</p>
        <div className="border p-5 my-5 rounded bg-white flex flex-col justify-center items-center drop-shadow-2xl">
          <form onSubmit={handleSubmit}>
            <div className=''>
              <label className="block mb-2">Username</label>
              <input
                type="text"
                className="border rounded py-2 px-3 w-full focus:outline-none focus:shadow-outline md:w-32 lg:w-96"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="py-2">
              <label className="block mb-2">Password</label>
              <input
                type="password"
                className="border rounded py-2 px-3 w-full focus:outline-none focus:shadow-outline md:w-32 lg:w-96"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="py-2">
              <button
                type="submit"
                className="w-full rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-solid border-2 border-blue-600 tracking-wide md:w-32 lg:w-96"
              >
                Login
              </button>
              <Link to="/register">
                <p className="text-1xl text-center mt-5 text-sky-900">Register your account</p>
              </Link>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;
