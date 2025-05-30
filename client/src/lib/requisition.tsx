"use client";
const backendUrl = "http://localhost:3001";
import axios from "axios";
import {
  CardPdfPost,
  CardTxtPost,
  CardPngPost,
  Post,
} from "@/app/(protected)/dashboard/page";

export async function login(values: { name: string; password: string }) {
  const response = await axios.post(`${backendUrl}/auth/login`, values);
  return response;
}

export async function getPosts() {
  const token = localStorage.getItem("token");
  const txt_posts_promise = axios.get(`${backendUrl}/post/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const pdf_posts_promise = axios.get(`${backendUrl}/pdf/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const png_posts_promise = axios.get(`${backendUrl}/png/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const result = await Promise.all([
    txt_posts_promise,
    pdf_posts_promise,
    png_posts_promise,
  ]);

  const [txt_result, pdf_result, png_result] = result.values();

  if (
    txt_result.status === 200 &&
    pdf_result.status === 200 &&
    png_result.status === 200
  ) {
    const txts: CardTxtPost[] = txt_result.data;
    const pdfs: CardPdfPost[] = pdf_result.data;
    const pngs: CardPngPost[] = png_result.data;

    const posts: Post[] = [...txts, ...pdfs, ...pngs];

    return posts;
  }

  console.log(txt_result.data);
  console.log(pdf_result.data);
  console.log(png_result.data);

  return null;
}
