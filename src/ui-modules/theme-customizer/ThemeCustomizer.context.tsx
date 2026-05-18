import { createContext, Dispatch, SetStateAction, useContext } from 'react';

type Ctx = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export const ThemeCustomizerContext = createContext<Ctx | undefined>(undefined);

export const useThemeCustomizer = () => {
	const ctx = useContext(ThemeCustomizerContext);
	if (!ctx) {
		throw new Error('useThemeCustomizer must be used within ThemeCustomizerProvider');
	}
	return ctx;
};
