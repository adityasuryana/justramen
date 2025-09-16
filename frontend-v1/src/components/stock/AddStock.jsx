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

<<<<<<< HEAD
export function AddMenu({fetchData}) {
=======
export function AddStock({fetchData}) {
>>>>>>> 27339e3 (feat: Enhance menu management with image upload to Cloudinary and validation)
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
<<<<<<< HEAD
        console.log('Menu added successfully');
=======
        console.log('Stocks added successfully');
>>>>>>> 27339e3 (feat: Enhance menu management with image upload to Cloudinary and validation)
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
<<<<<<< HEAD
        <Button className={"bg-green-pastel text-white hover:bg-green-pastel hover:text-white cursor-pointer"} variant="outline"> <Plus/> Menu</Button>
=======
        <Button className={"bg-green-pastel text-white hover:bg-green-pastel hover:text-white border-0 cursor-pointer"} variant="outline"> <Plus/> Stock</Button>
>>>>>>> 27339e3 (feat: Enhance menu management with image upload to Cloudinary and validation)
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add Stock</DialogTitle>
            <DialogDescription>
<<<<<<< HEAD
              Enter the Stock details below and click save.
=======
              Enter the stock details below and click Add.
>>>>>>> 27339e3 (feat: Enhance menu management with image upload to Cloudinary and validation)
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
<<<<<<< HEAD
              <Label htmlFor="name-1">Item</Label>
              <Input 
                id="name-1" 
                name="name" 
                placeholder="Your name"
=======
              <Label htmlFor="item-1">Item</Label>
              <Input 
                id="item-1" 
                item="item" 
                placeholder=""
>>>>>>> 27339e3 (feat: Enhance menu management with image upload to Cloudinary and validation)
                value={item}
                onChange={(e) => setItem(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
<<<<<<< HEAD
              <Label htmlFor="price-1">Price</Label>
              <Input 
                id="price-1" 
                name="price" 
                type="text"
                placeholder="Enter price"
=======
              <Label htmlFor="quantity-1">Quantity</Label>
              <Input 
                id="quantity-1" 
                item="quantity" 
                type="number"
                placeholder=""
>>>>>>> 27339e3 (feat: Enhance menu management with image upload to Cloudinary and validation)
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description-1">Description</Label>
              <Input 
                id="description-1" 
<<<<<<< HEAD
                name="description" 
                type="text" 
                placeholder="Enter description"
=======
                item="description" 
                type="text" 
                placeholder=""
>>>>>>> 27339e3 (feat: Enhance menu management with image upload to Cloudinary and validation)
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter className={"mt-4"}>
            <DialogClose asChild>
<<<<<<< HEAD
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
=======
              <Button className={"border-1 border-black cursor-pointer"} variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button className={"bg-green-pastel text-white hover:bg-green-pastel hover:text-white cursor-pointer border-0"} type="submit">Add</Button>
>>>>>>> 27339e3 (feat: Enhance menu management with image upload to Cloudinary and validation)
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}