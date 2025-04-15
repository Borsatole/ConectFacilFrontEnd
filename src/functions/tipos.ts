export interface CupomProps {
    id: string;
    codigo: string;
    desconto: string | number ;
    tipo: "percent" | "valor";
    validade: string;
    maxuse: number | string;
    usos: number;
    valido: number | boolean;
    produtos: string | string[];
  }
  
