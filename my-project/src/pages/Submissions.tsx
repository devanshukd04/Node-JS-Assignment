import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { SubmissionFormData } from "../data";

const Submissions = () => {
  const navigate = useNavigate();
  const [submissionData, setSubmissionData] = useState<SubmissionFormData[]>(
    []
  );

  const columns = [
    { field: "username", headerName: "User name", width: 70 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "number", headerName: "Email", width: 130 },
    { field: "state", headerName: "State", width: 130 },
    { field: "city", headerName: "City", width: 130 },
    { field: "country", headerName: "Country", width: 130 },
    { field: "createdAt", headerName: "Date", width: 130 },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getData(token);
    } else {
      navigate("/signin", { state: { page: 1 } });
    }
  }, []);

  const getData = async (token: string | null) => {
    try {
      const config = {
        headers: {
          authorization: token,
        },
      };
      const res = await axios.get(
        "http://localhost:5000/api/form/getSubmissions",
        config
      );
      setSubmissionData(res.data.data);
      console.log("Submission Data ", submissionData);
      let resData = res?.data;
      console.log(res);
      console.log(res.data);
    } catch (error) {
      toast.warn(error?.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    }
  };

  useEffect(() => {
    console.log(submissionData);
  }, [submissionData]);

  console.log("Submission Data ", submissionData);
  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="text-3xl text-center font-bold">Submissions</div>
          <div className="text-xl font-medium text-gray-900 mt-2 text-center">
            {" "}
          </div>
        </div>
        <div className="max-w-xl min-h-min h-full w-full mx-auto mt-4 mb-4 bg-white p-8 border border-gray-300">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {submissionData && <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                  >
                    UserName
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                  >
                    State
                  </th>
                  <th scope="col" className="px-6 py-3">
                    City
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                  >
                    number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    country
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 bg-gray-50 dark:bg-gray-800"
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {submissionData.map((item:SubmissionFormData,index:number) => (
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                    >
                     {item.username}
                    </th>
                    <td className="px-6 py-4">{item.email}</td>
                    <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                      {item.state}
                    </td>
                    <td className="px-6 py-4">${item.city}</td>
                    <td className="px-6 py-4">{item.number}</td>
                    <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                      {item.country}
                    </td>
                    <td className="px-6 py-4">${item.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Submissions;
