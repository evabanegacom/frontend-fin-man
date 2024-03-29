import React, { useState } from 'react';
import SavingsService from '../../services/saving-services';

const SavingsForm = () => {
  const [saving, setSaving] = useState({
    name: '',
    purpose: '',
    target_amount: '',
    category: '',
    target_date: '',
    contribution_type: '',
    contribution_amount: '',
    user_id: 1,
    avatar: null,
  });

  const handleChange = (e:any) => {
    const { name, value, files } = e.target;
    setSaving((prevSaving) => ({
      ...prevSaving,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(saving).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    try {
      await SavingsService.createSaving(formData);
      // Handle success, redirect, or perform additional actions
    } catch (error) {
      // Handle error
      console.error('Error creating budget:', error);
    }
  };

  return (
    // <form onSubmit={handleSubmit} className="flex flex-col">
    //   <label>
    //     name:
    //     <input type="text" name="name" value={saving.name} onChange={handleChange} />
    //   </label>

    //   <label>
    //     purpose:
    //     <textarea name="purpose" value={saving.purpose} onChange={handleChange} />
    //   </label>

    //   <label>
    //     target_amount:
    //     <input type="number" name="target_amount" value={saving.target_amount} onChange={handleChange} />
    //   </label>

    //     <select name='category' onChange={handleChange} value={saving?.category}>
    //             <option value="category">category</option>
    //             <option value="vacation">vacation</option>
    //             <option value="car">car</option>
    //             <option value="house">house</option>
    //             <option value="education">education</option>
    //             <option value="other">other</option>
    //     </select>

    //     <label>
    //         target_date:
    //         <input type="date" name="target_date" value={saving.target_date} onChange={handleChange} />
    //     </label>

    //    <select onChange={handleChange} name='contribution_type' value={saving?.contribution_type}>
    //           <option value="contribution_type">contribution_type</option>
    //           <option value="weekly">weekly</option>
    //           <option value="monthly">monthly</option>
    //           <option value="yearly">yearly</option>
    //    </select>

    //     <label>
    //         contribution_amount:
    //         <input type="number" name="contribution_amount" value={saving.contribution_amount} onChange={handleChange} />
    //     </label>

    //   {/* Add other form fields as needed */}

    //   <label>
    //     Avatar:
    //     <input type="file" name="avatar" onChange={handleChange} />
    //   </label>

    //   <button type="submit">Submit</button>
    // </form>

    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

  <div className="mb-6">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
      Name:
    </label>
    <input 
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
      id="name" 
      type="text" 
      placeholder="Name" 
      name="name" 
      value={saving.name} 
      onChange={handleChange}
    />
  </div>

  <div className="mb-6">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="purpose">
      Purpose:
    </label>
    <textarea 
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
      id="purpose" 
      placeholder="Purpose" 
      name="purpose" 
      value={saving.purpose} 
      onChange={handleChange}
    />
  </div>

  <div className="mb-6">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="target_amount">
      Target Amount:
    </label>
    <input 
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
      id="target_amount" 
      type="number" 
      placeholder="Target Amount" 
      name="target_amount" 
      value={saving.target_amount} 
      onChange={handleChange}
    />
  </div>

  <div className="mb-6">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
      Category:
    </label>
    <select 
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
      name="category" 
      onChange={handleChange} 
      value={saving?.category}
    >
      <option value="category">Category</option>
      <option value="vacation">Vacation</option>
      <option value="car">Car</option>
      <option value="house">House</option>
      <option value="education">Education</option>
      <option value="other">Other</option>
    </select>
  </div>

  <div className="mb-6">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="target_date">
      Target Date:
    </label>
    <input 
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
      id="target_date" 
      type="date" 
      name="target_date" 
      value={saving.target_date} 
      onChange={handleChange}
    />
  </div>

  <div className="mb-6">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contribution_type">
      Contribution Type:
    </label>
    <select 
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
      name="contribution_type" 
      onChange={handleChange} 
      value={saving?.contribution_type}
    >
      <option value="contribution_type">Contribution Type</option>
      <option value="weekly">Weekly</option>
      <option value="monthly">Monthly</option>
      <option value="yearly">Yearly</option>
    </select>
  </div>

  <div className="mb-6">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contribution_amount">
      Contribution Amount:
    </label>
    <input 
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
      id="contribution_amount" 
      type="number" 
      placeholder="Contribution Amount" 
      name="contribution_amount" 
      value={saving.contribution_amount} 
      onChange={handleChange}
    />
  </div>

  <div className="mb-6">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="avatar">
      Avatar:
    </label>
    <input 
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
      id="avatar" 
      type="file" 
      name="avatar" 
      onChange={handleChange}
    />
  </div>

  <div className="mb-6">
    <button 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
      type="submit"
    >
      Submit
    </button>
  </div>
</form>

  );
};

export default SavingsForm;