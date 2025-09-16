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

export function AddPromo({fetchData}) {
  const[title, setTitle] = React.useState('');
  const[description, setDescription] = React.useState('');
  const[image, setImage] = React.useState('');
  const[isOpen, setIsOpen] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const promoData = { title, description, image };

    try {
      const response = await fetch('http://localhost:5001/api/promos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(promoData),
      });

      if (response.ok) {
        console.log('Promo added successfully');
        // Reset form and close dialog
        setTitle('');
        setImage('');
        setDescription('');
        setIsOpen(false);
        toast.success('Promo added successfully');
        fetchData()
      } else {
        console.error('Failed to add promo');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={"bg-green-pastel text-white hover:bg-green-pastel hover:text-white border-0 cursor-pointer"} variant="outline"> <Plus/> Promo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add Promo</DialogTitle>
            <DialogDescription>
              Enter the promo details below and click Add.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="item-1">Item</Label>
              <Input 
                id="item-1" 
                item="item" 
                placeholder=""
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="quantity-1">Description</Label>
              <Input 
                id="quantity-1" 
                item="quantity" 
                type="number"
                placeholder=""
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description-1">Image</Label>
              <Input 
                id="description-1" 
                item="description" 
                type="file" 
                placeholder=""
                onChange={(e) => setImage(e.target.files[0])}
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