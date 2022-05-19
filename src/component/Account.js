// eslint-disable-next-line no-useless-escape
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Account.css";

const Account = () => {
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const nameRef = useRef();
  const numberRef = useRef();

  const [emailerror, setemailError] = useState(null);
  const [passworderror, setpassworderror] = useState(null);
  const [confirmpassword, setconfirmpassword] = useState(null);
  const [numbererror, setnumbererror] = useState(null);
  const [nameerror, setnameerror] = useState(null);

  const handleEmail = (text) => {
    // eslint-disable-next-line no-useless-escape
    let emailCheckReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailCheckReg.test(text)) {
      setemailError("Please enter a valid email");
    }
    setTimeout(() => {
      setemailError(null);
    }, 500);
  };

  const handlePassword = (text) => {
    let passwordReg =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (!text.match(passwordReg)) {
      setpassworderror(
        "Password contain number, letter, string, and special character"
      );
    }
    setTimeout(() => {
      setpassworderror(null);
    }, 500);
  };

  const handleConfirm = (text) => {
    const password1 = passwordRef.current.value;

    if (password1 !== text) {
      setconfirmpassword("Password must me same");
    }
    setTimeout(() => {
      setconfirmpassword(null);
    }, 600);
  };

  const handleNumber = (text) => {
    let numberRef = /^\d{12}$/;
    if (!numberRef.test(text)) {
      setnumbererror("Number is not valid");
    }
    setTimeout(() => {
      setnumbererror(null);
    }, 500);
  };

  const handleName = (text) => {
    let nameRef = /^[a-zA-Z\s]*$/;
    if (!nameRef.test(text)) {
      setnameerror("Name is not valid");
    }
    setTimeout(() => {
      setnameerror(null);
    }, 500);
  };

  const handleClick = () => {
    const emailValue = emailRef.current.value.length;
    const passwordValue = passwordRef.current.value.length;
    const confirmPasswordValue = confirmPasswordRef.current.value.length;
    const nameValue = nameRef.current.value.length;
    const numberValue = numberRef.current.value.length;
    if (
      emailValue === 0 ||
      passwordValue === 0 ||
      confirmPasswordValue === 0 ||
      nameValue === 0 ||
      numberValue === 0
    ) {
      alert("Field is emtry");
      return;
    }
    if (
      emailValue !== 0 ||
      passwordValue !== 0 ||
      confirmPasswordValue !== 0 ||
      nameValue !== 0 ||
      numberValue !== 0
    ) {
      navigate("/mychart");
    }
  };
  return (
    <div className="account--outer">
      <div className="account--inner__bg">
        <h2> Choose a data range</h2>
        <p id="account--inner__text">
          lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
          lorem lorem lorem lorem lorem lorem lorem
        </p>
      </div>

      <div className="account--inner--form">
        <form className="account--form">
          <h2> Create an account </h2>
          <label> Your Email Address</label>
          <input
            ref={emailRef}
            className="account--form__style"
            type="email"
            onBlurCapture={(e) => handleEmail(e.target.value)}
            required
          ></input>
          {emailerror ? <p> {emailerror}</p> : ""}
          <label> Your Password </label>
          <input
            ref={passwordRef}
            className="account--form__style"
            type="password"
            required
            onBlur={(e) => handlePassword(e.target.value)}
          ></input>
          {passworderror ? <p> {passworderror}</p> : ""}
          <label> Confirm Your Password</label>
          <input
            ref={confirmPasswordRef}
            className="account--form__style"
            type="password"
            required
            onBlur={(e) => handleConfirm(e.target.value)}
          ></input>
          {confirmpassword ? <p>{confirmpassword}</p> : ""}
          <label> Your Full Name"</label>
          <input
            ref={nameRef}
            className="account--form__style"
            type="text"
            required
            onBlur={(e) => handleName(e.target.value)}
          ></input>
          {nameerror ? <p> {nameerror}</p> : ""}
          <label> Your Phone Number</label>
          <input
            ref={numberRef}
            className="account--form__style"
            type="text"
            required
            onBlur={(e) => handleNumber(e)}
          ></input>
          {numbererror ? <p> {numbererror}</p> : ""}
          <div>
            <input type="checkbox" id="agree" name="agree" value="agree" />{" "}
            <label> I read and agree terms and condition</label>
          </div>
          <button type="button" onClick={handleClick} id="account--btn">
            {" "}
            Create Account{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Account;
