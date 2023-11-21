const GoogleButton = () => {
    const handleLogin = () => {
      window.location.href = 'http://localhost:3001/auth/google'; // Используйте относительный путь
    };
  
    return (
      <button onClick={handleLogin}>Log In with Google</button>
    );
  };
  
  export default GoogleButton;
  