import React, { useState } from 'react';
import DebtMgtsService from '../../services/debt-mgt-service';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../constants/Loader';
import { getCurrentDate } from '../../constants';


interface Props {
  userDebt: () => void;
}

const DebtMgtForm:React.FC<Props> = ({userDebt}) => {
  const user_id = useSelector((state: any) => state?.reducer?.auth?.user?.id);
  const [ loading, setLoading ] = useState(false)
  const [saving, setSaving] = useState<any>({
    name: '',
    purpose: '',
    target_amount: '',
    category: '',
    target_date: '',
    contribution_type: '',
    contribution_amount: '',
    user_id: user_id,
    avatar: null,
    interest_rate: 0.0
  });

  const validate = saving?.name === '' || saving?.purpose === '' || saving?.target_amount === '' || saving?.category === '' || saving?.target_date === '' || saving?.contribution_type === '' || saving?.contribution_amount === '' || saving?.user_id === '';

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setSaving((prevSaving:any) => ({
      ...prevSaving,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    Object.entries(saving).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    console.log(formData)
    try {
      await DebtMgtsService.createDebtMgt(formData);
      // Handle success, redirect, or perform additional actions
      toast.success('Debt recorded successfully')
      userDebt()
    } catch (error) {
      // Handle error
      console.error('Error creating budget:', error);
    } finally {
      setLoading(false); // Set loading state to false regardless of success or failure
    }
  };

  return (
    <>
    <ToastContainer />
<form onSubmit={handleSubmit} className="bg-gray-900 flex flex-col w-full lg:w-1/2 mx-auto p-6 rounded-lg shadow-md">

      <label className="block text-gray-400 text-sm font-bold mb-1 mt-3">
        Name of Debt Owner:
      </label>
      <input required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline" type="text" name="name" onChange={handleChange} placeholder="Enter name" />

      <label className="block text-gray-400 text-sm font-bold mt-5 mb-1">
        Debt description:
      </label>
      <textarea required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline" name="purpose" onChange={handleChange} placeholder="Purpose"></textarea>

      <label className="block text-gray-400 text-sm font-bold mt-5 mb-1">
        Debt Amount:
      </label>
      <input required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline" type="text" name="target_amount" onChange={handleChange} placeholder="Enter debt amount" />

      <label className="block text-gray-400 text-sm font-bold mt-5 mb-1">
        Interst rate(%): (Optional)
      </label>
      <input required min={0} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline" type="number" name="interest_rate" onChange={handleChange} placeholder="Enter interest rate" />

      <select required className="mt-8 shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline" name='category' onChange={handleChange} value={saving?.category}>
        <option value="">Select category</option>
        <option value="vacation">vacation</option>
        <option value="car">Car</option>
        <option value='health'>Health</option>
        <option value="housing">Housing</option>
        <option value="education">Education</option>
        <option value="other">Other</option>
      </select>


      <label className="block text-gray-400 text-sm font-bold mb-2 mt-5">
        Date to complete debt payment:
        <input  min={getCurrentDate()}
 required type="date" name="target_date" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline" />
      </label>

      <select required className="mt-8 shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} name='contribution_type' value={saving?.contribution_type}>
        <option value="contribution_type" className="text-gray-400">Select Payment Frequency</option>
        <option value="weekly" className="text-gray-400">Weekly</option>
        <option value="monthly" className="text-gray-400">Monthly</option>
        <option value="yearly" className="text-gray-400">Yearly</option>
      </select>

      <label className="block text-gray-400 text-sm font-bold mb-2 mt-6">
        Paying Amount:
        <input type="number" name="contribution_amount" min={1} required onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline" />
      </label>

      <label className="block text-gray-400 text-sm font-bold mb-3 mt-6">
        Avatar (Optional)
        <span className="ml-2">{saving?.avatar ? saving.avatar?.name : 'No file selected'}</span>
          <div className="relative mt-1">
            <input type="file" name="avatar" onChange={handleChange} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
            <div className="bg-white rounded-md shadow-md border border-gray-300 flex items-center justify-center w-full py-2 px-3 text-gray-400 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a2 2 0 012-2h10a2 2 0 012 2v3a2 2 0 01-2 2h-1.586a1 1 0 00-.707.293l-1.414 1.414A1 1 0 019.414 9H8a1 1 0 00-1 1v6a2 2 0 002 2h4a1 1 0 001-1v-2.586a1 1 0 00-.293-.707l-1.414-1.414a1 1 0 01-.293-.707V10a4 4 0 00-4-4H5a1 1 0 00-1 1v2.586a1 1 0 01-.293.707L2.293 10A2 2 0 013 9V3zm14 9a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.414-1.414A1 1 0 0010.414 8H9a2 2 0 00-2 2v3a2 2 0 002 2h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 001.414 0l1.414-1.414a1 1 0 01.707-.293H17a2 2 0 002-2v-3zm-6-3a1 1 0 00-2 0v3a1 1 0 002 0V9z" clipRule="evenodd" />
              </svg>
              <span className='text-gray-900'>Choose File</span>
            </div>
          </div>
      </label>

      <button disabled={loading || validate} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3">
        {loading ? <Loader /> : 'Record debt'} </button>

    </form>
    </>
  );
};

export default DebtMgtForm;