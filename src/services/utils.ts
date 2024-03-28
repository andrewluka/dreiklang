export const isAlphaNum = (c: number) =>
  (c > 47 && c < 58) || (c > 64 && c < 91) || (c > 96 && c < 123);

export const sanitize = (str: string) => {
  let newStr = "";

  for (const ch of str) {
    const code = ch.charCodeAt(0);
    if (isAlphaNum(code)) newStr += ch;
    else newStr += `%${code.toString(16)}`;
  }

  return newStr;
};
