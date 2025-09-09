import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { MoveLeft } from "lucide-react"

export function LoginForm({
  className,
  ...props
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className={"border-0"}>
        <CardHeader>
          <CardTitle className={"font-product text-green-pastel text-3xl"}>Login</CardTitle>
          <CardDescription className={"font-product text-muted-foreground text-justify text-md mt-3"}>
            This is a secure system and you will need to provide your login
              details to access the site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label className={"font-product text-muted-foreground"} htmlFor="email">Email</Label>
                <Input className={"px-3 py-5"} id="email" type="email" placeholder="mail@justramen.com" required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label className={"font-product text-muted-foreground"} htmlFor="password">Password</Label>
                </div>
                <Input className={"px-3 py-5"} id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="font-product bg-orange-pastel py-5 w-30 ml-auto text-md font-bold hover:bg-orange-pastel">
                  Login
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <Link className="inline-flex items-center font-product text-muted-foreground  gap-2" to="/"><MoveLeft size={"20px"}/>Home</Link>
    </div>
  );
}
