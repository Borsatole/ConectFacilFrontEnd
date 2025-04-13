import * as React from "react";

interface ContainerProps {
  children: React.ReactNode;
  tipo?: string;
  id?: string;
}
function Container({ children, tipo = "principal" } : ContainerProps) {
  let id = "conteudo";


  if (tipo == "principal") {
    return (
      <div className="w-full min-h-screen p-4 md:p-10 bg-gray-100" id={id}>
        {children || ""}
      </div>
    );
  }

  if (tipo == "secundario") {
    return (
      <div className="max-w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
        {children || ""}
      </div>
    );
  }
}

export default Container;