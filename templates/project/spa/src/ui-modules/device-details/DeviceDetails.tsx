import { DeviceDetailsProps } from './DeviceDetails.types';
import { DeviceDetailsProvider } from './DeviceDetails.provider';
import DeviceDetailsMain from './components/DeviceDetails.main';
import './styles/index.css';

export default function DeviceDetails(props: DeviceDetailsProps) {
	return (
		<DeviceDetailsProvider {...props}>
			<DeviceDetailsMain />
		</DeviceDetailsProvider>
	);
}