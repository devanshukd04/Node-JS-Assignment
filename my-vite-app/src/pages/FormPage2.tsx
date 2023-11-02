import React, { ChangeEvent, FC, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ChildProps = {
  selectedFiles: FileList | null;
  setSelectedFiles: React.Dispatch<React.SetStateAction<FileList | null>>;
  isValidatePrev: boolean;
  setIsValidatePrev: React.Dispatch<React.SetStateAction<boolean>>;
  isValidateNext: boolean;
  setIsValidateNext: React.Dispatch<React.SetStateAction<boolean>>;
  handlePrev: () => void;
  handleNext: () => void;
};

const FormPage2: FC<ChildProps> = ({
  selectedFiles,
  setSelectedFiles,
  isValidatePrev,
  setIsValidatePrev,
  isValidateNext,
  setIsValidateNext,
  handlePrev,
  handleNext,
}) => {
  // const [fileName, setFileName] = useState<[string]>();

  useEffect(() => {
    if (isValidatePrev) {
      handlePrev();
      setIsValidatePrev(false);
    }
    if (isValidateNext) {
     if (!selectedFiles || selectedFiles.length < 1) {
        toast.warn("Please upload files", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
        setIsValidateNext(false);
      } else {
        handleNext();
        setIsValidateNext(false);
      }
      
    }
  }, [isValidatePrev, isValidateNext]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    // setIsDirty(true);

    if (files) {
      if (files.length > 3) {
        toast.warn("You cannot upload more than 3 files", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
      } else {
        setSelectedFiles(files);
      }
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="text-3xl text-center font-bold">Step 2</div>
          <div className="text-xl font-medium text-gray-900 mt-2 text-center">
            {" "}
            Multi-File Upload
          </div>
        </div>
        <div className="max-w-xl w-full mx-auto mt-4 mb-4 bg-white p-8 border border-gray-300">
          <div className="mb-3 w-96 content-center items-center">
            <input
              type="file"
              accept=".png, .pdf"
              onChange={handleFileChange}
              className="hidden"
              id="file-input"
              multiple
            />
            <label
              htmlFor="file-input"
              className="cursor-pointer bg-blue-500 text-white rounded-md px-4 py-2"
            >
              Select a file
            </label>
            {selectedFiles && (
              <p className="mt-4">Uploaded Files: {selectedFiles.length}</p>
            )}
          </div>
        </div>
      </div>
      {/* <div className="mb-3 w-96">
          <label
            htmlFor="formFileMultiple"
            className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
          >
          Multiple files input example
          </label>
          <input
            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
            type="file"
            id="formFileMultiple"
            multiple
          />
      </div> */}
      <ToastContainer />
    </>
  );
};

export default FormPage2;
