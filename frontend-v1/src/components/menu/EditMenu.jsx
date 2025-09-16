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
import { Edit, Pencil } from "lucide-react"
import React, { useEffect } from "react"
import { toast } from "sonner"

export function EditMenu({fetchData, menuID, data}) {
  const[name, setName] = React.useState(data?.name || '');
  const[price, setPrice] = React.useState(data?.price || '');
  const[description, setDescription] = React.useState(data?.description || '');
  const[image, setImage] = React.useState(data?.image || '');
  const[isOpen, setIsOpen] = React.useState(false);

  // Update state when data prop changes
  useEffect(() => {
    if (data) {
      setName(data.name || '');
      setPrice(data.price || '');
      setDescription(data.description || '');
      setImage(data.image || '');
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const menuData = { name, price, description, image };

    try {
      const response = await fetch(`http://localhost:5001/api/menus/${menuID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuData),
      });

      if (response.ok) {
        console.log('Menu updated successfully');
        // Close dialog and refresh data
        setIsOpen(false);
        toast.success('Menu updated successfully');
        fetchData();
      } else {
        console.error('Failed to update menu');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleCancel = () => {
    // Reset form to original values when canceling
    if (data) {
      setName(data.name || '');
      setPrice(data.price || '');
      setDescription(data.description || '');
      setImage(data.image || '');
    }
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={"bg-orange-pastel text-white hover:bg-orange-pastel hover:text-white border-0 cursor-pointer"} variant="outline" size="icon">
            <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Edit Menu</DialogTitle>
            <DialogDescription>
              Update the menu details below and click save.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="edit-name">Name</Label>
              <Input 
                id="edit-name" 
                name="name" 
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="edit-price">Price</Label>
              <Input 
                id="edit-price" 
                name="price" 
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="edit-description">Description</Label>
              <Input 
                id="edit-description" 
                name="description" 
                type="text" 
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="grip gap-3">
            <Label htmlFor="edit-image">Image</Label>
            <Input 
            id="edit-image"
            name="image"
            type="file"
            placeholder="choose file"
            value={image}
            onChange={(e) => setDescription(e.target.value)} 
            required
            />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button" onClick={handleCancel}>
                Cancel
              </Button>
            </DialogClose>
            <Button className={"bg-orange-pastel text-white hover:bg-orange-pastel hover:text-white cursor-pointer border-0"} type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}