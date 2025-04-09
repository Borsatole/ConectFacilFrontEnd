export function converterData(data) {
    const dataConvertida = new Date(data);
    const dia = dataConvertida.getDate();
    const mes = dataConvertida.getMonth() + 1;
    const ano = dataConvertida.getFullYear();
    const hora = dataConvertida.getHours();
    const minuto = dataConvertida.getMinutes();
    const segundo = dataConvertida.getSeconds();
    
    return `${dia < 10 ? `0${dia}` : dia}/${
      mes < 10 ? `0${mes}` : mes
    }/${ano} as ${hora}:${minuto < 10 ? `0${minuto}` : minuto}:${
      segundo < 10 ? `0${segundo}` : segundo
    }`;
    
}
  