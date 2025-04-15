export interface Cupom {
    id: string;
    codigo: string;
    desconto: number;
    tipo: "valor" | "percent";
    validade: string;
    usos: number;
    maxuse: number;
    aplicavel: string[];
    valido: boolean | number; // Supporting both types for backward compatibility
  }
  
  export interface Server {
    id: string;
    titulo: string;
    dias: string;
  }