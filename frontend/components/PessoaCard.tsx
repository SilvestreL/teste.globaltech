// components/PessoaCard.tsx
import { Pessoa } from "@/hooks/usePessoas";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FiEdit, FiTrash2, FiTarget } from "react-icons/fi";

interface PessoaCardProps {
  pessoa: Pessoa;
  onEdit: (pessoa: Pessoa) => void;
  onDelete: (id: number) => void;
  onPesoIdeal: (pessoa: Pessoa) => void;
}

export default function PessoaCard({
  pessoa,
  onEdit,
  onDelete,
  onPesoIdeal,
}: PessoaCardProps) {
  const alturaFormatada = pessoa.altura ? pessoa.altura.toFixed(2) : "0.00";
  const pesoFormatado = pessoa.peso ? pessoa.peso.toFixed(1) : "0.0";

  return (
    <Card className="shadow-md border rounded-xl p-4 bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center text-slate-700">
          {pessoa.nome}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 text-slate-600">
        <p>
          <strong>Idade:</strong> {pessoa.idade} anos
        </p>
        <p>
          <strong>Sexo:</strong> {pessoa.sexo}
        </p>
        <p>
          <strong>Altura:</strong> {alturaFormatada} m
        </p>
        <p>
          <strong>Peso:</strong> {pesoFormatado} kg
        </p>
        <div className="flex justify-between mt-4 gap-2">
          <Button
            className="bg-indigo-500 hover:bg-indigo-600 text-white flex items-center gap-1"
            onClick={() => onPesoIdeal(pessoa)}
          >
            <FiTarget /> Peso Ideal
          </Button>
          <Button
            className="bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-1"
            onClick={() => onEdit(pessoa)}
          >
            <FiEdit /> Editar
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-1"
            onClick={() => onDelete(pessoa.id)}
          >
            <FiTrash2 /> Excluir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
