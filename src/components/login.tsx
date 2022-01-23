import React, { useState, useEffect } from "react";
import { login } from "../api";
import { UserInfo, LooseObject } from "../utility/interface";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStorageData,getStorageData } from "../utility/sessionStorage";
import "./style.css";

const emptyObject: LooseObject = {};

const LoginPage = () => {
  const [formState, setFormState] = useState({
    values: emptyObject,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // * set the variable value
    setFormState((formState) => ({
      ...formState,
    }));
  }, [formState.values]);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // *event.persist(), which will remove the synthetic event from the pool and allow references to the event to be retained by user code.
    event.persist();
    // * set the variable value in values and touched status
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userInfo: UserInfo = {
        name: formState.values.name,
        email: formState.values.email.toLowerCase(),
      };
      const loginResult = await login(userInfo);
      if (loginResult) {
        const accessToken = await getStorageData("accessToken");
        dispatch({ type: "SIGN_IN", accessToken: accessToken });
        setStorageData("userInfo", JSON.stringify(userInfo));
        navigate("/posts");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="div">
      <div>
        <h1 className="heading-1">Login</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="center-block"
          type="text"
          name="name"
          placeholder="Name"
          value={formState.values.name || ""}
          onChange={handleChange}
        />
        <input
          className="center-block"
          type="email"
          name="email"
          placeholder="Email"
          value={formState.values.email || ""}
          onChange={handleChange}
        />
        <button className="center-block">Go</button>
      </form>
    </div>
  );
};

export default LoginPage;
