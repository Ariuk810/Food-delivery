// import { Input } from "@/components/ui/input";
// import { MdOutlineArrowBackIos } from "react-icons/md";
// export default function Home() {
//   return (
//     <div className="flex justify-center items-center gap-20">
//       <div className="w-[416px] h-[676px] bg-white ">
//         <button className="w-10 h-10 border border-gray-400 flex justify-center items-center">
//           <MdOutlineArrowBackIos />
//         </button>
//         <h3 className="font-bold text-4xl pt-5">Log in</h3>
//         <p className="text-gray-500 pt-2 text-2xl">
//           Log in to enjoy your favorite dishes.
//         </p>
//         <div className="pt-5">
//           <Input placeholder="Enter your email address" />
//           <Input placeholder="Password" className="mt-5" />
//         </div>
//         <p className=" text-black pt-5 underline underline-offset-1 cursor-pointer">
//           Forgot password ?
//         </p>
//         <button className="bg-gray-300 text-white rounded-md w-full py-2 mt-5">
//           Let's go
//         </button>
//         <div className="flex justify-center gap-2 mt-5">
//           <p className="text-gray-500 ">Don’t have an account?</p>
//           <p className="text-blue-500 ">Sign up</p>
//         </div>
//       </div>
//       <div className="w-[1156px] h-[1104px] mt-6">
//         <img src="/Login.png" className="w-full h-full" />
//       </div>
//     </div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:1000/users/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const { token } = await res.json();

      localStorage.setItem("token", token);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen gap-5">
      <div className="w-[416px] ">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Button variant="link">Sign Up</Button>
            </CardAction>
          </CardHeader>

          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div>
        <img src="/Login.png" className="w-full h-full" />
      </div>
    </div>
  );
}
