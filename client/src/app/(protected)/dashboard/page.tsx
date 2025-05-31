"use client";
import { getPosts, getUsers } from "@/lib/requisition";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const [profCards, setProfCards] = useState<CardProfessor[]>([]);
  const [studentCards, setStudentCards] = useState<CardStudent[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    }

    setProfCards(placeholderProfessors);

    setStudentCards(placeholderStudents);

    const response = Promise.all([getPosts(), getUsers()]);
    setLoading(true);

    response.then((data) => {
      setPosts(data[0]);
      setProfCards(
        data[1].filter((professor) => professor.job === "professor"),
      );
      setStudentCards(data[1].filter((student) => student.job === "student"));
      setLoading(false);
    });

    response.catch((error: AxiosError) => {
      if (error instanceof AxiosError) {
        router.push("/login");
        localStorage.removeItem("token");
        return;
      }
    });
  }, [setProfCards, setStudentCards, setPosts, router, setLoading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col p-14">
      {/* seção de professores */}
      <h2 className="p-3 text-3xl font-bold">Professores</h2>
      <div className="p-3 grid grid-cols-5 gap-3 mb-8">
        {profCards.map((prof) => (
          <Link
            key={prof.id}
            href={`/profile/${encodeURIComponent(prof.id)}`}
            className="bg-white rounded-lg shadow-md p-4 border"
          >
            <h3 className="text-lg font-bold">{prof.name}</h3>
          </Link>
        ))}
      </div>

      {/* seção de alunos */}
      <h2 className="p-3 text-3xl font-bold">Alunos</h2>
      <div className="p-3 grid grid-cols-5 gap-3 mb-8">
        {studentCards.map((prof) => (
          <Link
            key={prof.id}
            href={`/profile/${encodeURIComponent(prof.id)}`}
            className="bg-white rounded-lg shadow-md p-4 border"
          >
            <h3 className="text-lg font-bold">{prof.name}</h3>
          </Link>
        ))}
      </div>

      {/* postagens recentes */}
      <h2 className="p-5 text-2xl font-bold">Últimas postagens</h2>
      <div className="p-3 flex flex-col gap-3 mb-8">
        {posts.map(makePostCard)}
      </div>
    </div>
  );
}

function makePostCard(data: Post) {
  let content: JSX.Element = <></>;
  let doc_type: string = "none";

  if ("png" in data) {
    content = <div>png content</div>;
    doc_type = "png";
  }

  if ("pdf" in data) {
    content = <div>pdf content</div>;
    doc_type = "pdf";
  }

  if ("txt" in data) {
    content = <div className="p-3 border rounded">{data.body}</div>;
    doc_type = "txt";
  }

  return (
    <div
      key={`${data.id}${doc_type}`}
      className="bg-white rounded-lg shadow-md p-4 border"
    >
      <div className="flex justify-between">
        <h4 className="font-bold text-sm">{data.author_name} postou:</h4>
        <p className="bg-blue-400 px-2 rounded-full">{doc_type}</p>
      </div>
      <p className="p text-lg font-bold mb-3">{data.title}</p>
      {content}
    </div>
  );
}

interface CardProfessor {
  id: number;
  name: string;
}

interface CardStudent {
  id: number;
  name: string;
}

export interface CardTxtPost {
  txt: undefined;
  id: number;
  author_name: string;
  author_id: number;
  title: string;
  body: string;
}

export interface CardPdfPost {
  pdf: undefined;
  id: number;
  author_name: string;
  author_id: number;
  file_name: string;
  title: string;
}

export interface CardPngPost {
  png: undefined;
  id: number;
  author_name: string;
  author_id: number;
  file_name: string;
  title: string;
}

export type Post = CardTxtPost | CardPdfPost | CardPngPost;

const placeholderStudents: CardStudent[] = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alice Johnson" },
];

const placeholderProfessors: CardProfessor[] = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 4, name: "Alice Johnson" },
  { id: 5, name: "Alice Johnson" },
  { id: 6, name: "Alice Johnson" },
  { id: 7, name: "Alice Johnson" },
];
