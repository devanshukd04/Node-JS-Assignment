import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { SubmissionFormData } from "../data";
import Header from "../components/Header.tsx";

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
        "https://node-js-assignment-2p5h.vercel.app/api/form/getSubmissions",
        config
      );
      setSubmissionData(res.data.data.data);
      let resData = res?.data;
    } catch (error) {
      toast.warn(error?.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    }
  };


  return (
    <div>
      <Header/>
      <div className="min-h-screen bg-gray-50 m-4 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="text-3xl text-center font-bold">Submissions</div>
          <div className="text-xl font-medium text-gray-900 mt-2 text-center">
            {" "}
          </div>
        </div>
        <div className="text-2xl text-start font-bold">Please select date</div>

        <div className="mt-4 mb-4">
          <div date-rangepicker className="flex items-center">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input
                name="start"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date start"
              />
            </div>
            <span className="mx-4 text-gray-500">to</span>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input
                name="end"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date end"
              />
            </div>
          </div>
        </div>

        <div className="min-w-xl min-h-min h-full w-full mx-auto m-4 bg-white p-8 border border-gray-300">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {submissionData && (
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                  {Object.values(submissionData).map(
                    (item: SubmissionFormData, index: number) => {
                      return (
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
                      );
                    }
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Submissions;
