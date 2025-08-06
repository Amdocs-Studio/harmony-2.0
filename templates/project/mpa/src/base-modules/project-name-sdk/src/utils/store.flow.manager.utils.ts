import CreateFlowManager, { parseSubFlowsJSON } from 'redux-flow-manager';
import { subFlowsConfig, flowsConfig } from '@flow-manager-config';
import { flowsConditions } from '../hooks/flow-manager/index';
export default (Store: any) => CreateFlowManager(Store, 'flowManagerFlows', parseSubFlowsJSON(subFlowsConfig, flowsConditions), flowsConfig);
