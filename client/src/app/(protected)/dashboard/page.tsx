"use client";
import { useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const [profCards, setProfCards] = useState<CardProfessor[]>([]);
  const [studentCards, setStudentCards] = useState<CardStudent[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    }

    setProfCards(placeholderProfessors);

    setStudentCards(placeholderStudents);

    setPosts(placeholderPosts);
  }, [setProfCards, setStudentCards, setPosts, router]);

  return (
    <div className="flex flex-col p-14">
      {/* seção de professores */}
      <h2 className="p-3 text-3xl font-bold">Professores</h2>
      <div className="p-3 grid grid-cols-5 gap-3 mb-8">
        {profCards.map((prof) => (
          <div
            key={prof.id}
            className="bg-white rounded-lg shadow-md p-4 border"
          >
            <h3 className="text-lg font-bold">{prof.name}</h3>
          </div>
        ))}
      </div>

      {/* seção de alunos */}
      <h2 className="p-3 text-3xl font-bold">Alunos</h2>
      <div className="p-3 grid grid-cols-5 gap-3 mb-8">
        {studentCards.map((prof) => (
          <div
            key={prof.id}
            className="bg-white rounded-lg shadow-md p-4 border"
          >
            <h3 className="text-lg font-bold">{prof.name}</h3>
          </div>
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
    <div key={data.id} className="bg-white rounded-lg shadow-md p-4 border">
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
  id: string;
  name: string;
}

interface CardStudent {
  id: string;
  name: string;
}

export interface CardTxtPost {
  txt: undefined;
  id: string;
  author_name: string;
  file_name: string;
  title: string;
  body: string;
}

export interface CardPdfPost {
  pdf: undefined;
  id: string;
  author_name: string;
  file_name: string;
  title: string;
}

export interface CardPngPost {
  png: undefined;
  id: string;
  author_name: string;
  file_name: string;
  title: string;
}

export type Post = CardTxtPost | CardPdfPost | CardPngPost;

const placeholderStudents = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Alice Johnson" },
];

const placeholderProfessors = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Alice Johnson" },
];

const placeholderPosts: Post[] = [
  {
    id: "1",
    author_name: "John Doe",
    file_name: "file1.pdf",
    title: "Title 1",
    pdf: undefined,
  },
  {
    id: "2",
    author_name: "Jane Smith",
    file_name: "file2.png",
    title: "Title 2",
    png: undefined,
  },
  {
    id: "3",
    author_name: "Alice Johnson",
    file_name: "file3.txt",
    title: "Title 3",
    body: "É da minha opinião que eu gosto de batata",
    txt: undefined,
  },
];
