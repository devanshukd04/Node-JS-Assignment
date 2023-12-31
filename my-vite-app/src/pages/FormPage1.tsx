import React, { FC, ReactElement, useEffect } from "react";
import { Form1Data, Form1Fields } from "../data.ts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ChildProps = {
  formData: Form1Data;
  setFormData: React.Dispatch<React.SetStateAction<Form1Data>>;
  isValidateNext: boolean;
  setIsValidateNext: React.Dispatch<React.SetStateAction<boolean>>;
  handleNext:()=>void;
};

const FormPage1: FC<ChildProps> = ({ formData, setFormData, isValidateNext, setIsValidateNext, handleNext }): ReactElement => {
  const handleSubmit = (e:any) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  useEffect(()=>{
    if(isValidateNext){

      if(formData["username"]==""){
        toast.warn("Please enter first name", {position: toast.POSITION.TOP_CENTER, autoClose: 1500,})
        setIsValidateNext(false);
      }
      else if(!formData["email"].match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)){
        toast.warn("Please enter valid email address", {position: toast.POSITION.TOP_CENTER, autoClose: 1500,})
        setIsValidateNext(false);
      }
      else if(formData["number"].length<10 || formData["number"]==''){
        toast.warn("Please enter a valid mobile number", {position: toast.POSITION.TOP_CENTER, autoClose: 1500,})
        setIsValidateNext(false);
      }
      else if(formData["addressLine1"]==""){
        toast.warn("Please enter valid address in Address line 2", {position: toast.POSITION.TOP_CENTER, autoClose: 1500,})
        setIsValidateNext(false);
      }
      else if(formData["addressLine2"]==""){
        toast.warn("Please enter valid address in Address line 2", {position: toast.POSITION.TOP_CENTER, autoClose: 1500,})
        setIsValidateNext(false);
      }
      else if(formData["city"]==''){
        toast.warn("Please enter name of city", {position: toast.POSITION.TOP_CENTER, autoClose: 1500,})
        setIsValidateNext(false);
      }
      else if(formData["state"]==""){
        toast.warn("Please enter name of state", {position: toast.POSITION.TOP_CENTER, autoClose: 1500,})
        setIsValidateNext(false);
      }
      else if(formData["pincode"]==""){
        toast.warn("Please enter pincode", {position: toast.POSITION.TOP_CENTER, autoClose: 1500,})
        setIsValidateNext(false);
      }
      else if(formData["country"]==""){
        toast.warn("Please enter name of Country", {position: toast.POSITION.TOP_CENTER, autoClose: 1500,})
        setIsValidateNext(false);
      }
      else{
        handleNext();
        setIsValidateNext(false);
      }
    }
  },[isValidateNext])

  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="text-3xl text-center font-bold">Step 1</div>
          <div className="text-xl font-medium text-gray-900 mt-2 text-center">
            {" "}
            Basic Details
          </div>
        </div>
        <div className="max-w-xl w-full mx-auto mt-4 mb-4 bg-white p-8 border border-gray-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            
{/* Added necessary files to parse data*/}
            {Form1Fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="text-sm font-bolld text-gray-600 block  font-bold"
              >{field.label}</label>
              <input
                type={field.type}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                id={field.name}
                name={field.name}
                value={formData[field.name as keyof Form1Data]}
                onChange={handleChange}
                required={field.required}
              />
            </div>))}

          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default FormPage1;
