"use client";

import { useState } from "react";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nome: "",
    senha: "",
    cargo: "",
    bio: "",
    imagem: null as File | null,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, imagem: file }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-blue-300 p-8 rounded shadow-lg flex flex-col gap gap-0"
      >
        <h2 className="text-2xl font-bold mb-6 text-left">Cadastro</h2>

        <label className="block mb-2 text-sm font-medium">Nome:</label>
        <input
          type="text"
          name="nome"
          placeholder="Digite seu nome"
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 rounded border border-gray-300 bg-white"
        />

        <label className="block mb-2 text-sm font-medium">Senha:</label>
        <input
          type="password"
          name="senha"
          placeholder="Digite sua senha"
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 rounded border border-gray-300 bg-white"
        />

        <label className="block mb-2 text-sm font-medium">Cargo:</label>
        <select
          name="cargo"
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 rounded border border-gray-300 bg-white"
        >
          <option value="">Selecione um cargo</option>
          <option value="dev">Desenvolvedor</option>
          <option value="admin">Administrador</option>
          <option value="designer">Designer</option>
        </select>

        <label className="block mb-2 text-sm font-medium">Bio:</label>
        <textarea
          name="bio"
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 rounded border border-gray-300 bg-white"
        />

        <label className="block mb-2 text-sm font-medium">Foto de perfil:</label>
        <input
          type="file"
          name="imagem"
          onChange={handleFileChange}
          className="w-full mb-4 bg-white"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Cadastrar
        </button>

        <p className="text-center mt-4">
          <a href="/login" className="text-blue-800 text-sm hover:underline">
            já tem conta? faça login
          </a>
        </p>
      </form>
    </div>
  );
}
