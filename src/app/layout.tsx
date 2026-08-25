import type { Metadata } from "next";

import "./globals.css";
import Provider from "@/Provider";
import StoreProvider from "@/redux/StoreProvider";
import InitUser from "@/InitiUser";


export const metadata: Metadata = {
  title: "Snapcart | 10 minute grocery Delivery",
  description: "10 minutes grocery Delivery App",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="w-full h-[200vh] bg-linear-to-b from-green-100">
       <Provider>
        <StoreProvider>
         <InitUser />
           {children}
        </StoreProvider>
       </Provider>
       
      </body>
     
    </html>
  );
}
