"use client";

import { useEffect, useState } from "react";

export default function NotFoundPath() {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname);
    console.error(
      "404 Error: User attempted to access non-existent route:",
      window.location.pathname,
    );
  }, []);

  return (
    <code className="text-primary/80 bg-muted px-2 py-0.5 rounded text-sm">
      {pathname || "…"}
    </code>
  );
}
