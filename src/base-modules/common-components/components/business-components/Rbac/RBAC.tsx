import React, { ReactNode } from 'react';
import { useAppSelector, RbaConsts } from '@sdk';

export interface RbacProps {
  children?: ReactNode;
  authenticated?: boolean;
  id: string;
}
type RBAStatusType = RbaConsts.RBAStatus;
const { RBAStatus } = RbaConsts;

export const RBAC: React.FC<RbacProps> = ({ children, authenticated, id }) => {
	const { permissions } = useAppSelector(state => state.rba);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const applyAuth = (child: ReactNode) => {
		if (typeof authenticated !== 'undefined' && !authenticated) {
			return null;
		}
		return child;
	};

	const applyRules = (child: ReactNode, permissions: RBAStatusType | undefined) => {
		if (child !== null) {
			if (!permissions || permissions === RBAStatus.HIDDEN) {
				return null;
			} else if (permissions === RBAStatus.DISABLED) {
				return React.cloneElement(child as React.ReactElement<any>, {
					disabled: true,
				});
			}
		}
		return child;
	};

	const wrap = (child: ReactNode) => {
		if (child !== null) {
			return React.cloneElement(child as React.ReactElement<any>, {
				'data-rbac-id': id,
			});
		}
		return child;
	};

	const permissionsContext = permissions?.[id];
	const child = children ? React.Children.only(children) : null;
	// ENABLE THE FOLLOWING LINE IF YOU WANT TO HAVE THE ABILITY TO SHOW OR HIDE COMPONENTS
	// BASED ON USER THAT AUTHENTICATED OR NOT
	// let result = this.applyAuth(child);
	let result = applyRules(child, permissionsContext);
	result = wrap(result);

	return result;
};
