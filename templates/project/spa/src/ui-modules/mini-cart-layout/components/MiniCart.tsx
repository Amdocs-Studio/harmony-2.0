import { Grid2, Typography } from '@mui/material';
import { CartItem } from '@sdk';
import { useMiniCartLayoutContext } from '../MiniCartLayout.provider.tsx';

export default function MiniCart() {
	const { cartItems } = useMiniCartLayoutContext();
	const totalPrice = cartItems?.reduce((sum, item) => sum + item.price, 0) ?? 0;

	return (
		<Grid2 container sx={{ height: 'fit-content' }} className="mr-[10px]  !min-w-[300px] !max-w-[300px] !pr-[10px]">
			<Typography variant="h4" className="pt-5 pb-5">Your cart</Typography>
			{cartItems?.map((item: CartItem, index: number) => (
				<Grid2 container sx={{ height: 'fit-content', width: 'fit-content' }} key={index} className="">
					<Grid2 size={6} className="!w-[120px] !min-w-[120px] mr-[5px] p-[5px]">
						<Typography variant="body1">{item.name}</Typography>
					</Grid2>
					<Grid2 size={6} className="!w-[120px] !min-w-[120px] mr-[5px] p-[5px] flex justify-end">
						<Typography variant="body1">${item.price}</Typography>
					</Grid2>
				</Grid2>
			))}
			<Grid2 container sx={{ height: 'fit-content', width: 'fit-content' }} className="">
				<Grid2 size={6} className="!w-[120px] !min-w-[120px] mr-[5px] p-[5px]">
					<Typography variant="h6">Total:</Typography>
				</Grid2>
				<Grid2 size={6} className="!w-[120px] !min-w-[120px] mr-[5px] p-[5px] flex justify-end">
					<Typography variant="h6">${totalPrice.toFixed(2)}</Typography>
				</Grid2>
			</Grid2>
		</Grid2>
	);
}
