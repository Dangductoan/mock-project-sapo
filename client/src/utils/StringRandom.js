export function randomCode(codeLength) {
  let codeCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let codeCharactersLength = codeCharacters.length;
  let result = "";
  for (let i = 0; i < codeLength; i++) {
    result += codeCharacters.charAt(Math.floor(Math.random() * codeCharactersLength));
  }

  return result;
}