"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PesquisarPorIdProps {
  onPesquisar: (id: number) => void;
}

export default function PesquisarPorId({ onPesquisar }: PesquisarPorIdProps) {
  const [id, setId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const idNumber = Number(id);
    if (isNaN(idNumber) || idNumber <= 0) {
      alert("Informe um ID válido (número positivo)");
      return;
    }
    onPesquisar(idNumber);
    setId(""); // limpa campo depois
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center mb-4">
      <Input
        type="number"
        placeholder="Digite o ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="w-40"
      />
      <Button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white"
      >
        Pesquisar ID
      </Button>
    </form>
  );
}
