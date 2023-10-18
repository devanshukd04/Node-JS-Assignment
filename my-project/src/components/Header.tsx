import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate()

  const userName = localStorage.getItem("UserName");

  const logOut = async(e) => {
    localStorage.removeItem('UserName')
    localStorage.removeItem('token')
    alert(`Logged Out successfully!`)
    setTimeout(function(){navigate('/signin')}, 2500)
}

  return (
    <div className="bg-indigo-500 text-indigo-50">
      <header>
        <ul className="list-none p-4 flex justify-center gap-4">
          <li className="p-2">
            <button>
              <Link to={"/form-submissions"}>Submission</Link>
            </button>
          </li>
          <li className="p-2">
            <button>
              <Link to={"/form"}>Form</Link>
            </button>
          </li>
          {!userName ? (
            <>
              <li className="p-2">
                <button>
                  <Link to={"/register"}>Register</Link>
                </button>
              </li>
              <li className="p-2">
                <button>
                  <Link to={"/signin"}>Login</Link>
                </button>
              </li>
            </>
          ) : (<>
            <div className="p-2 font-semibold">Hi {userName}</div>
            <li className="p-2">
                <button onClick={logOut}>
                  <Link to={"/register"}>SignOut</Link>
                </button>
              </li></>
          )}
        </ul>
      </header>
    </div>
  );
};
export default Header;
