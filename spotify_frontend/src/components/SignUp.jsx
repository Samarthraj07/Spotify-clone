import React from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import InputBox from "../utilities/InputBox";
import PasswordBox from "../utilities/PasswordBox";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelper";
const SignUp = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const Navigate = useNavigate();

  const signUp = async () => {
    if (email !== confirmEmail) {
      alert("Email and confirmed email should be same, please check again?");
      return;
    }
    const data = { firstname, lastname, email, password };
    console.log(data);
    const response = await makeUnauthenticatedPOSTRequest(
      "/auth/register",
      data
    );
    if (response && !response.error) {
      console.log(response);
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, { path: "/", expires: date });
      alert("Success");
      Navigate("/home");
    }
    if (!response) {
      alert("Failed to signup");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="logo p-4 border-b border-solid border-gray-300 w-full flex justify-center">
        <Icon icon="logos:spotify" width="150" />
      </div>
      <div className="inputRegion w-1/3 py-10 flex items-center flex-col justify-center">
        <div className="font-semibold mb-10">Sign up to start listening</div>

        <InputBox
          label={"Enter Firstname:"}
          placeholder={"Firstname"}
          value={firstname}
          setValue={setFirstname}
        />
        <InputBox
          label={"Enter your Lastname:"}
          placeholder={"Lastname"}
          value={lastname}
          setValue={setLastname}
        />
        <InputBox
          label={"Enter your email:"}
          placeholder={"Enter your email."}
          value={email}
          setValue={setEmail}
        />
        <InputBox
          label={"Confirm your email:"}
          placeholder={"Confirm your email."}
          value={confirmEmail}
          setValue={setConfirmEmail}
        />
        <PasswordBox
          label="Create password:"
          placeholder="Password"
          value={password}
          setValue={setPassword}
        />
        <div className=" flex justify-center m-5 w-full">
          <button
            className="bg-green-400 p-3 px-6 font-semibold rounded-full hover:"
            onClick={(e) => {
              e.preventDefault();
              signUp();
            }}
          >
            SIGN UP
          </button>
        </div>
        <div className=" border border-solid border-gray-300 w-full flex justify-center"></div>
        <div className="font-semibold text-lg m-5">
          Already have an account?
        </div>
        <Link
          to="../Login"
          className="p-2 text-center font-semibold border text-gray-600 border-gray-400 rounded-full w-full hover:bg-gray-200"
        >
          LOG IN
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
