import { createContext, useContext } from 'react';
type SnackbarType = 'success' | 'error';

export interface SnackbarState {
  show: boolean;
  type: SnackbarType;
  title: string;
  showSuccessMessage: (title: string) => void;
  showErrorMessage: (title: string) => void;
  hideSnackbar: () => void;
}

const snackbarDefaultState: SnackbarState = {
  show: false,
  type: 'success',
  title: '',
  showSuccessMessage: () => {},
  showErrorMessage: () => {},
  hideSnackbar: () => {},
};

const context = createContext<SnackbarState>(snackbarDefaultState);

const { Provider: SnackbarProvider } = context;
const useSnackbarContext = (): SnackbarState => useContext(context);

export { SnackbarProvider, useSnackbarContext };
