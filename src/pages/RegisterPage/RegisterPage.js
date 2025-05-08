import React, { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import styles from "./RegisterPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import {register} from "../../redux/actions/authActions"
import {authSelector} from "../../redux/reducers/authReducer"
import { authActions } from "../../redux/reducers/authReducer";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  
  // Input refs
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
    const navigate = useNavigate();
  

  const dispatch = useDispatch();
const { loading,user } = useSelector(authSelector);

  useEffect(() => {
    if (user) {
      navigate("/"); 
    }
  }, [user, navigate]);


  

const onSubmitHandler = async (e) => {
  e.preventDefault();

  const nameVal = nameRef.current.value.trim();
  const emailVal = emailRef.current.value.trim();
  const passwordVal = passwordRef.current.value;

  if (
    emailVal === "" ||
    nameVal === "" ||
    passwordVal === "" ||
    passwordVal.length < 6
  ) {
    return toast.error("Please enter valid data!");
  }

  dispatch(register(emailVal, passwordVal));
};


  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <h2 className={styles.loginTitle}>Sign Up</h2>
        <input
          type="text"
          name="name"
          ref={nameRef}
          placeholder="Enter Name"
          className={styles.loginInput}
        />
        <input
          type="email"
          name="email"
          ref={emailRef}
          className={styles.loginInput}
          placeholder="Enter Email"
        />
        <input
          type="password"
          name="password"
          ref={passwordRef}
          className={styles.loginInput}
          placeholder="Enter Password"
        />
        <button className={styles.loginBtn}>
          {loading ? "..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
