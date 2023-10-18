import React, { useState,useEffect } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import { Form1Data } from "../data.ts";
import Form1 from "./FormPage1.tsx";
import Form2 from "./FormPage2.tsx";
import Form3 from "./FormPage3.tsx";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Header from "../components/Header.tsx";
import StepperComp from "./StepperComp.tsx";

function Form() {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [isFirstStep, setIsFirstStep] = useState<boolean>(true);
  const [isLastStep, setIsLastStep] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isValidatePrev, setIsValidatePrev] = useState<boolean>(true);
  const [isValidateNext, setIsValidateNext] = useState<boolean>(true);

  const [form1Data, setForm1Data] = useState<Form1Data>({
    username: "",
    email: "",
    number: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const [form3Data, setForm3Data] = useState<string []>([]);

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin", { state: { page: 1 } });
    }
  },[])

  const handleNext = () => {
    if (step == 2) {
      setIsFirstStep(false);
      setIsLastStep(true);
    } else {
      setIsFirstStep(false);
      setIsLastStep(false);
    }
    setStep(step + 1);
  };

  const handlePrev = () => {
    if (step == 2) {
      setIsFirstStep(true);
      setIsLastStep(false);
    } else {
      setIsFirstStep(false);
      setIsLastStep(false);
    }
    setStep(step - 1);
  };

  const resetForm = () => {
    setTimeout(function () {
      navigate("/signin", { state: { page: 1 } });
    }, 500);
  };

  const handlePrevValidate = () => {
    setIsValidatePrev(true);
  };

  const handleNextValidate = () => {
    setIsValidateNext(true);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          authorization: token,
        },
      };

      const formData = new FormData();
      // Here was the problem -- I was appending the array itself
      // to the "files" field
      if (selectedFiles) {
        for (const file of selectedFiles) {
          formData.append("files", file);
        }
      }

      const data = {
        form1Data: form1Data,
        form3Data: form3Data,
      };

      formData.append("data", JSON.stringify(data || {}));


      const res = await axios.post(
        "https://node-js-assignment-2p5h.vercel.app/api/form/upload-data",
        formData,
        config
      );
      let resData = res?.data;

      if (resData?.success) {
        toast.success(`User created successfully!`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
        setTimeout(function () {
          navigate("/signin", { state: { page: 1 } });
        }, 2500);
      }
    } catch (err) {
      console.log(err);
      toast.warn(err?.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    }
  };

  return (
    <>
    <Header/>
      <div className="w-full content-center py-4 px-8 bg-grey-100">
        <StepperComp step={step}/>
      </div>

      {step == 1 && (
        <>
          <Form1
            formData={form1Data}
            setFormData={setForm1Data}
            isValidateNext={isValidateNext}
            setIsValidateNext={setIsValidateNext}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </>
      )}
      {step == 2 && (
        <>
          <Form2
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            isValidatePrev={isValidatePrev}
            setIsValidatePrev={setIsValidatePrev}
            isValidateNext={isValidateNext}
            setIsValidateNext={setIsValidateNext}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </>
      )}
      {step == 3 && (
        <>
          <Form3
            form3Data={form3Data}
            setForm3Data={setForm3Data}
            isValidatePrev={isValidatePrev}
            setIsValidatePrev={setIsValidatePrev}
            isValidateNext={isValidateNext}
            setIsValidateNext={setIsValidateNext}
            handlePrev={handlePrev}
            handleSubmit={handleSubmit}
          />
        </>
      )}

      <div className="m-16 flex justify-between">
        <Button
          className="bg-blue-500 hover:bg-blue-700  disabled:opacity-50 disabled:cursor-not-allowed py-2 px-8 rounded-full text-black"
          disabled={!isValid || isFirstStep}
          onClick={handlePrevValidate}
        >
          Prev
        </Button>
        <Button
          className="bg-red-500 hover:bg-red-700 py-2 px-8 rounded-full text-black"
          onClick={resetForm}
        >
          Cancel
        </Button>
        <Button
          className="bg-blue-500 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed py-2 px-8 rounded-full text-black"
          disabled={!isValid || isLastStep}
          onClick={handleNextValidate}
        >
          Next
        </Button>
        {step == 3 ? (
          <Button
            className="bg-green-500 hover:bg-green-700 py-2 px-8 rounded-full text-black"
            onClick={handleNextValidate}
          >
            Submit
          </Button>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Form;
