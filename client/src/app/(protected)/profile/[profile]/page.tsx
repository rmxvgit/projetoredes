"use client";
import { getPngUrl, getUserProfile } from "@/lib/requisition";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { makePostCard } from "@/components/postcard";
import { UserProfileData } from "@/lib/interfaces";
import Image from "next/image";
import NewPostForm from "./forms";

export default function UserProfilePage() {
  const params = useParams<{ profile: string }>();
  const [loading, setLoading] = useState(true);
  const [newPostType, setPostType] = useState<"pdf" | "png" | "txt">("txt");
  const router = useRouter();
  const profile_id = params.profile;

  const [user, setUser] = useState<UserProfileData>({
    id: 0,
    owner: true,
    name: "",
    bio: "",
    image: "",
    job: "",
    posts: [],
  });

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
          <div className="border rounded-full w-60 aspect-square overflow-hidden">
            <Image
              src={getPngUrl(user.id, "user")}
              alt="profile image"
              width={160}
              height={160}
              className="w-full"
            />
          </div>
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
        <p className="border rounded-lg p-2">
          {user.bio === "" ? "Não há bio disponível." : user.bio}
        </p>
      </div>

      {/* nova postagem */}
      {user.owner ? (
        <div className="rounded-lg border p-3 flex flex-col gap-5">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Nova postagem:</h2>
            <div className="flex gap-3">
              <button
                className="p-2 rounded-lg border"
                onClick={() => setPostType("txt")}
              >
                Texto
              </button>
              <button
                className="p-2 rounded-lg border"
                onClick={() => setPostType("pdf")}
              >
                Pdf
              </button>
              <button
                className="p-2 rounded-lg border"
                onClick={() => setPostType("png")}
              >
                Png
              </button>
            </div>
          </div>

          {NewPostForm(newPostType)}
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
