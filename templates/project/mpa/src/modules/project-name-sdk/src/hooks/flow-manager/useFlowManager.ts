import { flowManager } from '../../store.ts';
import { flowsTypes, TypesConfig } from '@config';
import { NavigateFunction } from '../../index.ts';

const useFlowManager = (navigate: NavigateFunction) =>  {
	const getFlowInformation = () => {
		return {
			flowType: flowManager.getFlowType(),
			subFlowType: flowManager.getSubFlowTypes(),
			currentStep: flowManager.getCurrentStep(),
			nextStep: flowManager.getNextStep(),
			steps: flowManager.getSteps()
		};
	};
	const isLastStep = () => {
		const { flowType } = getFlowInformation();
		if (flowType) {
			return flowManager.isLastStep();
		}
		return false;
	};
	const isFirstStep = (steps: string[], currentStep: string): boolean => {
		return steps[0] === currentStep;
	};
	const isStepIncludedInFlow = (stepName: string) => {
		const { steps } = getFlowInformation();
		return steps?.length && steps.includes(stepName);
	};
	const calculatePreviousStep = (steps: string[], chosenStep: string) => {
		const indexOfChosenStep = steps.indexOf(chosenStep);
		if (indexOfChosenStep > -1 && steps[indexOfChosenStep - 1]) {
			return steps[indexOfChosenStep - 1];
		}
		return '';
	};
	const startFlow = async (flowType: string, currentStep: string, isMoveToStep = false) => {
		console.log('startFlow', flowType, currentStep, isMoveToStep);
		await flowManager.startFlow(flowType, currentStep, true, 250);
		if (isMoveToStep) {
			await moveToNextStep(currentStep);
		}
	};
	const endFlow = () => {
		flowManager.endFlow();
	};
	const moveToNextStep = async (step?: string, isUpdateInformation = true) => {
		console.log('moveToNextStep');
		const { flowType } = getFlowInformation();
		if (!flowType) {
			return;
		}
		if (isUpdateInformation) {
			await flowManager.updateInformation();
		}
		const isItLastStep = isLastStep();
		const nextStep = flowManager.nextStep(step);
		const pathToMove = (flowsTypes as TypesConfig).stepTypes[nextStep]?.path;
		if (!pathToMove || isItLastStep) {
			return;
		}
		navigate(pathToMove);
	};
	const moveToPrevStep = async (step: string, isUpdateInformation = true) => {
		const { flowType, steps, currentStep } = getFlowInformation();
		const chosenStep = step || currentStep;
		if (!flowType) {
			return;
		}
		if (isUpdateInformation) {
			await flowManager.updateInformation();
		}
		const previousStep = calculatePreviousStep(steps, chosenStep);
		const pathToMove = (flowsTypes as TypesConfig).stepTypes[previousStep]?.path;

		if (pathToMove && !isFirstStep(steps, chosenStep)) {
			navigate(pathToMove);
		}
	};
	return {
		getFlowInformation,
		startFlow,
		endFlow,
		moveToNextStep,
		moveToPrevStep,
		isLastStep,
		isFirstStep,
		isStepIncludedInFlow,
		calculatePreviousStep
	};
};

export default useFlowManager;
