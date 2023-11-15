// AlertComponent.js
import React, { useContext } from 'react';
import { AlertContext } from '../contexts/alertContext';
import { IoIosCloseCircleOutline } from "react-icons/io";
const AlertComponent = () => {
  const { alert, clearAlert } = useContext(AlertContext);

  if (!alert.message) return null;

  const alertClass = {
    success: 'border-brightGreen',
    error: 'border-brightPink',
  }[alert.type];

  const alertInfo = {
    success: 'INFO',
    error: 'ERROR',
  }[alert.type];

  const alertInfoText = {
    success: 'text-brightGreen',
    error: 'text-brightPink',
  }[alert.type];

  return (
    <>
    <div className='container mx-auto'>
    <div className={`flex items-center p-4 mt-4 mb-4 text-sm border rounded-lg text-white bg-deepBlue font-bold ${alertClass}`}>
    <div className={`${alertInfoText}`}>
        {alertInfo}
    </div>
    <div className="ml-4">
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

