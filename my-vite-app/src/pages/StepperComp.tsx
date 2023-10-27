import { ReactElement, FC } from "react";

type ChildProps = {
  step:number
};

const StepperComp: FC<ChildProps> = ({step}):ReactElement => {

  const completedComp = (step: number, desc: string) => {
    return (
      <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-blue-700">
        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-blue-200 dark:after:text-blue-500">
          <svg
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span>{step}</span>
          <span className="text-base hidden sm:inline-flex sm:ml-2">
            {desc}
          </span>
        </span>
      </li>
    );
  };

  const inCompletedComp = (step: number, desc: string) => {
    return (
      <li className="flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
        <svg
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span className="text-lg mr-2">{step}</span>
        <span className="text-base hidden sm:inline-flex sm:ml-2">{desc}</span>
        </span>
      </li>
    );
  };

  return (
    <div className="w-full py-4 px-8">
      <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
        {step > 1
          ? completedComp(1, "Basic Details")
          : inCompletedComp(1, "Basic Details")}
        <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
          <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            {step > 2
              ? completedComp(2, "Multi-Field Select Dropdown")
              : inCompletedComp(2, "Multi-Field Select Dropdown")}
          </span>
        </li>
        {step > 3
          ? completedComp(3, "Multi-Field Select Dropdown")
          : inCompletedComp(3, "Multi-Field Select Dropdown")}
      </ol>
    </div>
  );
};

export default StepperComp;
