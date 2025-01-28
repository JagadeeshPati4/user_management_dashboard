import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  // Fetch users once when the component mounts
  const fetchUsers = useCallback(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        console.log('reposne called again');
        setUsers(response.data);
      })
      .catch(() => setError('Failed to fetch users. Refresh the page.'));
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Memoize context value to avoid re-creation
  const contextValue = useMemo(
    () => ({
      users,
      error,
      fetchUsers,
      addUser: (newUser) => {
        setUsers((prevUsers) => [
          ...prevUsers,
          { id: prevUsers.length ? Math.max(...prevUsers.map((user) => user.id)) + 1 : 1, ...newUser },
        ]);
      },
      updateUser: (updatedUser) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
      },
      deleteUser: (userId) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      },
    }),
    [users, error, fetchUsers]
  );

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
