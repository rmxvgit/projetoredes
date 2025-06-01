"use client";

import { register } from "@/lib/requisition";
import { Formik, Field, Form } from "formik";
import React, { useState } from "react";

export default function RegisterForm() {
  const [file, setFile] = useState<File | null>(null);

  function formSubmit(data: {
    name: string;
    password: string;
    bio: string;
    job: string;
  }) {
    const result = register(data, file);

    result.then((data) => console.log(data));
    result.catch((err) => console.log(err));
  }

  return (
    <Formik
      initialValues={{ name: "", password: "", bio: "", job: "" }}
      onSubmit={formSubmit}
    >
      <Form>
        <label htmlFor="name">nome:</label>
        <Field type="text" id="name" name="name" required />

        <label htmlFor="password">senha:</label>
        <Field type="password" id="password" name="password" required />

        <label htmlFor="bio">bio:</label>
        <Field type="text" id="bio" name="bio" required />

        <label htmlFor="job">cargo:</label>
        <Field as="select" name="job" id="job" required>
          <option value="student">Estudante</option>
          <option value="professor">Professor</option>
        </Field>

        <label htmlFor="image">image:</label>
        <input
          type="file"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFile(
              event.currentTarget.files ? event.currentTarget.files[0] : null,
            );
          }}
        ></input>

        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
}
