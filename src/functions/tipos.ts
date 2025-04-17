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

export interface RecargaProps {
    previewImage: string;
    id: number ;
    imagem: string;
    titulo: string;
    dias: number;
    valor: number;
    ativo?: boolean;
}



export interface CodigoProps {
    id: number;
    idRecarga: number;
    servidor: string;
    codigo: string;
    usado: number;
    dias: number;
}

  
