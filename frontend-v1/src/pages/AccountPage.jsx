import { AddAccount } from '@/components/account/AddAccounts'
import DeleteAccounts from '@/components/account/DeleteAccounts'
import { EditAccount } from '@/components/account/EditAccounts'
import { DataTableDemo } from '@/components/datatable'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import React, { useEffect } from 'react'

export const AccountPage = () => {
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
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const rowData = row.original;
      const accountsID = rowData._id;
      return (
        <div className="w-full flex justify-end gap-2">
          <EditAccount fetchData={fetchData} accountsID={accountsID} data={rowData}/>
          <DeleteAccounts fetchData={fetchData} accountsID={accountsID}/>
        </div>
      )
    },
  }
]

const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:5001/api/accounts',{
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
        <h1 className="font-product text-3xl font-bold tracking-wider">Account</h1>
        <div className="py-3">
          <AddAccount fetchData={fetchData}/>
        </div>

        <div>
          <DataTableDemo column={columns} data={data}/>
        </div>
    </div>
  )
}
