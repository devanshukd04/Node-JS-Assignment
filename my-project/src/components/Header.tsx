import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-indigo-500 text-indigo-50">
      <header>
        <ul className="list-none p-4 flex justify-center gap-4">
          <li className="p-2">
            <button>
              <Link
                to={"/form-submissions"}
              >
                Submission
              </Link>
            </button>
          </li>
          <li className="p-2">
            <button>
              <Link
                to={"/form"}
              >
                Form
              </Link>
            </button>
          </li>
          <li className="p-2">
            <button>
              <Link
                to={"/register"}
              >
                Register
              </Link>
            </button>
          </li>
          <li className="p-2">
            <button>
              <Link
                to={"/signin"}
              >
                Login
              </Link>
            </button>
          </li>
        </ul>
      </header>
    </div>
  );
};
export default Header;
