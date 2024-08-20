import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


interface DialogDeleteRecipeProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DialogDeleteRecipe({open, onClose, onDelete} : DialogDeleteRecipeProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Apagar Receita</DialogTitle>
          <DialogDescription>
            Realmente deseja apagar a receita
          </DialogDescription>
          <Button onClick={() => {
            onDelete(); 
            onClose(); 
          }}>
              Apagar
          </Button>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
