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
      <Button onClick={handleDelete} variant="outline" className="">
        <Trash2 className="mr-2" />
      </Button>
    )
}

export default DeleteMenu