import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux/es";

import { fetchArticlesGlobal } from "../../store/reducers/actions";
import { fetchEditDeleteArticle } from "../../fetch-server/article-edit-delete";

import styles from "./article-editor.module.scss";

const ArticleEditor = (props) => {
  const param = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: "onBlur" });

  const initialState = props.data?.tagList || [""];

  const [input, addInput] = useState(initialState);

  const onAddTagField = () => {
    const item = "";
    addInput((state) => [...state, item]);
  };

  const onDeleteTag = (index) => {
    const arr = input.filter((tag, id) => {
      return id !== Number(index) ? tag : false;
    });
    addInput(arr);
  };

  const [status, setStatusMessage] = useState({ message: "", success: null });

  const changeTagValue = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    const arr = input.map((tag, index) => (index === Number(id) ? value : tag));
    addInput(arr);
  };

  const onSubmit = async (data) => {
    const urlBase = new URL("https://blog.kata.academy/api/articles");

    const method = location.pathname === "/new-article" ? "POST" : "PUT";
    const url =
      location.pathname === "/new-article"
        ? urlBase
        : `${urlBase}` + `/${param.id}`;

    try {
      const res = await fetchEditDeleteArticle(data, url, method, input);
      if (res.status === 401) {
        setStatusMessage((state) => {
          return {
            ...state,
            message: "Something went wrong",
            success: false,
          };
        });
        res;
      }
      if (res.status === 200) {
        setStatusMessage((state) => {
          return {
            ...state,
            message: "Article published successfull",
            success: true,
          };
        });
        dispatch(fetchArticlesGlobal());
      }
    } catch (e) {
      throw new Error(e.message);
    }
    addInput([""]);
    reset();
  };

  const tagArray = input.map((tag, index) => (
    <div key={index + tag} className={styles.new_article_tagItem}>
      <input
        id={index}
        className={styles.new_article_tag}
        placeholder="tag"
        defaultValue={tag}
        onBlur={(e) => changeTagValue(e)}
      />
      <input
        type="button"
        className={styles.new_article_tag_delete}
        onClick={() => onDeleteTag(index)}
        value="Delete"
      />
    </div>
  ));

  return (
    <div className={styles.new_article_container}>
      <h3 className={styles.new_article_title}>{props.title}</h3>
      <p className={status.success ? styles.success : styles.errors}>
        {status.message ? status.message : null}
      </p>
      <div className={styles.new_article_form}>
        <form
          onChange={() =>
            setStatusMessage((state) => {
              return { ...state, message: "", success: "" };
            })
          }
          onSubmit={handleSubmit(onSubmit)}
        >
          <label>
            <p className={styles.new_article_header}>Title</p>
            <input
              className={
                styles.input_size +
                " " +
                (errors?.title && errors?.title?.message
                  ? styles.input_error
                  : null)
              }
              {...register("title", {
                required: "Input title, its important.",
                minLength: {
                  value: 3,
                  message: "Min 3 char",
                },
              })}
              placeholder="Title"
              defaultValue={props.data?.title}
            />
            <span className={styles.errors}>
              {errors?.title && errors?.title?.message}
            </span>
          </label>

          <label>
            <p className={styles.new_article_header}>Short description</p>
            <input
              className={
                styles.input_size +
                " " +
                (errors?.description && errors?.description?.message
                  ? styles.input_error
                  : null)
              }
              type="text"
              {...register("description", {
                required: "input short desctiption.",
                minLength: {
                  value: 3,
                  message: "Min 3 char",
                },
                maxLength: {
                  value: 100,
                  message: "Max 100 char",
                },
              })}
              placeholder="Short description"
              defaultValue={props.data?.description}
            />
            <span className={styles.errors}>
              {errors?.description && errors?.description?.message}
            </span>
          </label>

          <label className={styles.new_article_textarea}>
            <p className={styles.new_article_header}>Text</p>
            <textarea
              className={
                styles.new_article_input_text +
                " " +
                (errors?.body && errors?.body?.message
                  ? styles.input_error
                  : null)
              }
              {...register("body", {
                required: "Input your article text.",
                minLength: {
                  value: 6,
                  message: "Min 6 char",
                },
                maxLength: {
                  value: 1000,
                  message: "Max 1000 char",
                },
              })}
              placeholder="Text"
              defaultValue={props.data?.body}
            />
            <span className={styles.errors}>
              {errors?.body && errors?.body?.message}
            </span>
          </label>

          <div>
            <p className={styles.new_article_header}>Tags</p>
            <div className={styles.new_article_tag_container}>
              <div className={styles.new_article_tags_collection}>
                {tagArray}
              </div>
              <input
                type="button"
                className={styles.new_article_tag_add}
                onClick={onAddTagField}
                value="Add tag"
              />
            </div>
          </div>
          <input
            type="submit"
            className={styles.new_article_submit}
            value="Send"
          />
        </form>
      </div>
    </div>
  );
};

export default ArticleEditor;
