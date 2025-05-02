// components/PessoaForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const pessoaSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres."),
  idade: z.number().int().min(0, "Idade deve ser positiva."),
  sexo: z.string().min(1),
  altura: z
    .number()
    .min(0.5, "Altura mínima 0.5 m.")
    .max(2.5, "Altura máxima 2.5 m."),
  peso: z.number().min(2, "Peso mínimo 2 kg.").max(300, "Peso máximo 300 kg."),
});

export type PessoaFormType = z.infer<typeof pessoaSchema>;

interface PessoaFormProps {
  onSubmit: (data: PessoaFormType) => void;
  initialData?: PessoaFormType | null;
  onCancel: () => void;
}

export default function PessoaForm({
  onSubmit,
  initialData,
  onCancel,
}: PessoaFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isDirty },
  } = useForm<PessoaFormType>({
    resolver: zodResolver(pessoaSchema),
    defaultValues: initialData || {
      nome: "",
      idade: 0,
      sexo: "M",
      altura: 0,
      peso: 0,
    },
  });

  const handleSave = (data: PessoaFormType) => {
    if (!isDirty) {
      toast("Nenhuma alteração detectada. Nada foi salvo.");
      onCancel();
      return;
    }
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleSave)} className="space-y-2">
      <label className="text-slate-700 text-sm">Nome</label>
      <Input placeholder="Nome da pessoa" {...register("nome")} />
      {errors.nome && (
        <p className="text-red-500 text-sm">{errors.nome.message}</p>
      )}

      <label className="text-slate-700 text-sm">Idade</label>
      <Input
        type="number"
        placeholder="Idade"
        {...register("idade", { valueAsNumber: true })}
      />
      {errors.idade && (
        <p className="text-red-500 text-sm">{errors.idade.message}</p>
      )}

      <label className="text-slate-700 text-sm">Sexo</label>
      <Select
        onValueChange={(value) =>
          setValue("sexo", value, { shouldDirty: true })
        }
        defaultValue={getValues("sexo")}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sexo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="M">Masculino</SelectItem>
          <SelectItem value="F">Feminino</SelectItem>
        </SelectContent>
      </Select>
      {errors.sexo && (
        <p className="text-red-500 text-sm">{errors.sexo.message}</p>
      )}

      <label className="text-slate-700 text-sm">Altura (m)</label>
      <Input
        type="number"
        step="0.01"
        placeholder="Altura em metros"
        {...register("altura", { valueAsNumber: true })}
      />
      {errors.altura && (
        <p className="text-red-500 text-sm">{errors.altura.message}</p>
      )}

      <label className="text-slate-700 text-sm">Peso (kg)</label>
      <Input
        type="number"
        step="0.1"
        placeholder="Peso em kg"
        {...register("peso", { valueAsNumber: true })}
      />
      {errors.peso && (
        <p className="text-red-500 text-sm">{errors.peso.message}</p>
      )}

      <div className="flex justify-end gap-2 mt-4">
        <Button
          className="bg-slate-600 hover:bg-slate-700 text-white"
          type="submit"
        >
          Salvar
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
