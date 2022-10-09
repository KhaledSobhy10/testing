import { useState, useEffect } from "react";

function useGetItemsData(dateObject) {
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function loadData(status) {
    setErrorMessage(null);
    setIsLoading(true);
    // calling api
    fetch("")
      .then((res) => {
        if (status.cancel) return;
        setIsLoading(false);
        if (res) handleSuccess(res.data);
        else handleFailure(res.errorMessage);
      })
      .catch((e) => {
        if (status.cancel) return;
        setIsLoading(false);
        handleErrors(e);
      });
  }

  function handleSuccess(data) {
    setData(data);
  }

  function handleFailure(e) {
    setErrorMessage(e);
  }

  function handleErrors(e) {
    setErrorMessage(e);
  }

  function refresh() {
    loadData();
  }

  useEffect(() => {
    const status = { cancel: false };
    loadData(status);
    return () => (status.cancel = true);
  }, []);

  return { data, errorMessage, isLoading, refresh };
}

export default useGetItemsData;
