"use client";
import { getUserProfile } from "@/lib/requisition";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function UserProfilePage() {
  const params = useParams<{ profile: string }>();
  const profile_id = params.profile;

  const [user, setUser] = useState<UserProfileData>({
    owner: true,
    name: "placeholder user name",
    image: "placeholder user image",
    job: "professor",
  });

  useEffect(() => {
    const response = getUserProfile(profile_id);

    response.then((result) => {
      console.log(result);
    });

    response.catch((err) => console.error(err));

    setUser({
      owner: true,
      name: "placeholder user name",
      image: "placeholder user image",
      job: "professor",
    });
  }, [setUser, profile_id]);

  return (
    <div className="p-6 flex flex-col">
      <div>{user.name}</div>
      <div>{user.job}</div>
    </div>
  );
}

interface UserProfileData {
  owner: boolean;
  name: string;
  image: string;
  job: string;
}
