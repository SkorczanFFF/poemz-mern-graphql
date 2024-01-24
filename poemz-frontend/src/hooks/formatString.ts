export function formatString(inputString: string) {
  let stringWithoutSpecialChars = inputString.replace(
    /[ąćęłńóśżź]/g,
    function (match) {
      const specialChars: { [key: string]: string } = {
        ą: "a",
        ć: "c",
        ę: "e",
        ł: "l",
        ń: "n",
        ó: "o",
        ś: "s",
        ż: "z",
        ź: "z",
      };
      return specialChars[match as keyof typeof specialChars];
    }
  );
  let stringWithoutSpaces = stringWithoutSpecialChars.replace(/\s+/g, "-");

  return stringWithoutSpaces;
}
