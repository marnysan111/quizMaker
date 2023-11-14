// AlertComponent.js
import React, { useContext } from 'react';
import { AlertContext } from '../contexts/alertContext';
import { IoIosCloseCircleOutline } from "react-icons/io";
const AlertComponent = () => {
  const { alert, clearAlert } = useContext(AlertContext);

  if (!alert.message) return null;

  const alertClass = {
    success: 'bg-green-200 text-green-800',
    error: 'bg-red-200 text-red-800',
    warning: 'bg-yellow-200 text-yellow-800',
  }[alert.type];


  return (
    <>
    <div className='container mx-auto'>
    <div class="flex items-center p-4 mt-4 mb-4 text-sm border rounded-lg border-brightGreen bg-deepBlue text-white font-bold">
    <div>
        {alert.message}
    </div>
    <button type="button" onClick={clearAlert} class="ms-auto -mx-1.5 -my-1.5  inline-flex items-center justify-center h-8 w-8">
        <IoIosCloseCircleOutline size={24}/>
    </button>
    </div>
    </div>
    </>

  );
};

export default AlertComponent;

