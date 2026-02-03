export interface ErrorMatchCriteria {
	status?: number | null;
	code?: string | null;
	message?: string | null;
	characteristics?: string[] | null;
}

export interface DisplayedError {
	title: string;
	description: string;
	showMoveHomeButton: boolean;
	// Action ID to navigate to when the user clicks the "Move Home" button, showMoveHomeButton must be true
	navigationRoute?: string;
	// Custom text for the button, defaults to "Go to Homepage"
	buttonText?: string;
}

export interface ErrorMapping {
	error: ErrorMatchCriteria;
	displayedError: DisplayedError;
	isPartialMatch?: boolean;
}

/**
 * Error mappings for specific error codes and messages
 * This is used to display a custom error message and button text for specific error codes and messages
 * It will match only sent fields in "error" object. If a field is not sent, it will be ignored in the matching process.
 * Allowed fields are: status, code, message
 *
 * Matching priority:
 * 1. Characteristics - matches if the mapping's message matches any error characteristic value
 * 2. Message - matches if the mapping's message matches the error message
 *
 * isPartialMatch: If true, uses "includes" matching instead of exact equality for message/characteristics matching - USE CAREFULLY
 */
export const errorMappings: ErrorMapping[] = [
	{
		error: {
			status: 400,
			message: 'Order ID is already cancelled.'
		},
		displayedError: {
			title: 'Order Canceled',
			description: 'This order has been canceled and is no longer available for tracking.',
			showMoveHomeButton: true
		}
	},
	{
		error: {
			status: 400,
			message: 'This tracking link has expired or is no longer valid'
		},
		displayedError: {
			title: 'Oops...',
			description: 'This tracking link has expired or is no longer valid.',
			showMoveHomeButton: true
		}
	}
];

// DO NOT CHANGE THOSE UNLESS SPECIFICALLY REQUIRED
export const commonErrors: ErrorMapping[] = [
	{
		error: {
			status: 400,
		},
		displayedError: {
			title: 'Something went wrong.',
			description: 'The server cannot process the request. Please refresh the page. If the problem persists, check the address or try again later.',
			showMoveHomeButton: true
		}
	},
	{
		error: {
			status: 404,
		},
		displayedError: {
			title: 'The requested page can\'t be found.',
			description: 'Please check the address or try again later.',
			showMoveHomeButton: true
		}
	},
	{
		error: {
			status: 405,
		},
		displayedError: {
			title: 'Something went wrong.',
			description: 'The server can\'t process the request. Please check the address or try again later.',
			showMoveHomeButton: true
		}
	},
	{
		error: {
			status: 408,
		},
		displayedError: {
			title: 'Something went wrong.',
			description: 'The server timed out. Please check the address or try again later.',
			showMoveHomeButton: true
		}
	},
	{
		error: {
			status: 500,
		},
		displayedError: {
			title: 'Something went wrong.',
			description: 'Please refresh the page or try again later.',
			showMoveHomeButton: true
		}
	},
	{
		error: {
			status: 503,
		},
		displayedError: {
			title: 'Something went wrong',
			description: 'Please refresh the page or try again later.',
			showMoveHomeButton: true
		}
	},
];
