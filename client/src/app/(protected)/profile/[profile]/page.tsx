"use client";
import { getUserProfile } from "@/lib/requisition";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { makePostCard } from "@/components/postcard";
import { UserProfileData } from "@/lib/interfaces";
import { Formik, Form, Field } from "formik";

export default function UserProfilePage() {
  const params = useParams<{ profile: string }>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const profile_id = params.profile;

  const [user, setUser] = useState<UserProfileData>({
    owner: true,
    name: "",
    bio: "",
    image: "",
    job: "",
    posts: [],
  });

  function postFormSubmit(values: { title: string; body: string }) {
    console.log("submit button pressed");
    console.log(values);
  }

  useEffect(() => {
    const response = getUserProfile(profile_id);

    response.then((result) => {
      setUser(result);
      setLoading(false);
    });

    response.catch((err) => {
      if (err instanceof AxiosError) {
        if (err.status === 403) {
          router.push("/login");
        }
      }
      console.error(err);
      setLoading(false);
    });
  }, [setUser, profile_id, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-12 flex flex-col gap-10">
      <div className="flex p-3 rounded gap-12">
        {/* foto de perfil */}
        <div className="flex gap-10 justify-center">
          <div className="border rounded-full w-60 aspect-square"></div>
        </div>

        {/* nome e cargo */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-6">
            <h1 className="text-5xl font-bold content-center">
              {user.owner ? "Seu perfil" : `${user.name}`}
            </h1>
            <p className="content-center text-4xl font-bold">-</p>
            <p className="content-center text-2xl">{user.job}</p>
          </div>
          {user.owner ? (
            <button className="bg-blue-400 rounded-xl p-2 text-2xl font-bold w-fit hover:bg-blue-500">
              Editar perfil
            </button>
          ) : null}
        </div>
      </div>

      {/* bio */}
      <div className="border p-3 rounded-lg flex flex-col gap-5">
        <h2 className="text-2xl font-bold">Sobre mim:</h2>
        <p className="border">
          {user.bio === "" ? "Não há bio disponível." : user.bio}
        </p>
      </div>

      {/* nova postagem */}
      {user.owner ? (
        <div className="rounded-lg border p-3 flex flex-col gap-5">
          <h2 className="text-2xl font-bold">Nova postagem:</h2>
          <Formik
            initialValues={{ title: "", body: "" }}
            onSubmit={postFormSubmit}
          >
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
        </div>
      ) : null}

      {/* postagens */}
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl p-3 font-bold">Postagens:</h2>
        {user.posts.map(makePostCard)}
      </div>
    </div>
  );
}
