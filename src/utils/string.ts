export const StringUtils = {
  capStr(str: string): string {
    return str
      .split(" ")
      .map((item) => item.toLowerCase().charAt(0).toUpperCase() + item.slice(1))
      .join(" ");
  },
};
