import { AddMenu } from '@/components/menu/AddMenu'
import { EditMenu } from '@/components/menu/EditMenu'
import DeleteMenu from '@/components/menu/DeleteMenu'
import { DataTableDemo } from '@/components/datatable'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import React, { useEffect } from 'react'

export const MenuPage = () => {
  const [data, setData] = React.useState([])

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "price",
      header : ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("price")}</div>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => ( 
        <div className='capitalize'>{row.getValue("description")}</div>
      )
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue("image")}</div>
      )
    },
    {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const rowData = row.original;
      const menuID = rowData._id;
      return (
        <div className="w-full flex justify-end gap-2">
          <EditMenu fetchData={fetchData} menuID={menuID} data={rowData}/>
          <DeleteMenu fetchData={fetchData} menuID={menuID} data={rowData}/>
        </div>
      )
    },
  }
  ]

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/menus',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const jsonData = await response.json();
      console.log('Fetched data:', jsonData);
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1 className='font-product text-3xl font-bold tracking-wider'>Menu</h1>
<div className="py-3">
          <AddMenu fetchData={fetchData}/>
        </div>
      <div>
        <DataTableDemo column={columns} data={data} />
      </div>
    </div>
  )
}
