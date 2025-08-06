import { RBAStatus } from './RbaConsts.ts';

export type PoliciesType = {
  id: string;
  value: RBAStatus;
}[];

export interface RbaStateType {
    permissions?: { [key: string]: RBAStatus };
}