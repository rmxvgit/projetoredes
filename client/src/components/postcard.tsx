import { Post } from "@/lib/interfaces";
import { JSX } from "react";

export function makePostCard(data: Post) {
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
