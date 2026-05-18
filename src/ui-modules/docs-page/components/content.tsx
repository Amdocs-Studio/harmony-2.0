import { ReactNode } from 'react';
import { Alert, AlertTitle, IconButton, Tooltip, Typography, useTheme } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LinkIcon from '@mui/icons-material/Link';
import { Highlight, themes, type Language } from 'prism-react-renderer';
import clsx from 'clsx';

type WithId = { id: string; children: ReactNode; className?: string };

const AnchorLink = ({ id }: { id: string }) => {
	const onClick = (e: React.MouseEvent) => {
		e.preventDefault();
		const url = `${window.location.origin}${window.location.pathname}#${id}`;
		window.history.replaceState(null, '', `#${id}`);
		navigator.clipboard?.writeText(url);
	};
	return (
		<Tooltip title="Copy link to this section" placement="top">
			<IconButton
				component="a"
				href={`#${id}`}
				onClick={onClick}
				size="small"
				aria-label={`Link to ${id}`}
				className="!ml-2 !p-1 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity"
				sx={{
					color: 'primary.main',
					backgroundColor: 'action.hover',
					'&:hover': { backgroundColor: 'action.selected' },
				}}
			>
				<LinkIcon sx={{ fontSize: '0.7em' }} />
			</IconButton>
		</Tooltip>
	);
};

export const H2 = ({ id, children, className }: WithId) => (
	<Typography
		id={id}
		variant="h5"
		component="h2"
		className={clsx(
			'group !font-semibold !mt-2 !mb-3 scroll-mt-16 flex items-center',
			className,
		)}
	>
		{children}
		<AnchorLink id={id} />
	</Typography>
);

export const H3 = ({ id, children, className }: WithId) => (
	<Typography
		id={id}
		variant="h6"
		component="h3"
		className={clsx(
			'group !font-semibold !mt-1 !mb-2 scroll-mt-16 flex items-center',
			className,
		)}
	>
		{children}
		<AnchorLink id={id} />
	</Typography>
);

export const P = ({ children, className }: { children: ReactNode; className?: string }) => (
	<Typography variant="body1" component="p" className={clsx('leading-relaxed', className)}>
		{children}
	</Typography>
);

export const Lead = ({ children }: { children: ReactNode }) => (
	<Typography variant="subtitle1" color="text.secondary" className="leading-relaxed">
		{children}
	</Typography>
);

export const UL = ({ children }: { children: ReactNode }) => (
	<ul className="list-disc pl-6 flex flex-col gap-1 leading-relaxed">{children}</ul>
);

export const OL = ({ children }: { children: ReactNode }) => (
	<ol className="list-decimal pl-6 flex flex-col gap-1 leading-relaxed">{children}</ol>
);

export const InlineCode = ({ children }: { children: ReactNode }) => (
	<code className="font-mono text-[0.85em] px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">
		{children}
	</code>
);

type PreProps = {
	children: string;
	lang?: string;
	label?: string;
};

// Map user-friendly language aliases to Prism language keys.
const languageAliases: Record<string, Language> = {
	ts: 'tsx',
	typescript: 'tsx',
	js: 'jsx',
	javascript: 'jsx',
	sh: 'bash',
	shell: 'bash',
	json5: 'json',
	yml: 'yaml',
};

const resolveLanguage = (lang?: string): Language => {
	if (!lang) {
		return 'tsx';
	}
	const normalized = lang.toLowerCase();
	return languageAliases[normalized] ?? (normalized as Language);
};

export const Pre = ({ children, lang, label }: PreProps) => {
	const { palette } = useTheme();
	const code = children.replace(/\n$/, '');
	const copy = () => navigator.clipboard?.writeText(code);
	const prismTheme = palette.mode === 'dark' ? themes.vsDark : themes.vsLight;
	const language = resolveLanguage(lang);

	return (
		<div className="relative group rounded-lg overflow-hidden border border-black/10 dark:border-white/10">
			{(label || lang) && (
				<div className="flex items-center justify-between px-4 py-1.5 text-xs font-mono border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
					<span className="opacity-70">{label ?? lang}</span>
				</div>
			)}
			<Highlight theme={prismTheme} code={code} language={language}>
				{({ className, style, tokens, getLineProps, getTokenProps }) => (
					<pre
						className={clsx(
							className,
							'!m-0 px-4 py-3 font-mono text-sm overflow-auto leading-relaxed',
						)}
						style={style}
					>
						{tokens.map((line, i) => (
							<div key={i} {...getLineProps({ line })}>
								{line.map((token, key) => (
									<span key={key} {...getTokenProps({ token })} />
								))}
							</div>
						))}
					</pre>
				)}
			</Highlight>
			<Tooltip title="Copy">
				<IconButton
					size="small"
					onClick={copy}
					className="!absolute !top-1.5 !right-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
					aria-label="Copy code"
				>
					<ContentCopyIcon fontSize="inherit" />
				</IconButton>
			</Tooltip>
		</div>
	);
};

type CalloutProps = {
	type?: 'note' | 'tip' | 'warning' | 'info';
	title?: string;
	children: ReactNode;
};

const calloutSeverity = {
	note: 'info',
	tip: 'success',
	warning: 'warning',
	info: 'info',
} as const;

export const Callout = ({ type = 'note', title, children }: CalloutProps) => (
	<Alert severity={calloutSeverity[type]} variant="outlined" className="!rounded-lg">
		{title && <AlertTitle className="!font-semibold">{title}</AlertTitle>}
		{children}
	</Alert>
);

type Col = { key: string; header: ReactNode; className?: string };

export function DocsTable<Row extends Record<string, ReactNode>>({
	columns,
	rows,
}: { columns: Col[]; rows: Row[] }) {
	return (
		<div className="overflow-x-auto border border-black/10 dark:border-white/10 rounded-lg">
			<table className="w-full text-sm">
				<thead className="bg-black/5 dark:bg-white/5">
					<tr>
						{columns.map((c) => (
							<th key={c.key} className={clsx('text-left font-semibold px-3 py-2', c.className)}>
								{c.header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row, i) => (
						<tr key={i} className="border-t border-black/10 dark:border-white/10">
							{columns.map((c) => (
								<td key={c.key} className={clsx('align-top px-3 py-2', c.className)}>
									{row[c.key] ?? ''}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

type ExtProps = { href: string; children: ReactNode };
export const ExtLink = ({ href, children }: ExtProps) => (
	<a
		href={href}
		target="_blank"
		rel="noreferrer"
		className="underline decoration-dotted hover:decoration-solid"
		style={{ color: 'var(--color-primary-700, #4338ca)' }}
	>
		{children}
	</a>
);
