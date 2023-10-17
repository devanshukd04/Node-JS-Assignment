import React, { useState } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import {Form1Data} from '../data.ts';
import Form1 from './FormPage1.tsx';
import Form2 from './FormPage2.tsx';
import Form3 from './FormPage3.tsx';

function Form() {
  const [step, setStep] = useState<number>(1);
  const [isFirstStep, setIsFirstStep] = useState<boolean>(true);
  const [isLastStep, setIsLastStep] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [form1Data, setForm1Data] = useState<Form1Data>({
    username:'',
  email:'',
  number:'',
  addressLine1:'',
  addressLine2:'',
  city:'',
  state:'',
  pincode:'',
  country:'',
  });

  const handleNext = () => {
    if(step==2){
      setIsFirstStep(false);
      setIsLastStep(true);
    }
    else{
      setIsFirstStep(false);
      setIsLastStep(false);
    }
    setStep(step + 1);
  };

  const handlePrev = () => {
    if(step==2){
      setIsFirstStep(true);
      setIsLastStep(false);
    }
    else{
      setIsFirstStep(false);
      setIsLastStep(false);
    }
    setStep(step - 1);
  };

  console.log(step);
  console.log("Is First Step ",isFirstStep);
  console.log("Is Last Step ",isLastStep);

  return (
    <>
      <div className="w-full py-4 px-8 bg-red-100">
        <Stepper className="mt-4 flex justify-between bg-black text-white"
          activeStep={step}
        >
          <Step onClick={() => setStep(1)}>1</Step>
          <Step onClick={() => setStep(2)}>2</Step>
          <Step onClick={() => setStep(3)}>3</Step>
        </Stepper>
        <div className="mt-16 flex justify-between">
          <Button disabled={!isValid || isFirstStep} onClick={handlePrev}>
            Prev
          </Button>
          <Button disabled={!isValid || isLastStep} onClick={handleNext}>
            Next
          </Button>
        </div>
      </div>

      {step == 1 && <><Form1 formData={form1Data} setFormData={setForm1Data}/></>}
      {step == 2 && <><Form2/></>}
      {step == 3 && <><Form3/></>}

      <div className="m-16 flex justify-between">
          <Button className="bg-blue-500 hover:bg-blue-700  disabled:opacity-50 disabled:cursor-not-allowed py-2 px-8 rounded-full text-black" disabled={!isValid || isFirstStep} onClick={handlePrev}>
            Prev
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed py-2 px-8 rounded-full text-black" disabled={!isValid || isLastStep} onClick={handleNext}>
            Next
          </Button>
        </div>
    </>
  );
}

export default Form;
