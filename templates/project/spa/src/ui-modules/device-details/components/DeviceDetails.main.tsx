import { useDeviceDetailsContext } from '../DeviceDetails.provider';
import { MiniCartLayout } from '@ui-modules';
import { CartItem, shoppingCartApi } from '@sdk';
import { DeviceCard } from '@common-components';

export default function DeviceDetailsMain() {
	const { cartItems } = useDeviceDetailsContext();
	const { data: devices } = shoppingCartApi.useGetDevicesQuery();
	return (
		<MiniCartLayout
			pageTitle="Multiple devices in your cart"
			pageSubTitle="You have selected multipe devices for purchase, kindly review before you progress."
		>
			{cartItems?.map((cartItem: CartItem) => {
				const device = devices?.find((device) => device.sku === cartItem.sku);
				if (!device) {
					return null;
				}
				return (
					<DeviceCard key={device.sku} {...device} />
				);
			})}
		</MiniCartLayout>
	);
}
