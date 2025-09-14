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

export function AddMenu({fetchData}) {
  const[item, setItem] = React.useState('');
  const[quantity, setQuantity] = React.useState('');
  const[description, setDescription] = React.useState('');
  const[isOpen, setIsOpen] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stockData = { item, quantity, description };

    try {
      const response = await fetch('http://localhost:5001/api/stocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stockData),
      });

      if (response.ok) {
        console.log('Menu added successfully');
        // Reset form and close dialog
        setItem('');
        setQuantity('');
        setDescription('');
        setIsOpen(false);
        toast.success('Stock added successfully');
        fetchData()
      } else {
        console.error('Failed to add stock');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={"bg-green-pastel text-white hover:bg-green-pastel hover:text-white cursor-pointer"} variant="outline"> <Plus/> Menu</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add Stock</DialogTitle>
            <DialogDescription>
              Enter the Stock details below and click save.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Item</Label>
              <Input 
                id="name-1" 
                name="name" 
                placeholder="Your name"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="price-1">Price</Label>
              <Input 
                id="price-1" 
                name="price" 
                type="text"
                placeholder="Enter price"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description-1">Description</Label>
              <Input 
                id="description-1" 
                name="description" 
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
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}