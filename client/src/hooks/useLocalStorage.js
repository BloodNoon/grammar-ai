import { useState, useEffect } from 'react';

const PREFIX = 'students-writing-';

export default function useLocalStorage(key, initialValue) {
	const prefixedKey = PREFIX + key;
	const [value, setValue] = useState(() => {
		try {
			const jsonValue = localStorage.getItem(prefixedKey);
			if (jsonValue != null) return JSON.parse(jsonValue);
		} catch (err) {
			console.error(`Error parsing localStorage key "${prefixedKey}":`, err);
		}
		if (typeof initialValue == 'function') {
			return initialValue();
		} else {
			return initialValue;
		}
	});

	useEffect(() => {
		localStorage.setItem(prefixedKey, JSON.stringify(value));
   }, [prefixedKey, value]);
   
   return [value, setValue];
}
