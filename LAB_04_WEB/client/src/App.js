// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import axios from 'axios';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(localStorage.getItem('token'));
    if (token) {
      // Выполняем запрос на сервер для проверки токена и получения данных пользователя
      axios.get('http://localhost:3001/auth/me', {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(response => {
        // Устанавливаем пользователя в состояние
        setUser(response.data);
        setLoggedInUser(response.data);
      })
      .catch(error => {
        console.error('Token verification error:', error.message, token);
        // Обработка ошибок аутентификации
      });
    }
  }, []);

  const handleLogout = () => {
    // Удаление токена из localStorage
    localStorage.removeItem('token');
    // Очистка состояния пользователя
    setLoggedInUser(null);
  };

  return (
    <Router>
    <Switch>
      <Route path="/login">
        {loggedInUser ? <Redirect to="/" /> : <Login onLogin={setLoggedInUser} setLoggedInUser={setLoggedInUser} />}
      </Route>
      <Route path="/register">
        {loggedInUser ? <Redirect to="/" /> : <Register onRegister={(user) => setLoggedInUser(user)} />}
      </Route>
      <Route path="/">
        <Home loggedInUser={loggedInUser} onLogout={handleLogout} />
      </Route>
    </Switch>
  </Router>
  );
};

export default App;
