import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useDarkMode from '../../hooks/useDarkMode';
import { dashboardPagesMenu, demoPagesMenu } from '../../menu';
import Page from '../../layout/Page/Page';
import CommonUpcomingEvents from '../../common/partial/CommonUpcomingEvents';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import { useRouter } from 'next/router';
import Icon from '../../components/icon/Icon';
import Alert, { AlertHeading } from '../../components/bootstrap/Alert';
const Index: NextPage = () => {
    const [alertMessage, setAlertMessage] = useState<string | null>(null);

    useEffect(() => {
        const message = localStorage.getItem('alertMessage');
        if (message) {
            setAlertMessage(message);
            localStorage.removeItem('alertMessage'); // Remove after displaying

            // Hide alert after 4 seconds
            setTimeout(() => {
                setAlertMessage(null);
            }, 4000);
        }
    }, []);
    const router = useRouter();
    return (
        
        <PageWrapper>
            
            <Head>
                <title>{dashboardPagesMenu.users.text}</title>
            </Head>
            <Page container='fluid'>
            {alertMessage && (
                <Alert
                    icon='CheckCircle'
                    color='success'
                    isDismissible
                    className='shadow-3d-success'
                    onClose={() => setAlertMessage(null)}>
                    <AlertHeading tag='h4'>Success!</AlertHeading>
                    {alertMessage}
                </Alert>
            )}
                <CommonUpcomingEvents isFluid />
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
