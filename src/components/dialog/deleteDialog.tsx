import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"



interface DialogDeleteRecipeProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  isBatchDelete?: boolean;
}

export default function DialogDeleteRecipe({open, onClose, onDelete, isBatchDelete} : DialogDeleteRecipeProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
       className="sm:max-w-md rounded-lg space-y-4"
      >
        <DialogHeader>
          <DialogTitle>Apagar {isBatchDelete ? "as receitas" : "a receita"}</DialogTitle>
          <DialogDescription>
            Realmente deseja apagar {isBatchDelete ? "estas receitas" : "esta receita"}?
          </DialogDescription>
          <Button className="bg-[#1347A8] hover:bg-[#1347a8da]" onClick={() => {
            onDelete(); 
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
