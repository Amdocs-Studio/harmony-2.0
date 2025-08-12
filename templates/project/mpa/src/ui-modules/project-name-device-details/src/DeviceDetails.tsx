import { DeviceDetailsProps } from './DeviceDetails.types';
import { DeviceDetailsProvider } from './DeviceDetails.provider';
import './styles/index.css';

export default function DeviceDetails(props: DeviceDetailsProps) {
	return <DeviceDetailsProvider {...props} />;
}