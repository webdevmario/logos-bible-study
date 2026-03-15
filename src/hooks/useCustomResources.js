import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useCustomResources() {
  const [resources, setResources] = useLocalStorage("logos_custom_resources", []);

  const addResource = useCallback(
    ({ name, url, desc }) => {
      const fullUrl = url.startsWith("http") ? url : `https://${url}`;
      setResources((prev) => [
        ...prev,
        { name: name.trim(), url: fullUrl, desc: (desc || "").trim() || "Custom resource", id: Date.now() },
      ]);
    },
    [setResources],
  );

  const removeResource = useCallback(
    (id) => {
      setResources((prev) => prev.filter((r) => r.id !== id));
    },
    [setResources],
  );

  return { resources, addResource, removeResource };
}
