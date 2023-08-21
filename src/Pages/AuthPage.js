import React, { useState } from "react";
import Login from "./Login";

import SignUp from "./SignUp";

const AuthPage = () => {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  return (
    <div className="App">
      {currentForm === "login" ? (
        <Login onFormSwitch={toggleForm} />
      ) : (
        <SignUp onFormSwitch={toggleForm} />
      )}
    </div>
  );
};

export default AuthPage;
