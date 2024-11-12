import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Image from "next/image";
import coding from "../../app/assets/coding.png";

const AuthTabs = () => {
  return (
    <div className="flex h-screen bg-background-color font-sans">
      <div className="w-full md:w-1/2 h-full">
        <Image
          src={coding}
          alt="Developer Avatar"
          className="w-full h-full object-cover bg-[#23155b]"
          priority
        />
      </div>

      <div className="flex w-1/2 items-center justify-center">
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2 mt-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent className="mt-6" value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent className="mt-6" value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthTabs;
