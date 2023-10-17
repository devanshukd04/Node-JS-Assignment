import React,{ChangeEvent, useState} from "react";

const FormPage2 = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  return (
    <>
      <div className="mb-3 w-96 content-center items-center">
      <input
        type="file"
        accept=".png, .pdf"
        onChange={handleFileChange}
        className="hidden"
        id="file-input"
      />
      <label
        htmlFor="file-input"
        className="cursor-pointer bg-blue-500 text-white rounded-md px-4 py-2"
      >
        Select a file
      </label>
      {selectedFile && (
        <p className="mt-4">
          Selected File: {selectedFile.name}
        </p>
      )}
    </div>
    </>
  );
};

export default FormPage2;
