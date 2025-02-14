import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // // Use localStorage to persist data
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [getDefualt,setGetDefualt]=useState(false);
  // Fetch only if no users in storage
  useEffect(() => {
    if (users.length === 0) {
      const fetchUsers = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get('https://jsonplaceholder.typicode.com/users');
          setUsers(response.data);
          localStorage.setItem('users', JSON.stringify(response.data));
        } catch (err) {
          setError('Failed to fetch users. Refresh the page.');
        } finally {
          setIsLoading(false);
        }
      };

      fetchUsers();
    }
  }, [getDefualt]); // Empty dependency array

  const contextValue = useMemo(() => ({
    users,
    error,
    isLoading,
    setGetDefualt,
    addUser: (newUser) => {
      const updatedUsers = (prevUsers) => {
        const newUsers = [
          ...prevUsers,
          { 
            id: prevUsers.length ? Math.max(...prevUsers.map((user) => user.id)) + 1 : 1, 
            ...newUser 
          }
        ];
        localStorage.setItem('users', JSON.stringify(newUsers));
        return newUsers;
      };
      setUsers(updatedUsers);
    },
    updateUser: (updatedUser) => {
      const updatedUsers = (prevUsers) => {
        const newUsers = prevUsers.map((user) => 
          user.id === updatedUser.id ? updatedUser : user
        );
        localStorage.setItem('users', JSON.stringify(newUsers));
        return newUsers;
      };
      setUsers(updatedUsers);
    },
    deleteUser: (userId) => {
      const updatedUsers = (prevUsers) => {
        const newUsers = prevUsers.filter((user) => user.id !== userId);
        localStorage.setItem('users', JSON.stringify(newUsers));
        return newUsers;
      };
      setUsers(updatedUsers);
    }
  }), [users, error, isLoading]);

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};