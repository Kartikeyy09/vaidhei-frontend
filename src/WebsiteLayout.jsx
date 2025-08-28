import { Outlet } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import Header from "./components/Header";


const WebsiteLayout = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScrollToTop/>
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* This is where your website pages will be rendered */}
      </main>
      <Footer />
    </div>
  );
};

export default WebsiteLayout;