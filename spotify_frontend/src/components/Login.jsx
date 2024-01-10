import React, { useState } from "react";

import { Icon } from "@iconify/react";
import InputBox from "../utilities/InputBox";
import PasswordBox from "../utilities/PasswordBox";
import { Link, useNavigate } from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelper";
import { useCookies } from "react-cookie";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cookie, setCookie] = useCookies(["token"])
  
  const navigate = useNavigate()
  const login = async () => {
    const data = {email, password};
    const response = await makeUnauthenticatedPOSTRequest(
        "/auth/login",
        data
    );
    if (response && !response.err) {
        const token = response.token;
        const date = new Date();
        date.setDate(date.getDate() + 30);
        setCookie("token", token, {path: "/", expires: date});
        alert("Success");
        navigate("/home");
    } else {
        alert("Failure");
    }
};
  return (
   
    <div className="w-full h-full flex flex-col items-center">
      <div className="logo p-4 border-b border-solid border-gray-300 w-full flex justify-center">
        <Icon icon="logos:spotify" width="150" />
      </div>
      <div className="inputRegion w-1/3 py-10 flex items-center flex-col justify-center">
        <div className="font-semibold mb-10">To continue login to spotify.</div>

        <InputBox
          label={"Enter username or Email:"}
          placeholder={"Enter username or Email"}
          value={email}
          setValue={setEmail}
        />
        <PasswordBox label="Enter password" placeholder="Enter password"
        value={password}
        setValue={setPassword} />
        <div className=" flex justify-end m-5 w-full">
          <button className="bg-green-400 p-3 px-6 font-semibold rounded-full hover:bg-green-200"
          onClick={(e)=> {
            e.preventDefault()
            login()
          }}
          >
            LOG IN
          </button>
        </div>
        <div className=" border border-solid border-gray-300 w-full flex justify-center"></div>
        <div className="font-semibold text-lg m-5">Don't have an account?</div>
        <Link
          to='../SignUp'
          className="p-2 text-center font-semibold border text-gray-600 border-gray-400 rounded-full w-full hover:bg-gray-200"
        >
          SIGN UP FOR SPOTIFY
        </Link>
      </div>
    </div>
  );
};

export default Login;
