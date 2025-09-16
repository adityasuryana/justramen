import React from 'react'
<<<<<<< HEAD

const DeleteStock = () => {
  return (
    <div>DeleteStock</div>
=======
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

const DeleteStock = ({fetchData, stockID}) => {
    const handleDelete = async () => {
        const response = await fetch(`http://localhost:5001/api/stocks/${stockID}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

    
        if (response.status === 200) {
            toast.success('Stock deleted successfully');
            fetchData();
        } else {
          console.error('Failed to delete stock');
        }
    }
  return (
    <Button className={"bg-red-900 text-white hover:bg-red-900 border-0 hover:text-white cursor-pointer"} variant="outline" size={"icon"} onClick={handleDelete}>
      <Trash2 />
    </Button>
>>>>>>> 27339e3 (feat: Enhance menu management with image upload to Cloudinary and validation)
  )
}

export default DeleteStock