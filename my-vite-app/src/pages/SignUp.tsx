import { useForm } from "react-hook-form";
import { UserData } from "../data";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header.tsx";

function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<UserData>({ mode: "onChange" });

  // const showToast = (message, type) => {
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
        "https://x8ki-letl-twmt.n7.xano.io/api:wcYQ6Ksz/auth/signup",
        getValues(),
        config
      );
      // let resData = res?.data;
      if (res.status==200) {
        toast.success(`User created successfully!`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
        setTimeout(function () {
          navigate("/signin", { state: { page: 1 } });
        }, 2500);
      }
    } catch (err:any) {
      toast.warn(err?.message, {
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
          <div className="text-center font-bold text-3xl">Create Account</div>
          <div className="font-bold text-gray-900 mt-2 text-center"></div>
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
                htmlFor="firstname"
                className="text-sm font-bolld text-gray-600 block font-bold"
              >
                First Name
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded mt-1"
                type="text"
                {...register("firstname", {
                  required: true,
                  validate: {
                    maxLength: (v) =>
                      v.length < 10 ||
                      "FirstName should have at max 10 characters long",
                  },
                })}
              ></input>
              <div className="text-red-500">
                {errors.firstname?.type === "required" && (
                  <small>FirstName is required</small>
                )}
                {errors.firstname?.message && (
                  <small>{errors.firstname.message}</small>
                )}
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-600">
                  Remember Me
                </label>
              </div>
              <div>
                <a href="" className="font-mediu text-sm text-blue-500">
                  Forgot Password
                </a>
              </div>
            </div>
            <div>
              <button
                className="button w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm"
                type="submit"
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

export default SignUp;
