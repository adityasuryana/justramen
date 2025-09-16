import React from 'react'
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

const DeleteMenu = ({fetchData, menuID}) => {
    const handleDelete = async () => {
        const response = await fetch(`http://localhost:5001/api/menus/${menuID}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if(response.status === 200) {
            toast.success('Menu deleted successfully');
            fetchData();
        } else {
          console.error('Failed to delete menu');
        }
      }
  return (
      <Button className={"bg-red-900 text-white hover:bg-red-900 border-0 hover:text-white cursor-pointer"} onClick={handleDelete} variant="outline">
        <Trash2 className="" />
      </Button>
    )
}

export default DeleteMenu