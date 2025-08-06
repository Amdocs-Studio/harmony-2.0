import { Button } from '@common-components';
import { Device } from '../DeviceGallery.types.ts';
import {
	Card, Grid2, CardContent, Typography, CardActions, CardMedia
} from '@mui/material';
import { CartItem } from '@sdk';

interface DeviceCardProps {
	device: Device;
	onDeviceSelect?: (device: CartItem) => void;
	isShowDescription?: boolean;
	isShowBuyButton?: boolean;
}

export default function DeviceCard({
	device,
	onDeviceSelect,
	isShowDescription = true,
	isShowBuyButton = true
}: DeviceCardProps) {
	const { title, description, price, images, sku } = device;
	const getRandomNumberBasedOnTime = () => {
		const currentTime = new Date().getTime();
		const prefix = (currentTime % 20) + 1;
		return new Promise<string>((resolve) => {
			setTimeout(() => {
				const delayedTime = new Date().getTime();
				const suffix = (delayedTime % 20) + 1;
				resolve(`${prefix}${sku}${suffix}`);
			}, 1000);
		}).then((result) => result);
	};

	const handleButtonClick = async () => {
		const id = await getRandomNumberBasedOnTime();
		onDeviceSelect?.({ name: title, price, id, sku });
	};

	return (
		<Grid2 container key={sku} sx={{ maxWidth: '200px' }}>
			<Card className="device-card">
				<CardContent className="device-card-content">
					<Grid2 container spacing={2}>
						<Grid2>
							<CardMedia
								sx={{ height: '200px' }}
								className="device-card-img"
								image={images[1]}
								component="img"
								title={title}
							/>
						</Grid2>
						<Grid2 container sx={{ width: '100%', height: '65px' }}>
							<Typography variant="h5" component="h2" data-automation-id="card-title">
								{title}
							</Typography>
						</Grid2>
						<Grid2 container sx={{ width: '100%', height: '220px' }}>
							{isShowDescription && <Typography variant="body2" component="p">
								{description}
							</Typography>
							}
						</Grid2>
						<Grid2 container sx={{ width: '100%' }}>
							<Typography variant="body1" component="p">
								Price: <b>${price}</b>
							</Typography>
						</Grid2>
					</Grid2>
				</CardContent>
				<CardActions style={{ display: 'inherit' }} className="flex justify-end">
					{isShowBuyButton &&
						<Button data-automation-id="add-to-cart" onClick={() => handleButtonClick()}>Buy</Button>
					}
				</CardActions>
			</Card>
		</Grid2>
	);
}
