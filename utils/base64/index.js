// Função responsável por converter uma string codificada em base64 para um objeto Blob.

// Parâmetros:
// - base64: String codificada em base64 a ser convertida.
// - type: Tipo do Blob a ser criado, por exemplo, 'audio/mp3'.

export function base64toBlob(base64, type) {
  // Decodificação da string base64 para obter os caracteres de byte.
  const byteCharacters = atob(base64);
  
  // Criação de um array contendo os valores dos bytes.
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  
  // Criação de um objeto Uint8Array a partir do array de bytes.
  const byteArray = new Uint8Array(byteNumbers);
  
  // Criação de um Blob a partir do Uint8Array, especificando o tipo.
  return new Blob([byteArray], { type: type });
}
