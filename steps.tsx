import React from 'react';
import { useTour } from '@reactour/tour';
import { createUseStyles } from 'react-jss';
import SusyDarkMode from './assets/img/wanna/susy/susy-dark-mode.png';
import useMounted from './hooks/useMounted';
import Button from './components/bootstrap/Button';
import Susy8 from './assets/img/wanna/susy/susy8.png';
// Styles for images in the tour
const useStyles = createUseStyles(
	{
		image: {
			maxHeight: '150px',
			objectFit: 'contain',
		},
	},
	{ link: true }
);

// Navigation Buttons for the Tour
const TourNavigation = () => {
	const { currentStep, setCurrentStep } = useTour();
	return (
		<div className='col-12 mt-3'>
			<div className='row'>
				<div className='col'>
					{!!currentStep && (
						<Button
							icon='ArrowBackIos'
							color='info'
							isLink
							onClick={() => setCurrentStep(currentStep - 1)}>
							Prev
						</Button>
					)}
				</div>
				<div className='col-auto'>
					<Button
						icon='ArrowForwardIos'
						color='info'
						isLight
						onClick={() => setCurrentStep(currentStep + 1)}>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
};

// Helper function to target elements
const getTargetName = (name: string): `[data-tour='${string}']` => {
	return `[data-tour='${name}']`;
};

// Dark Mode Step
const DarkModeTour = () => {
	const { mounted } = useMounted();
	const classes = useStyles();
	return (
		<div className='row'>
			<div className='col-md-5'>
				<img
					src={SusyDarkMode}
					className={mounted ? classes.image : undefined}
					width='100%'
					alt=''
				/>
			</div>
			<div className='col-md-7 d-flex align-items-center'>
				<div>
					<p className='lead'>Dark / Light Mode</p>
					<p>You can switch between dark and light mode.</p>
				</div>
			</div>
			<TourNavigation />
		</div>
	);
};
const FullscreenTour = () => {
	const { mounted } = useMounted();
	const classes = useStyles();
	return (
		<div className='row'>
			<div className='col-md-5'>
				<img
					src={SusyDarkMode}
					className={mounted ? classes.image : undefined}
					width='100%'
					alt=''
				/>
			</div>
			<div className='col-md-7 d-flex align-items-center'>
				<div>
					<p className='lead'>Fullscreen Mode</p>
					<p>Click here to toggle fullscreen mode for a better experience.</p>
				</div>
			</div>
			<TourNavigation />
		</div>
	);
};

// Users Section Step
const UsersTour = () => {
	const { mounted } = useMounted();
	const classes = useStyles();
	return (
		<div className='row'>
			<div className='col-md-4'>
				<img
					src={Susy8}
					className={mounted ? classes.image : undefined}
					width='100%'
					alt=''
				/>
			</div>
			<div className='col-md-8 d-flex align-items-center'>
				<div>
				<p className='lead'>Users Section</p>
				<p>Manage all users in this section.</p>
				</div>
			</div>
			<TourNavigation />
		</div>

	);
};


// Login Page Step
const LoginTour = () => {
	return (
		<div>
			<p className='lead'>Login Page</p>
			<p>Use your credentials to log in and access your dashboard.</p>
			<TourNavigation />
		</div>
	);
};

// Signup Page Step
const SignupTour = () => {
	return (
		<div>
			<p className='lead'>Signup Page</p>
			<p>Register a new account to start using the platform.</p>
			<TourNavigation />
		</div>
	);
};

// **Tour Steps**
const steps = [
	{
		selector: getTargetName('dark-mode'),
		content: () => <DarkModeTour />,
	},
	{
		selector:`[href="/users"]`,
		content: () => <UsersTour />,
		
	},
	{
		selector: getTargetName('fullscreen'),
		content: () => <FullscreenTour />,
	},
	{
		selector: `[href="/auth-pages/login"]`,
		content: () => <LoginTour />,
	},
	{
		selector: `[href="/auth-pages/sign-up"]`,
		content: () => <SignupTour />,
	},
];

export default steps;
