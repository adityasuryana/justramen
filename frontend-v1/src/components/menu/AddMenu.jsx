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
  const[name, setName] = React.useState('');
  const[price, setPrice] = React.useState('');
  const[description, setDescription] = React.useState('');
  const[isOpen, setIsOpen] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accountData = { name, price, description };

    try {
      const response = await fetch('http://localhost:5001/api/menus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountData),
      });

      if (response.ok) {
        console.log('Menu added successfully');
        // Reset form and close dialog
        setName('');
        setPrice('');
        setDescription('');
        setIsOpen(false);
        toast.success('Menu added successfully');
        fetchData()
      } else {
        console.error('Failed to add menu');
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
            <DialogTitle>Add Menu</DialogTitle>
            <DialogDescription>
              Enter the account details below and click save.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input 
                id="name-1" 
                name="name" 
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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