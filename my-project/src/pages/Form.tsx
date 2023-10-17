import React, { useState } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";

function Form() {
  const [step, setStep] = useState<number>(1);
  const [isLastStep, setIsLastStep] = useState<boolean>(false);
  const [isFirstStep, setIsFirstStep] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  return (
    <>
      <div className="w-full py-4 px-8 bg-red-100">
        <Stepper className="mt-4 flex justify-between bg-black text-white"
          activeStep={step}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
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

      {step == 1 && <>Form1</>}
      {step == 2 && <>Form2</>}
      {step == 3 && <>Form3</>}
    </>
  );
}

export default Form;
