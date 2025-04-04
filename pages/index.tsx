import Head from 'next/head';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTour } from '@reactour/tour';
import React, { useContext, useEffect, useState } from 'react';

import ThemeContext from '../context/themeContext';
import useDarkMode from '../hooks/useDarkMode';

import SubHeader, {SubHeaderLeft,SubHeaderRight,} from '../layout/SubHeader/SubHeader';
import PageWrapper from '../layout/PageWrapper/PageWrapper';
import CommonAvatarTeam from '../components/subheader/CommonAvatarTeam';
import Page from '../layout/Page/Page';
import Button, { ButtonGroup } from '../components/bootstrap/Button';

import CommonDashboardAlert from '../common/partial/CommonDashboardAlert';
import CommonDashboardUserCard from '../common/partial/CommonDashboardUserCard';
import CommonDashboardMarketingTeam from '../common/partial/CommonDashboardMarketingTeam';
import CommonDashboardDesignTeam from '../common/partial/CommonDashboardDesignTeam';
import CommonDashboardIncome from '../common/partial/CommonDashboardIncome';
import CommonDashboardRecentActivities from '../common/partial/CommonDashboardRecentActivities';
import CommonDashboardUserIssue from '../common/partial/CommonDashboardUserIssue';
import CommonDashboardSalesByStore from '../common/partial/CommonDashboardSalesByStore';
import CommonDashboardWaitingAnswer from '../common/partial/CommonDashboardWaitingAnswer';
import CommonMyWallet from '../common/partial/CommonMyWallet';

const Index: NextPage = () => {
	type TTabs = 'Weekly' | 'Monthly' | 'Yearly';
	const TABS: { [key: string]: TTabs } = {
		WEEKLY: 'Weekly',
		MONTHLY: 'Monthly',
		YEARLY: 'Yearly',
	};
	const { mobileDesign } = useContext(ThemeContext);
	const { setIsOpen } = useTour();
	const [activeTab, setActiveTab] = useState(TABS.YEARLY);
	const { themeStatus } = useDarkMode();
	useEffect(() => {
		if (
			typeof window !== 'undefined' &&
			localStorage.getItem('tourModalStarted') !== 'shown' &&
			!mobileDesign
		) {
			setTimeout(() => {
				setIsOpen(true);
				localStorage.setItem('tourModalStarted', 'shown');
			}, 3000);
		}
		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<PageWrapper>
			<Head>
				<title>Dashboard Page</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
				<span className='h4 mb-0 fw-bold'>Overview</span>
					
				<ButtonGroup>
						{Object.keys(TABS).map((key) => (
							<Button
								key={key}
								color={activeTab === TABS[key] ? 'success' : themeStatus}
								onClick={() => setActiveTab(TABS[key])}>
								{TABS[key]}
							</Button>
						))}
					</ButtonGroup>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonAvatarTeam>
						<strong>Marketing</strong> Team
					</CommonAvatarTeam>
				</SubHeaderRight>
			</SubHeader>
			
			<Page container='fluid'>
				<div className='row'>
					<div className='col-12'>
						<CommonDashboardAlert />
					</div>

					<div className='col-xl-4'>
						<CommonDashboardUserCard />
					</div>
					<div className='col-xl-4'>
						<CommonDashboardMarketingTeam />
					</div>
					<div className='col-xl-4'>
						<CommonDashboardDesignTeam />
					</div>

					<div className='col-xxl-6'>
						<CommonDashboardIncome activeTab={activeTab} />
					</div>
					<div className='col-xxl-3'>
						<CommonDashboardRecentActivities />
					</div>
					<div className='col-xxl-3'>
						<CommonDashboardUserIssue />
					</div>

					<div className='col-xxl-8'>
						<CommonDashboardSalesByStore />
					</div>
					<div className='col-xxl-4 col-xl-6'>
						<CommonDashboardWaitingAnswer />
					</div>

					<div className='col-xxl-4 col-xl-6'>
						<CommonMyWallet />
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		// @ts-ignore
		...(await serverSideTranslations(locale, ['common', 'menu'])),
	},
});

export default Index;