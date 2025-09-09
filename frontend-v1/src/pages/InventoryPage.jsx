import { DataTableDemo } from '@/components/datatable'
import { AddInventory } from '@/components/inventory/AddInventory'
import DeleteInventory from '@/components/inventory/DeleteInventory'
import { EditInventory } from '@/components/inventory/EditInventory'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import React, { useEffect } from 'react'

export const InventoryPage = () => {
  const [data, setData] = React.useState([])

 const columns = [
  {
    accessorKey: "item",
    header: "Item",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("item")}</div>
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("quantity")}</div>,
  },
    {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const rowData = row.original;
      const accountsID = rowData._id;
      return (
        <div className="w-full flex justify-end gap-2">
          <EditInventory fetchData={fetchData} inventoryID={accountsID} data={rowData}/>
          <DeleteInventory fetchData={fetchData} inventoryID={accountsID}/>
        </div>
      )
    },
  }
]

const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:5001/api/inventories',{
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
    <div className=''>
        <h1 className="font-product text-3xl font-bold tracking-wider">
          Inventory
        </h1>
        <div className="py-3">
          <AddInventory fetchData={fetchData}/>
        </div>

        <div>
          <DataTableDemo column={columns} data={data}/>
        </div>
    </div>
  )
}
