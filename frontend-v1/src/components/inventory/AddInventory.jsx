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
import { Plus } from "lucide-react"
import React from "react"
import { toast } from "sonner"

export function AddInventory({fetchData}) {
  const[item, setItem] = React.useState('');
  const[quantity, setQuantity] = React.useState('');
  const[description, setDescription] = React.useState('');
  const[isOpen, setIsOpen] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accountData = { item, quantity, description };

    try {
      const response = await fetch('http://localhost:5001/api/inventories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountData),
      });

      if (response.ok) {
        console.log('Inventories added successfully');
        // Reset form and close dialog
        setItem('');
        setQuantity('');
        setDescription('');
        setIsOpen(false);
        toast.success('Inventory added successfully');
        fetchData()
      } else {
        console.error('Failed to add inventory');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={"bg-green-pastel text-white hover:bg-green-pastel hover:text-white border-0 cursor-pointer"} variant="outline"> <Plus/> Inventory</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Add Inventory</DialogTitle>
            <DialogDescription>
              Enter the inventory details below and click add.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
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
            <Button className={"bg-green-pastel text-white hover:bg-green-pastel hover:text-white cursor-pointer border-0"} type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}