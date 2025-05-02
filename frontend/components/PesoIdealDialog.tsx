// components/PesoIdealDialog.tsx
import { Pessoa } from "@/hooks/usePessoas";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PesoIdealDialogProps {
  open: boolean;
  onClose: () => void;
  pessoa: Pessoa | null;
  pesoIdeal: number | null;
}

export default function PesoIdealDialog({
  open,
  onClose,
  pessoa,
  pesoIdeal,
}: PesoIdealDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Peso Ideal</DialogTitle>
        </DialogHeader>
        <div className="text-center text-slate-700 space-y-2">
          {pessoa && (
            <>
              <p className="text-lg">
                Pessoa: <strong>{pessoa.nome}</strong>
              </p>
              <p>
                Idade: {pessoa.idade} anos | Sexo: {pessoa.sexo}
              </p>
              <p>
                Altura atual: {pessoa.altura.toFixed(2)} m | Peso atual:{" "}
                {pessoa.peso.toFixed(1)} kg
              </p>
            </>
          )}
          <p className="text-lg mt-2">
            O peso ideal calculado é: <strong>{pesoIdeal} kg</strong>
          </p>
        </div>
        <div className="flex justify-center mt-4">
          <Button onClick={onClose}>Fechar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
