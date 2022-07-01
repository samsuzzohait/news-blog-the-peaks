import { AxiosError } from 'axios';
import { useState } from 'react';

export interface ApiResponse<TData, TFnVariables = void> {
  data: TData | undefined;
  isLoading: boolean;
  error: AxiosError | undefined;
  request: (variables: TFnVariables) => Promise<void>;
}

const useApiWrapper = <TData, TFnVariables = void>(
  func: (variables: TFnVariables) => Promise<TData>
): ApiResponse<TData, TFnVariables> => {
  const [data, setData] = useState<TData>();
  const [error, setError] = useState<AxiosError>();
  const [isLoading, setIsLoading] = useState(false);

  const request = async (args: TFnVariables) => {
    setIsLoading(true);
    try {
      const result = await func(args);
      setData(result);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    error,
    isLoading,
    request,
  };
};

export default useApiWrapper;
