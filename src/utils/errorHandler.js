export const handleApiError = (error, showAlert = true) => {
  let message = 'Произошла ошибка. Попробуйте еще раз.';
  
  if (error.message) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  }
  
  console.error('API Error:', error);
  
  if (showAlert) {
    alert(message);
  }
  
  return message;
};