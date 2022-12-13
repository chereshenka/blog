import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux/es";

import { loginUser, token } from "../../store/reducers/actions";

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

  const onSubmit = async (data) => {
    const urlBase = new URL("https://blog.kata.academy/api/user");
    const { username, email, password, image } = data;
    await fetch(urlBase, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
          username: username,
          image: image,
        },
      }),
    })
      .then((response) => {
        if (response.status === 422) {
          setStatusMessage((state) => {
            return { ...state, message: "invalid username", success: false };
          });
          return;
        }
        if (response.ok) {
          setStatusMessage((state) => {
            return {
              ...state,
              message: "Profile changed succesful",
              success: true,
            };
          });
          reset();
        }
        return response.json();
      })
      .then((json) => {
        localStorage.setItem("token", json.user.token);
        dispatch(loginUser({ isLoggedIn: true, user: json.user }));
        reset();
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  };

  return (
    <>
      <div className={styles.profile_container}>
        <h3 className={styles.profile_title}>Edit profile</h3>
        <p className={status.success ? styles.success : styles.errors}>
          {status.message ? status.message : null}
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
                className={styles.profile_input_name}
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
                {status.success === false && status.message.username
                  ? status.message.username
                  : null}
              </span>
            </label>
            <label>
              <p className={styles.profile_label}>Email adress</p>
              <input
                className={styles.profile_input_email}
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
                  : null}
              </span>
            </label>
            <label>
              <p className={styles.profile_label}>New Password</p>
              <input
                className={styles.profile_input_password}
                type="password"
                required
                placeholder="New password"
              />
            </label>
            <label>
              <p className={styles.profile_label}>Avatar Image (url)</p>
              <input
                className={styles.profile_input_image}
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
              />
              <span className={styles.errors}>
                {errors?.image && errors?.image?.message}
                {status.success === false && status.message.image
                  ? status.message.image
                  : null}
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
