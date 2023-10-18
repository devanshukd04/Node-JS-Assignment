import React, { ChangeEvent, useState, FC, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Multiselect} from 'multiselect-react-dropdown';
import { Form3Options } from "../data.ts";

type ChildProps = {
  form3Data:string [];
  setForm3Data:React.Dispatch<React.SetStateAction<string []>>;
  isValidatePrev: boolean;
  setIsValidatePrev: React.Dispatch<React.SetStateAction<boolean>>;
  isValidateNext: boolean;
  setIsValidateNext: React.Dispatch<React.SetStateAction<boolean>>;
  handlePrev: () => void;
  handleSubmit: () => void;
};

const FormPage3: FC<ChildProps> = ({
  form3Data,
  setForm3Data,
  isValidatePrev,
  setIsValidatePrev,
  isValidateNext,
  setIsValidateNext,
  handlePrev,
  handleSubmit,
}) =>  {
  
  const [isDirty,setIsDirty]=useState<boolean>(false);


  useEffect(() => {
    if (isValidatePrev) {
      handlePrev();
      setIsValidatePrev(false);
    }
    if (isValidateNext) {
      if (!isDirty) {
        setIsDirty(true);
        setIsValidateNext(false);
      }
       else {
        handleSubmit();
        setIsValidateNext(false);
      }
      
    }
  }, [isValidatePrev, isValidateNext]);

  const handleSelect=(selectedList, selectedItem)=>{
    setForm3Data(selectedList.map((item)=>item.label));
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-3xl text-center font-bold">Step 3</div>
        <div className="text-xl font-medium text-gray-900 mt-2 text-center">
          {" "}
          Multi-Field Select Dropdown
        </div>
      </div>
      <div className="max-w-xl w-full mx-auto mt-4 mb-4 bg-white p-8 border border-gray-300">
        <label
          htmlFor="small"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select your Job Profile
        </label>
        <Multiselect
          options={Form3Options}
          className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          displayValue="label"
          onSelect={handleSelect}
        />
          
      </div>
      <ToastContainer/>
    </div>
  );
};

export default FormPage3;
