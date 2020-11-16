import { StringUtils } from "../utils";

export const extractErrorMessagesFromErr = (err: Error): string[] => {
  const errors = err.message
    .split(". ")
    .map((m) => m + ".")
    .map((message) => {
      const matchedObj = message.match(/"(.*?)"/);
      const pathWithQuote = matchedObj?.[0] || "";
      const path = matchedObj?.[1] || "";

      return `${path}:${StringUtils.capStr(path)}${message.slice(
        pathWithQuote.length
      )}`;
    });

  return errors;
};
