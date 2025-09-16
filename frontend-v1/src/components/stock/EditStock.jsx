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
import { Pencil, Plus } from "lucide-react"
import React from "react"
import { toast } from "sonner"

export function EditStock({fetchData, stockID, data}) {
  const[item, setItem] = React.useState(data?.item || '');
  const[quantity, setQuantity] = React.useState(data?.quantity || '');
  const[description, setDescription] = React.useState(data?.description || '');
  const[isOpen, setIsOpen] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stockData = { item, quantity, description };

    try {
      const response = await fetch(`http://localhost:5001/api/stocks/${stockID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stockData),
      });

      if (response.ok) {
        console.log('Stocks updated successfully');
        // Reset form and close dialog
        setItem('');
        setQuantity('');
        setDescription('');
        setIsOpen(false);
        toast.success('Stock updated successfully');
        fetchData()
      } else {
        console.error('Failed to update stock');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={"bg-orange-pastel text-white hover:bg-orange-pastel hover:text-white border-0 cursor-pointer "} variant="outline"><Pencil/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Edit Stock</DialogTitle>
            <DialogDescription>
              Enter the stock details below and click update.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="grid gap-3">
              <Label htmlFor="item-1">Item</Label>
              <Input 
                id="item-1" 
                item="item" 
                placeholder="Pedro Duarte"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="quantity-1">Quantity</Label>
              <Input 
                id="quantity-1" 
                item="quantity" 
                type="number"
                placeholder="pedro@example.com"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description-1">Description</Label>
              <Input 
                id="description-1" 
                item="description" 
                type="text" 
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter className={"mt-4"}>
            <DialogClose asChild>
              <Button className={"border-1 border-black cursor-pointer"} variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button className={"bg-orange-pastel text-white hover:bg-orange-pastel hover:text-white cursor-pointer border-0"} type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}