import React, { useState } from 'react';
import BudgetService from '../../services/budget-service';
import Loader from '../../constants/Loader';
import { useSelector } from 'react-redux';

const BudgetForm = () => {
  const user_id = useSelector((state: any) => state?.reducer?.auth?.user?.id);

  const [loading, setLoading] = useState(false);
  const [budget, setBudget] = useState({
    name: '',
    purpose: '',
    target_amount: '',
    category: '',
    target_date: '',
    contribution_type: '',
    contribution_amount: '',
    user_id: user_id,
    avatar: null,
  });

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setBudget((prevBudget) => ({
      ...prevBudget,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    Object.entries(budget).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    try {
      const response = await BudgetService.createBudget(formData);
      console.log(response)
      // Handle success, redirect, or perform additional actions
    } catch (error) {
      // Handle error
      console.log(error)
      console.error('Error creating budget:', error);
    } finally {
      setLoading(false); // Set loading state to false regardless of success or failure
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-gray-700 shadow-md rounded-lg">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-100 font-bold mb-2">Budget name:</label>
        <input required type="text" id="name" name="name" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
      </div>

      <div className="mb-4">
        <label htmlFor="purpose" className="block text-gray-100 font-bold mb-2">Purpose:</label>
        <textarea required id="purpose" name="purpose" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
      </div>

      <div className="mb-4">
        <label htmlFor="target_amount" className="block text-gray-100 font-bold mb-2">Budget amount</label>
        <input type="number" id="target_amount" name="target_amount" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-100 font-bold mb-2">Category:</label>
        <select id="category" name="category" onChange={handleChange} value={budget.category} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500">
          <option value="">Select budget category</option>
          <option value="vacation">Vacation</option>
          <option value="car">Car</option>
          <option value="house">House</option>
          <option value="education">Education</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="target_date" className="block text-gray-100 font-bold mb-2">Date of completion</label>
        <input required type="date" id="target_date" name="target_date" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
      </div>

      <div className="mb-4">
        <label htmlFor="contribution_type" className="block text-gray-100 font-bold mb-2">Frequency of use</label>
        <select id="contribution_type" name="contribution_type" onChange={handleChange} value={budget.contribution_type} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500">
          <option value="">Select spending frequency</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="contribution_amount" className="block text-gray-100 font-bold mb-2">Usage amount based on frequency</label>
        <input min={0} type="number" id="contribution_amount" name="contribution_amount" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
      </div>

      <div className="mb-4">
        <label htmlFor="avatar" className="block text-gray-100 font-bold mb-2">Avatar:(optional)</label>
        <input type="file" id="avatar" name="avatar" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
      </div>

      <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 transition duration-200">{loading ? <Loader /> : 'Submit'}</button>
    </form>


  );
};

export default BudgetForm;