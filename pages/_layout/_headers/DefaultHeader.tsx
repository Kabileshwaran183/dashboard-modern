import React from 'react';
import Header, { HeaderLeft } from '../../../layout/Header/Header';
import CommonHeaderRight from './CommonHeaderRight';
import CommonHeaderChat from './CommonHeaderChat';

const DefaultHeader = () => {
	return (
		<Header>
			<HeaderLeft>
				<h1>Logo, Company Name</h1>
			</HeaderLeft>
			<CommonHeaderRight afterChildren={<CommonHeaderChat />} showTour={false} />
		</Header>
	);
};

export default DefaultHeader;
