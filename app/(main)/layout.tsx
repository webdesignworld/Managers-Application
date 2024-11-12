import Navbar from "@/components/ui/Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
        return (
          < >
            <Navbar/>
        {children}
       
          </>
        );
      };
      
      export default MainLayout;