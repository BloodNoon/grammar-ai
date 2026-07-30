import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';
const AuthContext = React.createContext();
export function useAuth() {
	return useContext(AuthContext);
}
export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(false);
	const [token, setToken] = useLocalStorage('token', '');
	const config = { headers: { 'Content-Type': 'application/json' } };
	useEffect(() => {
		setLoading(true);
		const verifyUser = async () => {

			const loggedInUser = localStorage.getItem('token');
			try {
				if (loggedInUser) {
					const user = await axios.post(
						'/api/user/verifyToken',
						{},
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					if (user) {
						setCurrentUser(user);
					}
				}
			} catch (err) {
				console.log(err);
			}
		};
		verifyUser();
		setLoading(false);
	}, [token]);

	async function signUp(email, password, role, grade) {
		try {
			const user = await axios.post(
				'/api/user/register',
				{
					email,
					password,
					role,
					grade,
				},
				config
			);
			if (user) {
				setCurrentUser(user);
				setToken(user.data.token);
			}
		} catch (err) {
			console.log(err);
		}
	}
	async function login({ queryKey }) {

		const [, { email, password, role }] = queryKey;
		try {
			const user = await axios.post(
				'/api/user/login',
				{
					email,
					password,
					role,
				},
				config
			);
			if (user) {
				setCurrentUser(user);
				setToken(user.data.token);
			}
			return user;
		} catch (err) {
			console.log(err);
		}
	}
	function logout() {
		setLoading(true);
		setCurrentUser(null);
		localStorage.clear();
		setLoading(false);
	}
	const value = { currentUser, token, signUp, login, logout };
	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
