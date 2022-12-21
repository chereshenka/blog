import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../../store/reducers/actions";

import styles from "./registration-page.module.scss";

const RegistrationPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm({
    mode: "onBlur",
  });
  const push = useNavigate();

  const dispatch = useDispatch();
  const [registered, setRegisterMessage] = useState({
    message: "",
    success: "",
  });
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const onSubmit = async (data) => {
    const url = new URL("https://blog.kata.academy/api/users");
    const { username, email, password } = data;

    try {
      const res = await userRegistration(url, username, email, password);
      if (res.status === 422) {
        const error = await res.json();
        setRegisterMessage((state) => {
          return {
            ...state,
            message: "",
            success: false,
          };
        });
        setUsernameError(error.errors.username || "");
        setEmailError(error.errors.email || "");
      }

      const json = res.json();
      if (json.username) {
        localStorage.setItem("token", json.token);
        dispatch(
          loginUser({
            isLoggedIn: true,
            user: res,
          }),
        );
        setRegisterMessage((state) => {
          return {
            ...state,
            message: "Registration successfull",
            success: true,
          };
        });
        setUsernameError("");
        setEmailError("");
        reset();
        push("/");
      } else {
        setRegisterMessage((state) => {
          return { ...state, message: "Wrong data input", success: false };
        });
      }
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const password = watch("password", "");
  return (
    <>
      <div className={styles.registration_container}>
        <h3 className={styles.registration_title}>Create new account</h3>
        <p className={registered.success ? styles.success : styles.errors}>
          {registered.message}
        </p>
        <div className={styles.registration_form}>
          <form
            onChange={() =>
              setRegisterMessage((state) => {
                return { ...state, message: "" };
              })
            }
            onSubmit={handleSubmit(onSubmit)}
          >
            <label>
              <p className={styles.registration_header}>Username</p>
              <input
                className={
                  styles.inputSize +
                  " " +
                  styles.registration_input_name +
                  " " +
                  (errors?.username && errors?.username?.message
                    ? styles.input_error
                    : null)
                }
                {...register("username", {
                  required: "Input username.",
                  minLength: {
                    value: 3,
                    message: "Min 3 char",
                  },
                  maxLength: {
                    value: 20,
                    message: "Max 20 char",
                  },
                })}
                placeholder="Username"
                onChange={() => setUsernameError("")}
              />
              <span className={styles.errors}>
                {errors?.username && errors?.username?.message}

                {registered.success === false && usernameError
                  ? usernameError
                  : null}
              </span>
            </label>

            <label>
              <p className={styles.registration_header}>Email adress</p>
              <input
                className={
                  styles.inputSize +
                  " " +
                  styles.registration_input_email +
                  " " +
                  (errors?.email && errors?.email?.message
                    ? styles.input_error
                    : null)
                }
                type="email"
                {...register("email", {
                  required: "Input email.",
                  pattern: {
                    value: /.+@.+..+/i,
                    message: "Should input valid email.",
                  },
                })}
                placeholder="Email adress"
                onChange={() => setEmailError("")}
              />
              <span className={styles.errors}>
                {errors?.email && errors?.email?.message}
                {registered.success === false && emailError ? emailError : null}
              </span>
            </label>

            <label>
              <p className={styles.registration_header}>Password</p>
              <input
                className={
                  styles.registration_input_password +
                  " " +
                  styles.inputSize +
                  " " +
                  (errors?.password && errors?.password?.message
                    ? styles.input_error
                    : null)
                }
                {...register("password", {
                  required: "Input password.",
                  minLength: {
                    value: 6,
                    message: "Min 6 char",
                  },
                  maxLength: {
                    value: 40,
                    message: "Max 40 char",
                  },
                })}
                type="password"
                placeholder="Password"
              />
              <span className={styles.errors}>
                {errors?.password && errors?.password?.message}
              </span>
            </label>

            <label>
              <p className={styles.registration_header}>Repeat Password</p>
              <input
                className={
                  styles.registration_input_password +
                  " " +
                  styles.inputSize +
                  " " +
                  (errors?.password && errors?.password?.message
                    ? styles.input_error
                    : null)
                }
                {...register("repeat", {
                  required: "Repeat password.",
                  minLength: {
                    value: 6,
                    message: "Min 6 char",
                  },
                  maxLength: {
                    value: 40,
                    message: "Max 40 char",
                  },
                  validate: (value) =>
                    value === password || "The passwords do not match",
                })}
                type="password"
                placeholder="Password"
              />
              <span className={styles.errors}>
                {errors?.repeat && errors?.repeat?.message}
              </span>
            </label>

            <label className={styles.registration_terms}>
              <input
                type="checkbox"
                id="checkbox"
                className={
                  styles.registration_terms_box +
                  " " +
                  (errors?.checkbox && errors?.checkbox?.message
                    ? styles.input_error
                    : null)
                }
                {...register("checkbox", {
                  required: "should be checked befor submitting",
                })}
              />
              <p
                className={
                  styles.registration_terms_message +
                  " " +
                  (errors?.checkbox && errors?.checkbox?.message
                    ? styles.errors
                    : "")
                }
              >
                I agree to the processing of my personal information
                {}
              </p>
            </label>

            <input
              type="submit"
              className={styles.registration_submit + " " + styles.input_size}
              value="Create"
            />
          </form>
        </div>
        <p className={styles.registration_registration_text}>
          Already have an account?
          <Link
            className={styles.registration_registration_redirect}
            to="/sing-in"
          >
            Sign In.
          </Link>
        </p>
      </div>
    </>
  );
};

export default RegistrationPage;
