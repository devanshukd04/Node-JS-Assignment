import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserData } from "../data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.tsx";

function SignIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<UserData>({ mode: "onChange" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/form-submissions", { state: { page: 1 } });
    } 
  }, []);

  

  // const showToast = (message:any, type: keyof typeof toast) => {
  //   toast[type](message, {
  //     position: "top-center",
  //     autoClose: 3000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //   });
  // };

  const onSubmit = async (e:any) => {
    e.preventDefault();
    
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "https://x8ki-letl-twmt.n7.xano.io/api:wcYQ6Ksz/auth/login",
        getValues(),
        config
      );

      let resData = res?.data;
      if (res?.status==200) {
        localStorage.setItem("token", resData?.authToken);
        localStorage.setItem("UserName", resData?.user);
        toast.success(resData.msg, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });

        navigate("/form");
      }
      else{

      }
    } catch (err:any) {
      toast.warn(err?.response?.data?.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="text-center font-bold text-3xl">Login</div>
          <div className="text-3xl font-bold text-gray-900 mt-2 text-center"></div>
        </div>
        <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="text-sm font-bolld text-gray-600 block  font-bold"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                {...register("email", {
                  required: "Email is required",
                  validate: {
                    matchPattern: (v) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                      "Email address must be a valid address",
                  },
                })}
              ></input>
              <div className="text-red-500">
                {errors.email?.message && <small>{errors.email.message}</small>}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-bold text-gray-600 block"
              >
                Password
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded mt-1"
                type="password"
                {...register("password", {
                  required: true,
                  validate: {
                    maxLength: (v) =>
                      v.length < 10 ||
                      "Password should have at max 10 characters long",
                  },
                })}
              ></input>
              <div className="text-red-500">
                {errors.firstname?.type === "required" && (
                  <small>Password is required</small>
                )}
                {errors.firstname?.message && (
                  <small>{errors.firstname.message}</small>
                )}
              </div>
            </div>

            <div>
              <button
                className="button w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm"
                // type="submit"
                onClick={onSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default SignIn;
