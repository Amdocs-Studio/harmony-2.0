import { useDeviceDetailsContext } from '../DeviceDetails.provider';
import devices from '../../device-gallery/components/devices-mock-data.ts';
import DeviceCard from '../../device-gallery/components/DeviceCard.tsx';
import { MiniCartLayout } from '@ui-modules';
import { CartItem } from '@sdk';

export default function DeviceDetailsMain() {
	const { cartItems } = useDeviceDetailsContext();
	return (
		<MiniCartLayout
			pageTitle="Multiple devices in your cart"
			pageSubTitle="You have selected multipe devices for purchase, kindly review before you progress."
		>
			{cartItems?.map((cartItem: CartItem) => {
				const device = devices.find((device) => device.sku === cartItem.sku);
				if (!device) {
					return null;
				}
				return (
					<DeviceCard device={device} key={device.sku} isShowBuyButton={false} isShowDescription={false}/>
				);
			})}
		</MiniCartLayout>
	);
}
