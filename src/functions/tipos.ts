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
    previewImage?: string;
    id?: number;
    imagem?: string;
    titulo: string;
    dias: string;
    valor: number;
    ativo?: boolean;
    servidor?:string;
}




export interface CodigoProps {
    id?: number;
    idRecarga: number;
    servidor: string;
    codigo: string;
    usado: number;
    dias: number;
}


export interface ModalAdicionarRecargasProps {
    handleCloseModal: () => void;
    recargas: RecargaProps[];
    selectedRecarga: RecargaProps;
    setRecargas: React.Dispatch<React.SetStateAction<RecargaProps[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdateRecarga: (
      e: React.FormEvent<HTMLFormElement>,
      selectedRecarga: RecargaProps,
      setRecargas: React.Dispatch<React.SetStateAction<RecargaProps[]>>,
      setLoading: React.Dispatch<React.SetStateAction<boolean>>,
      recargas: RecargaProps[],
      handleCloseModal: () => void
    ) => Promise<void>;
    codigosFiltrados: CodigoProps[];
    selectedCodigos: CodigoProps[];
    handleCodigoChange: (
      codigo: CodigoProps,
      setSelectedCodigos: React.Dispatch<React.SetStateAction<CodigoProps[]>>
    ) => void;
    setSelectedCodigos: React.Dispatch<React.SetStateAction<CodigoProps[]>>;
}
