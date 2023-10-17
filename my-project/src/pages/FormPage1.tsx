import React, { FC, ReactElement } from "react";
import { Form1Data, Form1Fields } from "../data.ts";

type ChildProps = {
  formData: Form1Data;
  setFormData: React.Dispatch<React.SetStateAction<Form1Data>>;
};

const FormPage1: FC<ChildProps> = ({ formData, setFormData }): ReactElement => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData)

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
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
              />
            </div>))}

          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPage1;
