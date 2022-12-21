import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux/es";

import { changeUserData } from "../../fetch-server/change-profile";
import { loginUser } from "../../store/reducers/actions";

import styles from "./profile-page.module.scss";

const ProfilePage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: "onBlur" });

  const dispatch = useDispatch();
  const [status, setStatusMessage] = useState({
    message: "",
    success: "",
  });
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const onSubmit = async (data) => {
    const url = new URL("https://blog.kata.academy/api/user");
    const { username, email, password, image } = data;
    try {
      const res = await changeUserData(url, username, email, password, image);

      if (res.status === 422) {
        const error = await res.json();
        setStatusMessage((state) => {
          return {
            ...state,
            message: "",
            success: false,
          };
        });
        setUsernameError(error.errors.username || "");
        setEmailError(error.errors.email || "");
        return;
      }
      if (res.ok) {
        setStatusMessage((state) => {
          return {
            ...state,
            message: "Profile changed succesful",
            success: true,
          };
        });
        const json = await res.json();
        localStorage.setItem("token", json.user.token);
        dispatch(loginUser({ isLoggedIn: true, user: json.user }));
        reset();
      }
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return (
    <>
      <div className={styles.profile_container}>
        <h3 className={styles.profile_title}>Edit profile</h3>
        <p className={status.success ? styles.success : styles.errors}>
          {status.message ? status.message : ""}
        </p>
        <div className={styles.profile_form}>
          <form
            onChange={() =>
              setStatusMessage((state) => {
                return { ...state, message: "", success: "" };
              })
            }
            onSubmit={handleSubmit(onSubmit)}
          >
            <label>
              <p className={styles.profile_label}>Username</p>
              <input
                className={styles.profile_input_name + " " + styles.input_size}
                type="text"
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
              />
              <span className={styles.errors}>
                {errors?.username && errors?.username?.message}
                {status.success === false && usernameError ? usernameError : ""}
              </span>
            </label>
            <label>
              <p className={styles.profile_label}>Email adress</p>
              <input
                className={styles.profile_input_email + " " + styles.input_size}
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
                {status.success === false && status.message.email
                  ? status.message.email
                  : ""}
              </span>
            </label>
            <label>
              <p className={styles.profile_label}>New Password</p>
              <input
                className={
                  styles.profile_input_password + " " + styles.input_size
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
                {status.success === false && status.message.password
                  ? status.message.password
                  : ""}
              </span>
            </label>
            <label>
              <p className={styles.profile_label}>Avatar Image (url)</p>
              <input
                className={styles.profile_input_image + " " + styles.input_size}
                type="text"
                {...register("image", {
                  required: "Input image url.",
                  pattern: {
                    value:
                      /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/,
                    message: "Link should be valid",
                  },
                })}
                placeholder="Image Url"
                defaultValue=""
              />
              <span className={styles.errors}>
                {errors?.image && errors?.image?.message}
                {status.success === false && emailError ? emailError : ""}
              </span>
            </label>
            <button type="submit" className={styles.profile_submit}>
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
