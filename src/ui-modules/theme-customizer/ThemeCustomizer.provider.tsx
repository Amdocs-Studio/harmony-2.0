import { PropsWithChildren, useMemo, useState } from 'react';
import { ThemeCustomizerContext } from './ThemeCustomizer.context';

export default function ThemeCustomizerProvider({ children }: PropsWithChildren) {
	const [open, setOpen] = useState(false);
	const value = useMemo(() => ({ open, setOpen }), [open]);
	return (
		<ThemeCustomizerContext.Provider value={value}>
			{children}
		</ThemeCustomizerContext.Provider>
	);
}
