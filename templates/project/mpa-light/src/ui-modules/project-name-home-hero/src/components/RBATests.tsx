import { Button, RBAC } from '@common-components';
import React from 'react';

export function Badge({ children }: { children: React.ReactNode }) {
	return (
		<span className="inline-block px-6 py-3 rounded-full bg-green-100 text-green-800 text-sm font-medium">
			{children}
		</span>
	);
}

const RBAButtonWrapper = ({ disabled }: { disabled?: boolean }) => {
	return (
		<Button
			onClick={() => {
				alert('Should be enabled');
			}}
			label={`This is an RBA button - ${disabled ? 'disabled' : 'enabled'}`}
			disabled={disabled}
		/>
	);
};

export default function RBATests() {
	return (
		<div className="flex items-center flex-wrap justify-center gap-4 mt-[100px]">
			<RBAC id="bill_history_module">
				<Badge>This is an RBA test - visible for logged in user</Badge>
			</RBAC>
			<RBAC id="shopping-blocked-message">
				<Badge>This is an RBA test - visible for admin</Badge>
			</RBAC>
			<RBAC id="add-new-line">
				<RBAButtonWrapper />
			</RBAC>
			<RBAC id="asasa">
				<Badge>This is an RBA test - Not exist - should be visible</Badge>
			</RBAC>
		</div>
	);
}