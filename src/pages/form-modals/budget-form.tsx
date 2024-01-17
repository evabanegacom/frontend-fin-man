// BudgetForm.js

import React, { useState } from 'react';
import BudgetService from '../../services/budget-service';
// params.permit(:name, :purpose, :target_amount, :category, :target_date, :contribution_type, :contribution_amount, :user_id, :avatar)

const BudgetForm = () => {
  const [budget, setBudget] = useState({
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
    setBudget((prevBudget) => ({
      ...prevBudget,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(budget).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    try {
      await BudgetService.createBudget(formData);
      // Handle success, redirect, or perform additional actions
    } catch (error) {
      // Handle error
      console.error('Error creating budget:', error);
    }
  };

  return (
<form onSubmit={handleSubmit} className="flex flex-col">
      <label>
        name:
        <input type="text" name="name" value={budget.name} onChange={handleChange} />
      </label>

      <label>
        purpose:
        <textarea name="purpose" value={budget.purpose} onChange={handleChange} />
      </label>

      <label>
        target_amount:
        <input type="number" name="target_amount" value={budget.target_amount} onChange={handleChange} />
      </label>

        <select name='category' onChange={handleChange} value={budget?.category}>
                <option value="category">category</option>
                <option value="vacation">vacation</option>
                <option value="car">car</option>
                <option value="house">house</option>
                <option value="education">education</option>
                <option value="other">other</option>
        </select>

        <label>
            target_date:
            <input type="date" name="target_date" value={budget.target_date} onChange={handleChange} />
        </label>

       <select onChange={handleChange} name='contribution_type' value={budget?.contribution_type}>
              <option value="contribution_type">contribution_type</option>
              <option value="weekly">weekly</option>
              <option value="monthly">monthly</option>
              <option value="yearly">yearly</option>
       </select>

        <label>
            contribution_amount:
            <input type="number" name="contribution_amount" value={budget.contribution_amount} onChange={handleChange} />
        </label>

      {/* Add other form fields as needed */}

      <label>
        Avatar:
        <input type="file" name="avatar" onChange={handleChange} />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default BudgetForm;