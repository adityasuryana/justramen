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

export function EditAccount({fetchData, accountsID, data}) {
  const[name, setName] = React.useState(data?.name || '');
  const[email, setEmail] = React.useState(data?.email || '');
  const[password, setPassword] = React.useState(data?.password || '');
  const[isOpen, setIsOpen] = React.useState(false);

  // Update state when data prop changes
  useEffect(() => {
    if (data) {
      setName(data.name || '');
      setEmail(data.email || '');
      setPassword(data.password || '');
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accountData = { name, email, password };

    try {
      const response = await fetch(`http://localhost:5001/api/accounts/${accountsID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountData),
      });

      if (response.ok) {
        console.log('Account updated successfully');
        // Close dialog and refresh dat
        setIsOpen(false);
        toast.success('Account updated successfully');
        fetchData();
      } else {
        console.error('Failed to update account');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleCancel = () => {
    // Reset form to original values when canceling
    if (data) {
      setName(data.name || '');
      setEmail(data.email || '');
      setPassword(data.password || '');
    }
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={"bg-orange-pastel text-white hover:bg-orange-pastel hover:text-white cursor-pointer border-0"} variant="outline" size="icon">
            <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Edit Account</DialogTitle>
            <DialogDescription>
              Update the account details below and click update.
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
              <Label htmlFor="edit-email">Email</Label>
              <Input 
                id="edit-email" 
                name="email" 
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="edit-password">Password</Label>
              <Input 
                id="edit-password" 
                name="password" 
                type="password" 
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button className={"border-1 border-black cursor-pointer"} variant="outline" type="button" onClick={handleCancel}>
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