import { DataTableDemo } from '@/components/datatable'
import { AddPromo } from '@/components/promo/AddPromo'
import DeletePromo from '@/components/promo/DeletePromo'
import { EditPromo } from '@/components/promo/EditPromo'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import React, { useEffect } from 'react'

export const PromoPage = () => {
  const [data, setData] = React.useState([])

 const columns = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("description")}</div>,
  },
    {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("image")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const rowData = row.original;
      const promoID = rowData._id;
      return (
        <div className="w-full flex justify-end gap-2">
          <EditPromo fetchData={fetchData} promoID={promoID} data={rowData}/>
          <DeletePromo fetchData={fetchData} promoID={promoID}/>
        </div>
      )
    },
  }
]

const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:5001/api/promos',{
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
          Promo
        </h1>
        <div className="py-3">
          <AddPromo fetchData={fetchData}/>
        </div>

        <div>
          <DataTableDemo column={columns} data={data}/>
        </div>
    </div>
  )
}
