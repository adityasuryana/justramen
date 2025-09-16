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

export function AddAccount({fetchData}) {
  const[name, setName] = React.useState('');
  const[email, setEmail] = React.useState('');
  const[password, setPassword] = React.useState('');
  const[isOpen, setIsOpen] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accountData = { name, email, password };

    try {
      const response = await fetch('http://localhost:5001/api/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountData),
      });

      if (response.ok) {
        console.log('Account added successfully');
        // Reset form and close dialog
        setName('');
        setEmail('');
        setPassword('');
        setIsOpen(false);
        toast.success('Account added successfully');
        fetchData()
      } else {
        console.error('Failed to add account');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={"bg-green-pastel text-white hover:bg-green-pastel hover:text-white border-0 cursor-pointer"} variant="outline"> <Plus/> Account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add Account</DialogTitle>
            <DialogDescription>
              Enter the account details below and click create.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input 
                id="name-1" 
                name="name" 
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email-1">Email</Label>
              <Input 
                id="email-1" 
                name="email" 
                type="email"
                placeholder="mail@justramen.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password-1">Password</Label>
              <Input 
                id="password-1" 
                name="password" 
                type="password" 
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter className={"mt-4"}>
            <DialogClose asChild>
              <Button className={"border-1 border-black cursor-pointer"} variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button className={"bg-green-pastel text-white hover:bg-green-pastel border-0 cursor-pointer"} type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}