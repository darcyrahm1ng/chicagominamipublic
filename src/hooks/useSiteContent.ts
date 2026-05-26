"use client";

import { useEffect, useState } from "react";
import { apiUrl } from "@/lib/api";

const cache: Record<string, any> = {};

export function useSiteContent<T extends Record<string, any>>(
  section: string,
  defaults: T
): T {
  const [data, setData] = useState<T>(() => cache[section] ?? defaults);

  useEffect(() => {
    if (cache[section]) {
      setData(cache[section]);
      return;
    }
    fetch(apiUrl(`/api/site-content/${section}`))
      .then((r) => r.json())
      .then((json) => {
        if (json && Object.keys(json).length > 0) {
          cache[section] = json;
          setData(json);
        }
      })
      .catch(() => {});
  }, [section]);

  return data;
}
