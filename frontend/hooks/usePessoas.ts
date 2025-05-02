import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
  sexo: string;
  altura: number;
  peso: number;
}

const BASE_URL = "http://localhost:8000/api/pessoa";

export function usePessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requestLog, setRequestLog] = useState<string[]>([]);

  const logRequest = (action: string, data: any) => {
    setRequestLog((prev) => [
      `${new Date().toLocaleTimeString()} → ${action}: ${JSON.stringify(data)}`,
      ...prev,
    ]);
  };

  const fetchPessoas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/`);
      setPessoas(response.data);
      logRequest("GET /", response.data);
    } catch {
      setError("Erro ao buscar pessoas.");
      toast.error("Erro ao buscar pessoas.");
    } finally {
      setLoading(false);
    }
  };

  const deletePessoa = async (id: number) => {
    try {
      await axios.delete(`${BASE_URL}/${id}/`);
      toast.success("Pessoa excluída com sucesso!");
      logRequest(`DELETE /${id}/`, { status: "sucesso" });
      fetchPessoas();
    } catch {
      toast.error("Erro ao excluir pessoa.");
    }
  };

  const getPesoIdeal = async (id: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}/pesoideal/`);
      logRequest(`GET /${id}/pesoideal/`, response.data);
      return parseFloat(response.data.pesoIdeal.toFixed(2));
    } catch {
      toast.error("Erro ao calcular peso ideal.");
      throw new Error("Erro ao calcular peso ideal.");
    }
  };

  const createPessoa = async (data: Omit<Pessoa, "id">) => {
    try {
      const response = await axios.post(`${BASE_URL}/`, data);
      toast.success("Pessoa criada!");
      logRequest("POST /", response.data);
      fetchPessoas();
    } catch {
      toast.error("Erro ao criar pessoa.");
    }
  };

  const updatePessoa = async (id: number, data: Omit<Pessoa, "id">) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}/`, data);
      toast.success("Pessoa atualizada!");
      logRequest(`PUT /${id}/`, response.data);
      fetchPessoas();
    } catch {
      toast.error("Erro ao atualizar pessoa.");
    }
  };

  useEffect(() => {
    fetchPessoas();
  }, []);

  return {
    pessoas,
    loading,
    error,
    requestLog,
    fetchPessoas,
    deletePessoa,
    getPesoIdeal,
    createPessoa,
    updatePessoa,
  };
}