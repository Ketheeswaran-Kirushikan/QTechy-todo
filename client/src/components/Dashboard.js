import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import AddTaskModal from './AddTaskModal';
import DeleteTaskModal from './DeleteTaskModal';
import CompleteTaskModal from './CompleteTaskModal';
import EditTaskModal from './EditTaskModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  const toggleDeleteModal = (task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const toggleCompleteModal = (task) => {
    setSelectedTask(task);
    setIsCompleteModalOpen(!isCompleteModalOpen);
  };

  const toggleEditModal = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/todos/deletetodo/${selectedTask._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (response.status === 200) {
        toast.success('Task deleted');
        fetchData();
      } else {
        toast.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Error deleting task');
    }
    setIsDeleteModalOpen(false);
    setSelectedTask(null);
  };

  const handleComplete = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/todos/updatestatus/${selectedTask._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      if (response.status === 200) {
        toast.success('Task marked as complete');
        fetchData();
      } else {
        toast.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Error updating task');
    }
    setIsCompleteModalOpen(false);
    setSelectedTask(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`http://localhost:5000/api/todos/gettodos/${user._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        console.log('Todos fetched from server:', response.data);
        setTasks(response.data);
      })
      .catch((err) => console.log('Error fetching todos:', err));
  };

  return (
    <div>
      <Navbar user={user} />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4 font-sans">
        <div className="sticky top-0 bg-white dark:bg-gray-900 shadow-md p-4 z-50 md:static">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-0">Your todo list</h1>
            <div className="flex items-center mb-4 sm:mb-0">
              <input
                type="text"
                placeholder="Search Todo . . ."
                value={searchTerm}
                onChange={handleSearch}
                className="px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-white w-full sm:w-96 focus:outline-none focus:ring-0"
              />
              <SearchIcon className="ml-2 text-gray-500 dark:text-gray-400 cursor-pointer" />
            </div>
            <div className="flex items-center">
              <span className="text-gray-900 dark:text-white mr-2">Add task</span>
              <AddBoxRoundedIcon
                onClick={toggleAddModal}
                style={{ fontSize: 50 }}
                className="text-blue-500 dark:text-blue-400 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-800 rounded-full p-1"
              />
            </div>
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
           To Do list
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              Maintain your daily activities and tasks here...
            </p>
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Task name
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Created date
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {task.taskName}
                </th>
                <td className="px-6 py-4">{task.status}</td>
                <td className="px-6 py-4">{new Date(task.createdDate).toLocaleDateString()}</td>
                <td className="px-6 py-4">{task.category}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    className={`mr-4 ${task.status === 'Completed' ? 'text-gray-500 cursor-not-allowed' : 'text-green-600 dark:text-green-400'}`}
                    onClick={() => toggleCompleteModal(task)}
                    disabled={task.status === 'Completed'}
                  >
                    Complete
                  </button>
                  <button className="text-blue-600 dark:text-blue-400 mr-4" onClick={() => toggleEditModal(task)}>Edit</button>
                  <button className="text-red-600 dark:text-red-400" onClick={() => toggleDeleteModal(task)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddTaskModal isOpen={isAddModalOpen} toggleModal={toggleAddModal} user={user} />
      <CompleteTaskModal isOpen={isCompleteModalOpen} toggleModal={toggleCompleteModal} onComplete={handleComplete} />
      <DeleteTaskModal isOpen={isDeleteModalOpen} toggleModal={toggleDeleteModal} onDelete={handleDelete} />
      <EditTaskModal isOpen={isEditModalOpen} toggleModal={() => toggleEditModal(null)} task={selectedTask} user={user} />
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
