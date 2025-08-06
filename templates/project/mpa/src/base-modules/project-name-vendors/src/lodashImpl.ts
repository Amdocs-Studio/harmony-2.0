export function get( object: any, keys: any, defaultVal?: any ) {
	const newKeys = Array.isArray( keys ) ? keys : keys.split('.');
	const newObject = object[newKeys[0]];
	if( newObject && newKeys.length > 1 ) {
		return get( newObject, newKeys.slice(1) );
	}
	return newObject === undefined ? defaultVal : newObject;
}

export const pull = (arr: any[], values: any[]) => {
	return arr.filter((item) => {
		return values.indexOf(item) < 0;
	});
};

export function isEqual(value: any, other: any) {
	if (typeof value !== 'object' && typeof other !== 'object') {
		return Object.is(value, other);
	}
	if (value === null && other === null) {
		return true;
	}
	if (typeof value !== typeof other) {
		return false;
	}
	if (value === other) {
		return true;
	}
	if (Array.isArray(value) && Array.isArray(other)) {
		if (value.length !== other.length) {
			return false;
		}
		for (let i = 0; i < value.length; i++) {
			if (!isEqual(value[i], other[i])) {
				return false;
			}
		}
		return true;
	}
	if (Array.isArray(value) || Array.isArray(other)) {
		return false;
	}
	if (Object.keys(value).length !== Object.keys(other).length) {
		return false;
	}
	for (const [k, v] of Object.entries(value)) {
		if (!(k in other)) {
			return false;
		}
		if (!isEqual(v, other[k])) {
			return false;
		}
	}
	return true;
}

export function difference(array: any[], ...values: any[]) {
	if (!Array.isArray(array)) {
		return []; // Or throw an error, depending on desired behavior for invalid input
	}
	
	// Flatten the 'values' arrays into a single Set for efficient lookups
	const valuesSet = new Set();
	for (const valArray of values) {
		if (Array.isArray(valArray)) {
			for (const item of valArray) {
				valuesSet.add(item);
			}
		} else {
			// Handle cases where a single value (not an array) is passed
			valuesSet.add(valArray);
		}
	}
	
	const result = [];
	for (const item of array) {
		if (!valuesSet.has(item)) {
			result.push(item);
		}
	}
	return result;
}

export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
	let timeoutId: ReturnType<typeof setTimeout> | undefined;
	return (...args: Parameters<T>) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => fn(...args), delay);
	};
}
export function last(array: any[]) {
	if (!Array.isArray(array) || array === null) {
		return undefined;
	}
	if (array.length === 0) {
		return undefined;
	}
	return array[array.length - 1];
}
