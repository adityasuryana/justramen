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
  const[image, setImage] = React.useState(null);
  const[isOpen, setIsOpen] = React.useState(false);
  const[uploading, setUploading] = React.useState(false);

  const handleDialogClose = (open) => {
    setIsOpen(open);
    if (!open) {
      // Reset all form fields when dialog is closed
      setName('');
      setPrice('');
      setDescription('');
      setImage(null);
    }
  };

const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ramen'); // Use default preset temporarily
  
  try {
    console.log('File details:', { name: file.name, size: file.size, type: file.type });
    console.log('Cloud name:', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
    console.log('Upload preset:', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dib2kpvy9/image/upload`, // Hardcoded for testing
      {
        method: 'POST',
        body: formData,
      }
    );

    console.log('Response status:', response.status);

    if (response.ok) {
      const data = await response.json();
      console.log('Upload successful:', data.secure_url);
      return data.secure_url;
    } else {
      const errorData = await response.json();
      console.error('Cloudinary error response:', errorData);
      throw new Error(`Failed to upload image: ${JSON.stringify(errorData)}`);
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = '';
      
      // Upload image to Cloudinary first if an image is selected
      if (image) {
        toast.info('Uploading image...');
        imageUrl = await uploadImageToCloudinary(image);
      }

      // Prepare data with the Cloudinary URL
      const menuData = { 
        name, 
        price, 
        description, 
        image: imageUrl // This will be the Cloudinary URL or empty string
      };

      const response = await fetch('http://localhost:5001/api/menus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuData),
      });

      if (response.ok) {
        console.log('Menu added successfully');
        // Reset form and close dialog
        setName('');
        setPrice('');
        setDescription('');
        setImage(null);
        setIsOpen(false);
        toast.success('Menu added successfully');
        fetchData();
      } else {
        console.error('Failed to add menu');
        toast.error('Failed to add menu');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error uploading image or adding menu');
    } finally {
      setUploading(false);
    }
  };

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
              Enter the menu details below and click add.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input 
                id="name-1" 
                name="name" 
                placeholder="Menu name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={uploading}
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
                disabled={uploading}
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
                disabled={uploading}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="image-1">Image</Label>
              <Input
                id="image-1"
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
                disabled={uploading}
              />
              {image && (
                <div className="mt-2">
                  <img 
                    src={URL.createObjectURL(image)} 
                    alt="Selected" 
                    className="max-w-full h-32 object-cover rounded border"
                  />
                </div>
              )}
            </div>
          </div>
          <DialogFooter className={"mt-4"}>
            <DialogClose asChild>
              <Button className={"border-1 border-black cursor-pointer"}
                onClick={() => handleDialogClose(false)} 
                variant="outline" 
                type="button"
                disabled={uploading}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button className={"bg-green-pastel text-white hover:bg-green-pastel hover:text-white border-0 cursor-pointer"} type="submit" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Add'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}