import React from 'react'
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

const DeleteInventory = ({fetchData, inventoryID}) => {
    const handleDelete = async () => {
        const response = await fetch(`http://localhost:5001/api/inventories/${inventoryID}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

    
        if (response.status === 200) {
            toast.success('Account deleted successfully');
            fetchData();
        } else {
          console.error('Failed to delete account');
        }
    }
  return (
    <Button className={"bg-red-900 text-white hover:bg-red-900 border-0 hover:text-white cursor-pointer"} variant="outline" size={"icon"} onClick={handleDelete}>
      <Trash2 />
    </Button>
  )
}

export default DeleteInventory