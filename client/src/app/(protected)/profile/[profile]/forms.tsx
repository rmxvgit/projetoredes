import { Formik, Form, Field } from "formik";
import Image from "next/image";

export default function NewPostForm(post_type: "png" | "pdf" | "txt" | "none") {
  if (post_type == "txt") {
    return NewTxtForm();
  }

  if (post_type == "png") {
    return NewPngForm();
  }

  return NewPdfForm();
}

export function NewPngForm() {
  function postFormSubmit(values: { title: string }) {
    console.log("submit button pressed");
    console.log(values);
  }

  return (
    <Formik initialValues={{ title: "" }} onSubmit={postFormSubmit}>
      <Form className="flex flex-col gap-3">
        <Field
          name="title"
          placeholder="Título do png"
          className="border p-2 rounded"
        ></Field>

        <div className="flex gap-3 border rounded-lg p-2 w-fit">
          <Image src="/file.svg" alt="file icon" height={20} width={20} />
          <input type="file" placeholder="batata" className="text-lg" />
        </div>
      </Form>
    </Formik>
  );
}

export function NewPdfForm() {
  function postFormSubmit(values: { title: string }) {
    console.log("submit button pressed");
    console.log(values);
  }

  return (
    <Formik initialValues={{ title: "" }} onSubmit={postFormSubmit}>
      <Form className="flex flex-col gap-3">
        <Field
          name="title"
          placeholder="Título do pdf"
          className="border p-2 rounded"
        ></Field>

        <div className="flex gap-3 border rounded-lg p-2 w-fit">
          <Image src="/file.svg" alt="file icon" height={20} width={20} />
          <input type="file" placeholder="batata" className="text-lg"></input>
        </div>
      </Form>
    </Formik>
  );
}

export function NewTxtForm() {
  function postFormSubmit(values: { title: string; body: string }) {
    console.log("submit button pressed");
    console.log(values);
  }

  return (
    <Formik initialValues={{ title: "", body: "" }} onSubmit={postFormSubmit}>
      <Form className="flex flex-col gap-3">
        <Field
          name="title"
          placeholder="Título"
          className="border p-2 rounded"
        />
        <Field
          name="body"
          placeholder="Conteúdo"
          className="border p-2 rounded"
        />
      </Form>
    </Formik>
  );
}
