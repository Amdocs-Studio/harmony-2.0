import { useMiniCartLayoutContext } from '../MiniCartLayout.provider';
import { PropsWithChildren } from 'react';
import { Grid2, Typography } from '@mui/material';
import { MiniCartLayoutProps } from '../MiniCartLayout.types.ts';
import MiniCart from './MiniCart.tsx';
import { Button } from '@common-components';

export default function MiniCartLayoutMain({ children }: PropsWithChildren<MiniCartLayoutProps>) {
	const { pageSubTitle, pageTitle, onMiniCartContinue, cartItems } = useMiniCartLayoutContext();
	return (
		<div
			className="hero bg-base-200 pb-[50px] pl-[20px]"
			style={{ minHeight: 'calc(100vh - 4rem)' }}
		>
			<div className="hero-content w-full flex-col">
				{pageTitle && <Typography variant="h2" component="h2" className="py-6">{pageTitle}</Typography>}
				{pageTitle && <Typography variant="h5" component="h5" className="!mb-[25px]">{pageSubTitle}</Typography>}
				<Grid2 container>
					<Grid2 container size={8} gap={'30px'}>
						{children}
					</Grid2>
					<Grid2 container size={4} className="flex !flex-col !max-w-[310px]">
						<MiniCart/>
						<Grid2 className=" mt-[25px] flex justify-end" >
							<Button onClick={() => onMiniCartContinue()} label="Checkout" isDisabled={!cartItems?.length}/>
						</Grid2>

					</Grid2>
				</Grid2>
			</div>
		</div>
	);
}
