import React from 'react';
import { blankPage, dashboardPagesMenu, demoPagesMenu} from '../menu';
import DashboardHeader from '../pages/_layout/_headers/DashboardHeader';
import DefaultHeader from '../pages/_layout/_headers/DefaultHeader';

const headers = [
	
	{ path: demoPagesMenu.login.path, element: null },
	{ path: demoPagesMenu.signUp.path, element: null },
	{ path: blankPage.page404.path, element: null },
	{ path: dashboardPagesMenu.dashboard.path, element: <DashboardHeader /> },
	{
		path: `/*`,
		element: <DefaultHeader />,
	},
];

export default headers;
