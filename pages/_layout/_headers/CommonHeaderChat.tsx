import React, { useState } from 'react';
import { useRouter } from 'next/router';
import OffCanvas, { OffCanvasBody, OffCanvasHeader } from '../../../components/bootstrap/OffCanvas';
import Button from '../../../components/bootstrap/Button';
import Avatar from '../../../components/Avatar';
import USERS from '../../../common/data/userDummyData';
import Logo from '../../../components/Logo';

const CommonHeaderChat = () => {
	const [state, setState] = useState<boolean>(false);
	const router = useRouter();

	return (
		<>
			{/* Clicking the avatar opens the OffCanvas menu */}
			<div
				className='col d-flex align-items-center cursor-pointer'
				onClick={() => setState(!state)}
				role='presentation'>
				<div className='me-3'>
					<div className='text-end'>
						<div className='fw-bold fs-6 mb-0'>{`${USERS.CHLOE.name}`}</div>
						<div className='text-muted'>
							<small>Guest</small>
						</div>
					</div>
				</div>
				<div className='position-relative'>
					<Avatar src={USERS.CHLOE.src} size={48} color={USERS.CHLOE.color} />
				</div>
			</div>

			{/* OffCanvas (side menu) with Login & Sign Up buttons */}
			<OffCanvas
				id='login-menu'
				isOpen={state}
				setOpen={setState}
				placement='end'
				isModalStyle
				isBackdrop={false}
				isBodyScroll>
				<OffCanvasHeader setOpen={setState} className='fs-5'>
					Welcome, {`${USERS.CHLOE.name}`}!
				</OffCanvasHeader>
				<OffCanvasBody className='d-flex flex-column items-content-between gap-3 w-100'>
					<Avatar className="" src={USERS.CHLOE.src} size={100} color={USERS.CHLOE.color} />
					<Button color='primary' onClick={() => router.push('/auth-pages/login')}>
						Login
					</Button>
					<Button color='success' onClick={() => router.push('/auth-pages/sign-up')}>
						Sign Up
					</Button>
				</OffCanvasBody>
			</OffCanvas>
		</>
	);
};

export default CommonHeaderChat;
