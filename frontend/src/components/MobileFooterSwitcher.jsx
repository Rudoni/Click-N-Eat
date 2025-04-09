import React, { useEffect, useState } from "react";
import FooterClient from "./FooterClientMobile";
import FooterLivreur from "./FooterLivreur";

const MobileFooterSwitcher = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const storedUserType = localStorage.getItem("user_type");
    if (storedUserType) {
      setUserType(parseInt(storedUserType));
    }
  }, []);

  if (!isMobile) return null;
  if (userType === 4) return <FooterLivreur />;
  return <FooterClient />;
};

export default MobileFooterSwitcher;
