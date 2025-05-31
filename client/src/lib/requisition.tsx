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

  const result = await Promise.all([
    axios.get(`${backendUrl}/post/recent`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    axios.get(`${backendUrl}/pdf/recent`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    axios.get(`${backendUrl}/png/recent`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  ]);

  const [txt_result, pdf_result, png_result] = result.values();

  if (
    txt_result.status === 200 &&
    pdf_result.status === 200 &&
    png_result.status === 200
  ) {
    const txts: ServerTxtPost[] = txt_result.data;
    const pdfs: ServerPdfPost[] = pdf_result.data;
    const pngs: ServerPngPost[] = png_result.data;

    const posts: Post[] = [
      ...txts.map(servToCardTxtPost),
      ...pdfs.map(servToCardPdfPost),
      ...pngs.map(servToCardPngPost),
    ];

    return posts;
  }

  throw new Error("Failed to fetch posts");
}

export async function getUsers() {
  const token = localStorage.getItem("token");

  const result = await axios.get(`${backendUrl}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (result.status === 200) {
    const user: ServerUser[] = result.data;

    return user;
  }

  throw new Error("Failed to fetch user");
}

export async function getUserProfile(user_id: string) {
  const token = localStorage.getItem("token");

  const result = await axios.get(`${backendUrl}/user/profile${user_id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (result.status === 200) {
    const user: ServerUserProfile = result.data;

    return user;
  }

  throw new Error("Failed to fetch user");
}

interface ServerUserProfile {
  owner: boolean;
  name: string;
  image: string;
  job: string;
}

interface ServerUser {
  id: number;
  name: string;
  image: string;
  job: string;
}

interface ServerTxtPost {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
  user: {
    id: number;
    name: string;
  };
}

interface ServerPdfPost {
  id: number;
  title: string;
  file_name: string;
  createdAt: Date;
  user: {
    id: number;
    name: string;
  };
}

interface ServerPngPost {
  id: number;
  title: string;
  file_name: string;
  createdAt: Date;
  user: {
    id: number;
    name: string;
  };
}

function servToCardTxtPost(post: ServerTxtPost): CardTxtPost {
  return {
    txt: undefined,
    id: post.id,
    title: post.title,
    body: post.body,
    author_id: post.user.id,
    author_name: post.user.name,
  };
}

function servToCardPdfPost(post: ServerPdfPost): CardPdfPost {
  return {
    pdf: undefined,
    id: post.id,
    title: post.title,
    file_name: post.file_name,
    author_id: post.user.id,
    author_name: post.user.name,
  };
}

function servToCardPngPost(post: ServerPngPost): CardPngPost {
  return {
    png: undefined,
    id: post.id,
    title: post.title,
    file_name: post.file_name,
    author_id: post.user.id,
    author_name: post.user.name,
  };
}
