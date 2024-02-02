import React, { useState } from 'react';
import IncomeService from '../../services/income-service';

const IncomeForm = () => {
  const [income, setIncome] = useState({
    name: '',
    category: '',
    income_frequency: '',
    user_id: 1,
    avatar: null,
  });

  const handleChange = (e:any) => {
    const { name, value, files } = e.target;
    setIncome((prevIncome) => ({
      ...prevIncome,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(income).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    try {
      await IncomeService.createIncome(formData);
      // Handle success, redirect, or perform additional actions
    } catch (error) {
      // Handle error
      console.error('Error creating income:', error);
    }
  };

  return (
<form onSubmit={handleSubmit} className="flex flex-col">
      <label>
        name:
        <input type="text" name="name" value={income.name} onChange={handleChange} />
      </label>

        <select name='category' onChange={handleChange} value={income?.category}>
                <option value="category">category</option>
                <option value="vacation">vacation</option>
                <option value="car">car</option>
                <option value="house">house</option>
                <option value="education">education</option>
                <option value="other">other</option>
        </select>


       <select onChange={handleChange} name='contribution_type' value={income?.income_frequency}>
              <option value="contribution_type">contribution_type</option>
              <option value="weekly">weekly</option>
              <option value="monthly">monthly</option>
              <option value="yearly">yearly</option>
       </select>

      {/* Add other form fields as needed */}

      <label>
        Avatar:
        <input type="file" name="avatar" onChange={handleChange} />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default IncomeForm;