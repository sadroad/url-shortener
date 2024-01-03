"use client"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { JSX, SVGProps } from "react"
import { useFormState } from "react-dom"
import {toast} from "sonner";
import { createShortUrl } from "@/app/actions";

const initialState = {
  message: "",
  error: false,
  url: ""
};

const baseUrl = process.env.NODE_ENV === "production" ? "https://url.villablanca.tech" : "http://localhost:3000";

export default function Home() {
  const [state, formAction] = useFormState(createShortUrl, initialState);
  if (state.error) {
    toast.error(state.message);
  }
  return (
    <main
      key="1"
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-5 px-4 sm:px-6 lg:px-8"
    >
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1.5">
          <CardTitle className="text-2xl font-bold">Most Useful URL Shortener</CardTitle>
          <CardDescription>Enter a long URL to make it &quot;shorter&quot;</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form action={formAction}>
            <div className="space-y-2">
              <Label className="sr-only" htmlFor="longUrl">
                Long URL
              </Label>
              <Input className="w-full" name="url" id="longUrl" placeholder="Enter your long URL here" required type="url" />
            </div>
            <Button className="w-full" type="submit">
              Generate Short URL
            </Button>
          </form>
        </CardContent>
        <CardFooter className="pt-4">
          <div className="w-full flex justify-between items-center bg-gray-100 p-2 rounded">
            <div className="w-full relative">
              <Label className="sr-only" htmlFor="shortUrl">
                Short URL
              </Label>
              <Input
                className="w-full"
                disabled
                value={state.url !=="" ?`${baseUrl}/${state.url}` : ""}
                id="shortUrl"
                placeholder="Your short URL will appear here"
                type="text"
              />
              <Button disabled={state.url === ""} onClick={() => {navigator.clipboard.writeText(`${baseUrl}/${state.url}`)}} className="absolute right-2 top-1 p-1 -mt-1 bg-gray-100">
                <CopyIcon className="w-4 h-4 text-black" />
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </main>
  )
}

function CopyIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  )
}
