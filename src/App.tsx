import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";

const membersLoginUrl = "https://chicagominamidojo.com/login";

const MembersLoginRedirect = () => {
  useEffect(() => {
    window.location.replace(membersLoginUrl);
  }, []);

  return null;
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/classes" element={<Navigate to="/" replace />} />
      <Route path="/login" element={<MembersLoginRedirect />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
