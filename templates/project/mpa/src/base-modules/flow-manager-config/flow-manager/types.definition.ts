export interface FlowTypes {
  [key: string]: string;
}

export interface SubFlowTypes {
  [key: string]: string;
}

export interface StepType {
  displayName: string;
  name: string;
  path: string;
}

export interface StepTypes {
  [key: string]: StepType;
}

export interface Condition {
  conditionName: string;
  onCheck: string;
  displayName: string;
  description: string;
}

export interface TypesConfig {
  flowTypes: FlowTypes;
  subFlowTypes: SubFlowTypes;
  stepTypes: StepTypes;
  conditions: Condition[];
}
