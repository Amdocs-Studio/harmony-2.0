import { useState, useCallback } from 'react';

export function useProjectName(initialValue = '') {
	const [value, setValue] = useState(initialValue);

	const reset = useCallback(() => {
		setValue(initialValue);
	}, [initialValue]);

	return { value, setValue, reset };
}
