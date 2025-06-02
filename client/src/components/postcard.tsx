import { Post } from "@/lib/interfaces";
import { getPngUrl } from "@/lib/requisition";
import Image from "next/image";
import { JSX } from "react";

export function makePostCard(data: Post) {
  let content: JSX.Element = <></>;
  let doc_type: string = "none";

  if ("png" in data) {
    content = (
      <div className="flex justify-center">
        <Image
          src={getPngUrl(data.id, "post")}
          alt="postagem"
          width={500}
          height={500}
          className="w-full rounded-lg"
        />
      </div>
    );
    doc_type = "png";
  }

  if ("pdf" in data) {
    content = <div>pdf content</div>;
    doc_type = "pdf";
  }

  if ("txt" in data) {
    content = <p>{data.body}</p>;
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
