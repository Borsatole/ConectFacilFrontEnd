import * as React from 'react'
import { Button, ButtonCloseModal } from '../comum/button';
import { H3 } from '../tailwindComponents/Textos';
import { FormGroup } from '../comum/FormGroup';
import { Input } from '../comum/input';
import Select from '../comum/select';
import { format, parseISO } from "date-fns";



export function ModalEditarCupons({
    handleCloseModal,
    selectedCoupon,
    setCupons,
    handleUpdateCoupon,
    servers
  }) {
  return (
    <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.33)" }}
            >
              <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
                <ButtonCloseModal onClick={handleCloseModal} />
                <H3>Editar Cupom</H3>
    
                <form
                  onSubmit={(e) =>
                    handleUpdateCoupon(
                      e,
                      selectedCoupon,
                      setCupons,
                      handleCloseModal
                    )
                  }
                >
                  <FormGroup label="Código do Cupom" id="codigo">
                    <Input
                      id="codigo"
                      defaultValue={selectedCoupon.codigo}
                      required
                    ></Input>
                  </FormGroup>
    
                  <FormGroup label="Tipo de Desconto" id="tipo">
                    <Select selectedCoupon={selectedCoupon.tipo} />
                  </FormGroup>
    
                  <FormGroup label="Desconto" id="desconto">
                    <Input
                      id="desconto"
                      type="number"
                      defaultValue={selectedCoupon.desconto}
                      min="0"
                      // step="1.00"
                      required
                    ></Input>
                  </FormGroup>
    
                  <FormGroup label="Data de Validade" id="validade">
                    <Input
                      id="validade"
                      type="datetime-local"
                      name="validade"
                      defaultValue={format(
                        parseISO(selectedCoupon.validade),
                        "yyyy-MM-dd'T'HH:mm"
                      )}
                      required
                    ></Input>
                  </FormGroup>
    
                  <FormGroup label="Número maximo de Usos" id="maxuse">
                    <Input
                      id="maxuse"
                      name="maxuse"
                      type="number"
                      defaultValue={selectedCoupon.maxuse}
                      min="0"
                      // step="1.00"
                      required
                    ></Input>
                  </FormGroup>
    
                  <FormGroup label="Produtos Aplicáveis" id="aplicavel">
                    <div className="flex flex-col gap-2 overflow-y-scroll max-h-40 p-2">
                      {servers
                        .sort((a, b) => parseFloat(a.dias) - parseFloat(b.dias))
                        .map((server) => (
                          <label
                            key={server.id}
                            className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg shadow-sm cursor-pointer transition-all hover:bg-gray-100 focus-within:ring-2 focus-within:ring-blue-500"
                          >
                            <input
                              type="checkbox"
                              name="aplicavel"
                              value={server.id}
                              defaultChecked={(() => {
                                try {
                                  if (!selectedCoupon.produtos) return false;
    
                                  const aplicaveis = JSON.parse(
                                    selectedCoupon.produtos
                                  );
                                  return (
                                    Array.isArray(aplicaveis) &&
                                    aplicaveis
                                      .map(String)
                                      .includes(String(server.id))
                                  );
                                } catch (error) {
                                  console.error(
                                    "Erro ao verificar produtos aplicáveis:",
                                    error
                                  );
                                  return false;
                                }
                              })()}
                              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <span className="text-sm font-medium text-gray-700">
                              {server.titulo}
                            </span>
                          </label>
                        ))}
                    </div>
                  </FormGroup>
    
                  <div className="mt-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="valido"
                        defaultChecked={selectedCoupon.valido === 1}
                        className="mr-2 leading-tight"
                      />
                      <span className="text-sm">Cupom Ativo</span>
                    </label>
                  </div>
    
                  <div className="mt-2 flex items-center justify-between">
                    <Button type="submit">Atualizar Cupom</Button>
                  </div>
                </form>
              </div>
            </div>
  )
}

