"use client";
import { useState } from "react";
import { Toaster } from "sonner";
import PessoaCard from "@/components/PessoaCard";
import PessoaForm, { PessoaFormType } from "@/components/PessoaForm";
import PesoIdealDialog from "@/components/PesoIdealDialog";
import { usePessoas, Pessoa } from "@/hooks/usePessoas";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { FiPlus } from "react-icons/fi";
import LogPanel from "@/components/LogPanel";
import PesquisarPorId from "@/components/ PesquisarPorId";

export default function PessoaPage() {
  const {
    pessoas,
    loading,
    error,
    requestLog,
    deletePessoa,
    getPesoIdeal,
    createPessoa,
    updatePessoa,
  } = usePessoas();

  const [showForm, setShowForm] = useState(false);
  const [editingPessoa, setEditingPessoa] = useState<Pessoa | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [pesoIdeal, setPesoIdeal] = useState<number | null>(null);
  const [selectedPessoa, setSelectedPessoa] = useState<Pessoa | null>(null);

  const handleEdit = (pessoa: Pessoa) => {
    setEditingPessoa(pessoa);
    setShowForm(true);
  };

  const handlePesoIdeal = async (pessoa: Pessoa) => {
    try {
      const peso = await getPesoIdeal(pessoa.id);
      setPesoIdeal(peso);
      setSelectedPessoa(pessoa);
      setShowDialog(true);
    } catch {
      // erro já tratado no hook
    }
  };

  const handleFormSubmit = async (data: PessoaFormType) => {
    const formattedData = {
      nome: data.nome,
      idade: data.idade,
      sexo: data.sexo,
      altura: data.altura,
      peso: data.peso,
    };
    if (editingPessoa) {
      await updatePessoa(editingPessoa.id, formattedData);
    } else {
      await createPessoa(formattedData);
    }
    setShowForm(false);
    setEditingPessoa(null);
  };

  return (
    <div className="p-8 space-y-10 bg-slate-100 min-h-screen">
      <Toaster position="top-right" />

      {/* Bloco central superior */}
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-extrabold text-slate-700">
          Lista de Pessoas
        </h1>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="bg-slate-300 hover:bg-slate-400 text-slate-700 px-6 py-2 rounded-full shadow flex items-center gap-2 text-base"
                onClick={() => {
                  setEditingPessoa(null);
                  setShowForm(true);
                }}
              >
                <FiPlus className="text-lg" /> Adicionar Pessoa
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Adicionar uma nova pessoa ao sistema</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Mensagens de estado */}
      {loading && <p className="text-center text-slate-500">Carregando...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pessoas.map((pessoa) => (
          <PessoaCard
            key={pessoa.id}
            pessoa={pessoa}
            onEdit={handleEdit}
            onDelete={deletePessoa}
            onPesoIdeal={handlePesoIdeal}
          />
        ))}
      </div>

      {/* Modal formulário */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingPessoa
                ? `Editando: ${editingPessoa.nome}`
                : "Nova Pessoa"}
            </DialogTitle>
          </DialogHeader>
          <PessoaForm
            onSubmit={handleFormSubmit}
            initialData={editingPessoa}
            onCancel={() => setShowForm(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Modal peso ideal */}
      <PesoIdealDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        pessoa={selectedPessoa}
        pesoIdeal={pesoIdeal}
      />

      {/* Log */}
      <LogPanel logs={requestLog} />
    </div>
  );
}
