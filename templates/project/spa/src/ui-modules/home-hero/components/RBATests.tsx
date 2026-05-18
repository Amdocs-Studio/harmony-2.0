import { Button, RBAC } from '@common-components';
import { Messages } from '@msgs';
import { useHomeHeroContext } from '../HomeHero.context';
import React from 'react';

export function Badge({ children }: { children: React.ReactNode }) {
	return (
		<span className="inline-block px-6 py-3 rounded-full bg-green-100 text-green-800 text-sm font-medium">
			{children}
		</span>
	);
}

const RBAButtonWrapper = ({ disabled }: { disabled?: boolean }) => {
	const { formatMessage } = useHomeHeroContext();
	return (
		<Button
			onClick={() => {
				alert('Should be enabled');
			}}
			label={formatMessage(disabled ? Messages.HomeHero.rbaButtonDisabled : Messages.HomeHero.rbaButtonEnabled)}
			disabled={disabled}
		/>
	);
};

export default function RBATests() {
	const { formatMessage } = useHomeHeroContext();
	return (
		<div className="flex items-center flex-wrap justify-center gap-4 mt-[100px]">
			<RBAC id="bill_history_module">
				<Badge>{formatMessage(Messages.HomeHero.rbaTestVisibleLoggedIn)}</Badge>
			</RBAC>
			<RBAC id="shopping-blocked-message">
				<Badge>{formatMessage(Messages.HomeHero.rbaTestVisibleAdmin)}</Badge>
			</RBAC>
			<RBAC id="add-new-line">
				<RBAButtonWrapper />
			</RBAC>
			<RBAC id="asasa">
				<Badge>{formatMessage(Messages.HomeHero.rbaTestNotExist)}</Badge>
			</RBAC>
		</div>
	);
}