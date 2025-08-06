import { useFeedbackHandlerContext } from '../FeedbackHandler.provider';

const { log } = console;
export default function Modals() {
	const { modals } = useFeedbackHandlerContext();
	if (!modals.length) {
		return null;
	}

	const handleModalAction = (action?: string) => {
		/*
    const instances = getInstance();
    if (!action) {
        return;
    }
    const apiAndMethod = action.split('.');
    if (apiAndMethod.length !== 2) {
        return;
    }
    const api = apiAndMethod[0] as keyof ApisType;
    const method = apiAndMethod[1];
    const apiInstance = instances[api];
    if (apiInstance && apiInstance[method] && typeof apiInstance[method] === 'function') {
        apiInstance[method]();
    }
    */
		log('handleModalAction', action);
	};

	return modals.map((modal) => {
		return (
		/*
            <ModalDialog
                key={modal.id}
                open
                onClose={modal.onDismiss}
                header={modal.title}
                primaryButtonText={modal.primaryButtonText}
                secondaryButtonText={modal.secondaryButtonText}
                onPrimaryClick={modal.onPrimaryButtonClick ? () => handleModalAction(modal.onPrimaryButtonClick) : undefined}
                onSecondaryClick={modal.onSecondaryButtonClick ? () => handleModalAction(modal.onSecondaryButtonClick) : undefined}
            >
                <div dangerouslySetInnerHTML={{__html: modal.message}}/>
            </ModalDialog>
             */
			<div key={modal.id}>
				some message
				<button onClick={() => handleModalAction(modal.onPrimaryButtonClick)}>Primary</button>
			</div>
		);
	});
}