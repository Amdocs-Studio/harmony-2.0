# Flow Manager Installation and Establishment
Flow Manager help you to manage flow information by determine the current step, next step and define the set of conditions that satisfy the steps.
<br/>
Flow Manger using [XState](https://github.com/davidkpiano/xstate) for state machine to calculate where are you currently in the flow and where you need to go.


!!! note "Harmony 2.0 Flow Manager"
    Harmony 2.0 contains flow manager by default and is ready to use. <br/>
    Click [Here](./flow_manager.md) to check the usage guide.

## Install

```bash
npm install --save redux-flow-manager
```

## Usage

Check out the example in the files `app.ts` and `flowManger.browser.ts` in the [Test Folder](https://github.com/refaelok/redux-flow-manager/tree/master/test).

**Step 1:** Add the flow manager reducer to your project.

```TS
import { combineReducers } from 'redux';
import { flowManagerReducer } from 'redux-flow-manager';

const reducers = {
	...,
	flowManagerFlows: flowManagerReducer
};
const rootReducer = combineReducers(reducers);
```

**Step 2:** Create Steps Configuration file - steps config define the set of steps for each sub flow types.
(config files properties are explained below. [Steps Configuration](#steps-configuration)


**Step 3:** Create Flows Configuration file - flow config file define the sub flow types name and the conditions that should be success to make this sub flow valid.
(config files properties are explained below. [Flows Configuration](#flows-configuration)


**Step 4:** Call `CreateFlowManagerAPI` with your store, reducer slice name, flows configuration and steps configuration.
( more details of how configuration should be look like will explain later )

```TS
// sdk/store.ts

import { CreateFlowManager } from './utils';

export const flowManager = CreateFlowManager(store);
```

**Step 5:** `CreateFlowManagerAPI` return an instance of Flow Manager with functionality that will help you manage flows in your app.

```TS
// ./store.flow.manager.utils.ts

import CreateFlowManager, { parseSubFlowsJSON } from 'redux-flow-manager';
import { subFlowsConfig, flowsConfig } from '@config';
import { flowsConditions } from '../hooks/flow-manager/index';

export default (Store: any) => CreateFlowManager(Store, 'flowManagerFlows', parseSubFlowsJSON(subFlowsConfig, flowsConditions), flowsConfig);
```

## Store Structure

```ts
interface FlowManagerState {
	flowType: string;
	subFlowTypes: Array<string>;
	currentStep: string;
	nextStep: string;
	steps: Array<string>;
}
```



## Initial Flow Manager

### CreateFlowManagerAPI(store, sliceName, flowsConfig, stepsConfig);

Create new instance of flow manager.
All the API methods of flow manager describe below.

##### arguments:

| Property | Type | Required | Default | Description |
|:--------------|:--------------|:--------------|:--------------|:--------------|
| `store` | object | Required | undefined | Pass in the redux store. |
| `sliceName` | string | Required | undefined | the name of the reducer slice |
| `flowsConfig` | SubFlowsConfig | Required | undefined | [Flows Configuration](#flows-configuration) |
| `stepsConfig` | StepsConfig | Required | undefined | [Steps Configuration](#steps-configuration) |



<br />

## Start and End Flow

### async startFlow(flowType, autoUpdate, currentStep)

Start flow is used when your app is init the main flow type in the store.
That flow type represent a set of sub flow types in your [Flows Configuration](#flows-configuration)

##### arguments:

| Property | Type | Required | Default | Description |
|:--------------|:--------------|:--------------|:--------------|:--------------|
| `flowType` | string | Required | undefined | The flow type that represent a set of sub flow types [Flows Configuration](#flows-configuration) |
| `currentStep` | string | Required | undefined | Initial specific step by start the flow instead of the first step that define in steps array |
| `autoUpdate` | boolean | Optional | undefined | Optionally pass indicate to automatic run state machine calculator to calculate the flow information data for any change in store |

### endFlow()

End the flow. Clear all the data from flow manager.

## Steps Actions

### async updateInformation()

Update Information running the state machine to calculate the sub flows condition and update the steps information and sub flows.

**NOTE**: If you call `startFlow` with `autoUpdate` true, this method invoke automatic for every change in store.
This is very useful for auto calculation nd update your component automatic without worry when to call to updateInformation.

### nextStep(step?)

Next Step method update the current step with the next step and the next step with the new next step<br />
return the next step value.

**NOTE**: To Promise last updated result, call to updateInformation before.

##### arguments:

| Property | Type   | Required | Default     | Description                                                                                      |
|:---------|:-------|:---------|:------------|:-------------------------------------------------------------------------------------------------|
| `step`   | string | Optional | currentStep | Optional to pass the step move to. by default it move to the next step according to steps array. |

### isLastStep()

Return if the current step is the last step.

**NOTE**: To Promise last updated result, call to updateInformation before.

## Selectors

Each Selector return the corresponding value from the store.

**NOTE** is not recommended to use directly with selector.<br />
Use Step Actions async methods to get the most updated result before navigate to next step for example.

- getFlowType()
- getSubFlowTypes()
- getCurrentStep()
- getSteps()
- getNextStep()


<br />

### Flows Configuration

Flows Config is an array of object, that each object define the sub flow that may be in your entire application.<br />
Each flow object have conditions array that each condition include callback.
that callback can check anything related to the condition, if the condition you check is success then return resolve, if the condition is failed then return reject.

If all conditions of a sub flow pass, then this sub flow added to the subFlowTypes array 

Flow Object Properties:

- `flowName: string` - unique name of the sub flow type
- `conditions: array` - an array of Condition Object
- `conditionName: string` - the name of the condition
- `onCheck: function` - a `promise` function that return `resolve` when the condition success and `reject` if the condition should be failed
- `mandatory: boolean` - optional property. define if to remove that sub flow from the array if this condition failed. true by default.

**NOTE** The Order of the Flow Objects in the array are matter.
The checks will run by that order.

```js
const flowsConfig = [
    {
        "flowName": "defaultScenario",
        "color": "#9b9b9b",
        "conditions": [
            {
                "conditionName": "defaultSuccessCondition",
                "onCheck": "defaultSuccessCondition",
                "displayName": "Default Success",
                "description": "Return Always Success to be used for every Flow as Default Scenario"
            }
        ]
    },
    {
        "flowName": "multipleDevices",
        "conditions": [
            {
                "conditionName": "multipleDevicesCondition",
                "onCheck": "multipleDevicesCondition",
                "displayName": "Multiple Devices COP",
                "description": "Return success if there are multiple devices in the cart"
            }
        ],
        "runInFlowTypes": [
            "COP"
        ],
        "color": "#3133a4"
    }
];
```

<br />

### Steps Configuration

Steps configuration define for each flow and sub flow, the set of steps that the user need to complete in your application.

Step Object Properties:

- `key: flowType` (Example: `COP`) - the key represent the `flowType`
- `key: subFlowType` (Example: `planOnlyFlow`) - represent the `subFlowType`
- `stesp: array` - set of steps for this `flowType` and `subFlowType`

!!! warning "Sub-Flows Order"
    The Order of the Sub flow Objects in the object matters, **The checks will run by that order.**<br/>
    For example: if you put `defaultScenario` before `multipleDevices`, then `defaultScenario` always wil be set before `multipleDevices`.

```js
const stepsConfig = {
    "COP": {
        "multipleDevices": {
            "id": "43da9488-07a0-4c36-aa76-587bc62707ff6",
            "steps": [
                "DEVICE_GALLERY",
                "DEVICE_DETAILS",
                "REVIEW_BASKET"
            ],
            "description": "Generic COP flow for multiple devices in the cart"
        },
        "defaultScenario": {
            "id": "374323dd-d091-4164-993a-3dcce359bca3",
            "steps": [
                "DEVICE_GALLERY",
                "REVIEW_BASKET"
            ],
            "description": "Generic COP flow for one device in the cart"
        }
    }
};
```


### XState

### getMachineFlowConfig()

Return an XState config that can be set in XState visualizer to see your state machine created by your config.

[XState Visualizer](https://xstate.js.org/viz/?gist=cebc9af156574bc7eea62b99292e3f56)
![Alt text](../../assets/images/state-machine.png)
