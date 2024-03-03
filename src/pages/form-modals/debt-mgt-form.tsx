import React, { useState } from 'react';
import DebtMgtsService from '../../services/debt-mgt-service';
import { useSelector } from 'react-redux';

const DebtMgtForm = () => {
  const user_id = useSelector((state: any) => state?.reducer?.auth?.user?.id);
  const [saving, setSaving] = useState({
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
    setSaving((prevSaving) => ({
      ...prevSaving,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(saving).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    try {
      await DebtMgtsService.createDebtMgt(formData);
      // Handle success, redirect, or perform additional actions
    } catch (error) {
      // Handle error
      console.error('Error creating budget:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Name:
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="name" onChange={handleChange} placeholder="Enter your name" />


      <label className="block text-gray-700 text-sm font-bold mb-2">
        Purpose:
      </label>
      <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="purpose" onChange={handleChange} placeholder="Purpose"></textarea>


      <label className="block text-gray-700 text-sm font-bold mb-2">
        Target amount:
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="target_amount" onChange={handleChange} placeholder="Enter debt amount" />

      <select name='category' onChange={handleChange} value={saving?.category}>
        <option value="category">category</option>
        <option value="vacation">vacation</option>
        <option value="car">car</option>
        <option value="house">house</option>
        <option value="education">education</option>
        <option value="other">other</option>
      </select>

      <label>
        target_date:
        <input type="date" name="target_date" required onChange={handleChange} />
      </label>

      <select onChange={handleChange} name='contribution_type' value={saving?.contribution_type}>
        <option value="contribution_type">contribution_type</option>
        <option value="weekly">weekly</option>
        <option value="monthly">monthly</option>
        <option value="yearly">yearly</option>
      </select>

      <label>
        contribution_amount:
        <input type="number" name="contribution_amount" required onChange={handleChange} />
      </label>

      <label>
        Avatar:
        <input type="file" name="avatar" onChange={handleChange} />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default DebtMgtForm;