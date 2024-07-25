import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordRepeat) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/registeruser', {
        username,
        email,
        password
      });
      if (response.status === 201) {
        toast.success('User registered successfully');
        setUsername('');
        setEmail('');
        setPassword('');
        setPasswordRepeat('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error registering:', error);
      toast.error('Error registering user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper justify-center h-screen flex bg-emerald-100 font-sans">
      <div className="form-wrapper bg-white p-10 m-auto w-1/3 shadow rounded-lg">
        <h2 className="text-4xl font-bold py-2 mb-1 text-black-900 ">Sign Up</h2>
        <p className=" text-sm font-normal text-gray-500 dark:text-gray-400">Create your account & maintain your daily routine</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 justify-center items-center">
          <input type="hidden" name="type" value="register" />

          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full px-3 py-2 m-2 border-b-2 border-gray-400 focus:outline-none placeholder:text-gray-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="E-mail"
            className="w-full px-3 py-2 m-2 border-b-2 border-gray-400 focus:outline-none placeholder:text-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-3 py-2 m-2 border-b-2 border-gray-400 focus:outline-none placeholder:text-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            name="passwordRepeat"
            placeholder="Repeat Password"
            className="w-full px-3 py-2 m-2 border-b-2 border-gray-400 focus:outline-none placeholder:text-gray-300"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full mt-5 px-3 py-2 bg-blue-600 text-white hover:bg-sky-700 active:bg-sky-900 flex items-center justify-center"
            disabled={loading}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {loading ? 'Processing...' : 'Register'}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;
