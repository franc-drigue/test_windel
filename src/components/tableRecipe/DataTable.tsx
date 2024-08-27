import { useState, useEffect } from "react";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Trash2, Pencil, CircleArrowRight, CircleArrowLeft } from "lucide-react";
import DialogDeleteRecipe from "../dialog/deleteDialog";
import Lottie from "lottie-react";
import AnimationData from "../../../public/Animation.json"


type Ingredients = {
  name: string;
  quantity: number;
};

export type Recipe = {
  id: number;
  name: string;
  description: string;
  ingredients: Ingredients[];
  category: string;
  isFavorite: boolean;
};

interface TableRecipesProps {
  recipes: Recipe[];
  onDelete: (id: number) => void;
  handleEditClick: (id: number) => void;
}

const url = "https://teste-tecnico-front-api.up.railway.app/recipe/delete-in-batch";

export function TableRecipes({ recipes, onDelete, handleEditClick }: TableRecipesProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isBatchDelete, setIsBatchDelete] = useState<boolean>(false);
  const [currentRecipeId, setCurrentRecipeId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [updatedRecipes, setUpdatedRecipes] = useState<Recipe[]>(recipes);

  const pageSize = 6;
  const pageCount = Math.ceil(updatedRecipes.length / pageSize);
  const paginatedRecipes = updatedRecipes.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, pageCount - 1));

  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(recipes.map((recipe) => recipe.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleDeleteMultiple = async () => {
    if (selectedIds.length > 0) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ registersId: selectedIds }),
        });
        if (!response.ok) throw new Error("Failed to delete recipes");

        setUpdatedRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => !selectedIds.includes(recipe.id))
        );
        setSelectedIds([]);
      } catch (error) {
        console.error("Failed to delete recipes:", error);
      }
    }
  };

  useEffect(() => setUpdatedRecipes(recipes), [recipes]);

  return (
    <div className="flex flex-col min-h-screen justify-start">
      <Table className="bg-slate-50 shadow-md rounded-xl">
        <TableCaption>lista de suas receitas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Ingredientes</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Favorita</TableHead>
            <TableHead>
              <Checkbox
                checked={
                  selectedIds.length > 0 && selectedIds.length === recipes.length
                    ? true
                    : selectedIds.length > 0
                    ? "indeterminate"
                    : false
                }
                onCheckedChange={(checked: any) => handleSelectAll(checked)}
              />
            </TableHead>
            <TableHead className="text-right">
              <Button
                onClick={() => {
                  setIsBatchDelete(true);
                  setDialogOpen(true);
                }}
                disabled={selectedIds.length === 0}
                variant="outline"
              >
                Apagar todos
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedRecipes.map((recipe) => (
            <TableRow key={recipe.id}>
              <TableCell className="font-medium">{recipe.name}</TableCell>
              <TableCell>{recipe.description}</TableCell>
              <TableCell>
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index}>
                    {ingredient.name}: {ingredient.quantity}
                  </div>
                ))}
              </TableCell>
              <TableCell>{recipe.category}</TableCell>
              <TableCell>{recipe.isFavorite ? "Sim" : "Não"}</TableCell>
              <TableCell>
                <Checkbox
                  checked={selectedIds.includes(recipe.id)}
                  onCheckedChange={() => handleCheckboxChange(recipe.id)}
                />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex space-x-2 justify-end">
                  <Button
                    className="hover:bg-[#d2dff7da]"
                    onClick={() => {
                      setCurrentRecipeId(recipe.id);
                      setIsBatchDelete(false);
                      setDialogOpen(true);
                    }}
                    disabled={selectedIds.length > 0}
                    variant="outline"
                  >
                    <Trash2 className="text-[#1347A8]" />
                  </Button>
                  <Button
                    className="hover:bg-[#fee8ecde]"
                    onClick={() => handleEditClick(recipe.id)}
                    disabled={selectedIds.length > 0}
                    variant="outline"
                  >
                    <Pencil className="text-[#a0263c]" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        
            {  updatedRecipes.length > 0 ? 
            <TableRow>
              <TableCell colSpan={7} className="text-center">
              <div className="flex items-center justify-center space-x-6">
                <Button
                  variant={"ghost"}
                  onClick={handlePreviousPage}
                  disabled={currentPage === 0 || updatedRecipes.length === 0}
                >
                  <CircleArrowLeft />
                </Button>
                <span>
                  Página {currentPage + 1} de {pageCount}
                </span>
                <Button
                  variant={"ghost"}
                  onClick={handleNextPage}
                  disabled={currentPage === pageCount - 1 || updatedRecipes.length === 0}
                >
                  <CircleArrowRight />
                </Button>
              </div>
            </TableCell>
            </TableRow>
            :
            <TableRow >
              <TableCell colSpan={7}>
               <div className="flex justify-center h-[200px]">
                <div className="space-y-1 flex flex-col justify-center items-center">
                  <Lottie
                    style={{width: 150}}
                    animationData={AnimationData}/>
                  <p className="text-slate-500">Sem receitas para exibir</p>
                </div>
            </div>
            </TableCell> 
            </TableRow>
            }
         
        </TableFooter>
      </Table>
      <DialogDeleteRecipe
        isBatchDelete={isBatchDelete}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onDelete={() => {
          if (isBatchDelete) {
            handleDeleteMultiple();
          } else if (currentRecipeId !== null) {
            onDelete(currentRecipeId);
          }
          setDialogOpen(false);
        }}
      />
    </div>
  );
}
