"use client";

import { useEffect, useState } from "react";
import SwaggerUI from "swagger-ui-react";

export default function DocsPage() {
  const [spec, setSpec] = useState<any>(null);

  useEffect(() => {
    fetch("/api/openapi")
      .then((r) => r.json())
      .then(setSpec);
  }, []);

  if (!spec) return <div className="p-6">Carregando docs…</div>;

  return <SwaggerUI spec={spec} />;
}