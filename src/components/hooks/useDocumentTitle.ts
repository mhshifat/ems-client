import { useEffect } from "react";

const useDocumentTitle = (str: string) => {
  useEffect(() => {
    document.title = str + " | " + process.env.REACT_APP_SITE_TITLE;
  }, [str]);
};

export default useDocumentTitle;
