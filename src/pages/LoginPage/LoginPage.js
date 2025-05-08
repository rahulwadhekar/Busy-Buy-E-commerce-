import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "./LoginPage.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../redux/actions/authActions";
import { authSelector } from "../../redux/reducers/authReducer";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const { loading, user, error } = useSelector(authSelector);

  useEffect(() => {
    if (user) {
      navigate("/"); 
    }
  }, [user, navigate]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const emailVal = emailRef.current.value.trim();
    const passwordVal = passwordRef.current.value;

    if (emailVal === "" || passwordVal === "" || passwordVal.length < 6) {
      return toast.error("Please enter valid data!");
    }

    console.log(login(emailVal,passwordVal))

    dispatch(login(emailVal, passwordVal));
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <h2 className={styles.loginTitle}>Sign In</h2>
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
          {loading ? "..." : "Sign In"}
        </button>
        <NavLink
          to="/signup"
          style={{
            textDecoration: "none",
            color: "#224957",
            fontFamily: "Quicksand",
          }}
        >
          <p style={{ fontWeight: "600", margin: 0 }}>Or SignUp instead</p>
        </NavLink>
      </form>
    </div>
  );
};

export default LoginPage;
