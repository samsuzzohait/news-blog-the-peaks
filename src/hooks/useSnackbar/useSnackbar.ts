import { useState } from 'react';

type SnackbarType = 'success' | 'error';

interface SnackbarState {
  show: boolean;
  type: SnackbarType;
  title: string;
}
const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    title: '',
    type: 'success',
    show: false,
  });

  const showSuccessMessage = (title: string) => {
    setSnackbar({ type: 'success', title, show: true });
  };

  const showErrorMessage = (title: string) => {
    setSnackbar({ type: 'error', title, show: true });
  };

  const hideSnackbar = () => {
    setSnackbar({ type: 'success', title: '', show: false });
  };

  return {
    show: snackbar.show,
    type: snackbar.type,
    title: snackbar.title,
    showSuccessMessage,
    showErrorMessage,
    hideSnackbar,
  };
};

export default useSnackbar;
