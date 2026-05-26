"use client";

import { useEffect } from "react";

const membersLoginUrl = "https://chicagominamidojo.com/login";

export default function LoginRedirectPage() {
  useEffect(() => {
    window.location.replace(membersLoginUrl);
  }, []);

  return null;
}
