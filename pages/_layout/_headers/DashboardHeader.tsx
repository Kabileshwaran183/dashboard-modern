import React from 'react';
import Header, { HeaderLeft } from '../../../layout/Header/Header';
import CommonHeaderRight from './CommonHeaderRight';
import CommonHeaderChat from './CommonHeaderChat';

const DashboardHeader = () => {
	return (
		<Header>
			<HeaderLeft>
				<h1>Logo, Title</h1>
			</HeaderLeft>
			<CommonHeaderRight showTour={true} afterChildren={<CommonHeaderChat />} />
		</Header>
	);
};

export default DashboardHeader;
