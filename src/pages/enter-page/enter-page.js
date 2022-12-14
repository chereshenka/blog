import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux/es";

import { loginUser } from "../../store/reducers/actions";

import styles from "./enter-page.module.scss";

const EnterPage = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.loginReducer);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onBlur" });

  const push = useNavigate();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    if (!isLoggedIn) {
      const urlBase = new URL("https://blog.kata.academy/api/users/login");
      const { email, password } = data;
      try {
        const response = await fetch(urlBase, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              email: email,
              password: password,
            },
          }),
        });

        if (response.status === 422) {
          setError((state) => {
            return {
              ...state,
              message: "email or password is invalid",
              state: false,
            };
          });
          return;
        }
        if (response.status === 402) {
          setError((state) => {
            return {
              ...state,
              message: "Already logged in.",
              state: false,
            };
          });
        }
        if (response.ok) {
          const data = await response.json();
          if (!localStorage.getItem("token"))
            localStorage.setItem("token", data.user.token);
          dispatch(
            loginUser({
              isLoggedIn: true,
              user: data.user,
            }),
          );
          push("/");
        }
      } catch (e) {
        throw new Error(e.message);
      }
    }
  };

  if (isLoggedIn) push("/");

  return (
    <>
      <div className={styles.enter_container}>
        <h3 className={styles.enter_title}>Sing In</h3>
        <p className={styles.errors}>{error.state ? null : error.message}</p>
        <div className={styles.enter_form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              <p className={styles.enter_header}>Email adress</p>
              <input
                className={
                  styles.enter_input_email + "" + errors?.email &&
                  errors?.email?.message
                    ? styles.input_error
                    : null
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
              />
              <span className={styles.errors}>
                {errors?.email && errors?.email?.message}
              </span>
            </label>

            <label>
              <p className={styles.enter_header}>Password</p>
              <input
                className={
                  styles.enter_input_password + "" + errors?.password &&
                  errors?.password?.message
                    ? styles.input_error
                    : null
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
            <input
              type="submit"
              className={styles.enter_submit}
              value="Login"
            />
          </form>
        </div>
        <p className={styles.enter_registration_text}>
          Don’t have an account?{" "}
          <Link className={styles.enter_registration_redirect} to="/sing-up">
            Sign Up.
          </Link>
        </p>
      </div>
    </>
  );
};

export default EnterPage;
