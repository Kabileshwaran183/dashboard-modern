import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Brand from '../../../layout/Brand/Brand';
import Navigation, { NavigationLine } from '../../../layout/Navigation/Navigation';
import User from '../../../layout/User/User';
import { dashboardPagesMenu, demoPagesMenu } from '../../../menu';
import ThemeContext from '../../../context/themeContext';
import Icon from '../../../components/icon/Icon';
import Aside, { AsideBody, AsideFoot, AsideHead } from '../../../layout/Aside/Aside';

const DefaultAside = () => {
	const { asideStatus, setAsideStatus } = useContext(ThemeContext);

	const [doc, setDoc] = useState(
		(typeof window !== 'undefined' &&
			localStorage.getItem('facit_asideDocStatus') === 'true') ||
		false,
	);

	const { t } = useTranslation(['common', 'menu']);

	return (
		<Aside>
			<AsideHead>
				<Brand asideStatus={asideStatus} setAsideStatus={setAsideStatus} />
			</AsideHead>
			<AsideBody>
				<Navigation menu={dashboardPagesMenu} id='aside-dashboard' />
				<NavigationLine />

				{/* Always show Login & Sign-Up */}
				<Navigation menu={{
					login: demoPagesMenu.login,
					signUp: demoPagesMenu.signUp
				}} id="aside-auth-pages" />
				<NavigationLine />
			</AsideBody>

			<AsideFoot>
				{/* documentation */}
				<nav aria-label='aside-bottom-menu'>
					<div className='navigation'>
						<div
							role='presentation'
							className='navigation-item cursor-pointer'
							onClick={() => {
								localStorage.setItem('facit_asideDocStatus', String(!doc));
								setDoc(!doc);
							}}
							data-tour='documentation'>
							<span className='navigation-link navigation-link-pill'>
								<span className='navigation-link-info'>
									<Icon
										icon={doc ? 'ToggleOn' : 'ToggleOff'}
										color={doc ? 'success' : undefined}
										className='navigation-icon'
									/>
									<span className='navigation-text'>
										{t('menu:Documentation')}
									</span>
								</span>
								<span className='navigation-link-extra'>
									<Icon
										icon='Circle'
										className={classNames(
											'navigation-notification',
											'text-success',
											'animate__animated animate__heartBeat animate__infinite animate__slower',
										)}
									/>
								</span>
							</span>
						</div>
					</div>
				</nav>
				<User />
			</AsideFoot>
		</Aside>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		// @ts-ignore
		...(await serverSideTranslations(locale, ['common', 'menu'])),
	},
});

export default DefaultAside;
