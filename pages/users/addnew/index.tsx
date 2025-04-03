import React, { FC, useState } from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import Icon from '../../../components/icon/Icon';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { Pages } from '../../../menu';
import SubHeader, { SubHeaderLeft, SubheaderSeparator } from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../../components/bootstrap/Card';
import Wizard, { WizardItem } from '../../../components/Wizard';
import Input from '../../../components/bootstrap/forms/Input';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';

interface IValues {
	Name: string;
	Quantity: string;
	DateTime: string;
}

const validate = (values: IValues) => {
	const errors: Partial<IValues> = {};

	if (!values.Name) {
		errors.Name = 'Required';
	} else if (values.Name.length < 3) {
		errors.Name = 'Must be at least 3 characters';
	} else if (values.Name.length > 20) {
		errors.Name = 'Must be 20 characters or less';
	}

	if (!values.Quantity) {
		errors.Quantity = 'Required';
	} else if (!/^\d+$/.test(values.Quantity)) {
		errors.Quantity = 'Must be a number';
	}

	return errors;
};

const AddNew: NextPage = () => {
	const router = useRouter();

	const TABS = {
		MANUFACTURING: 'Manufacturing',
		WASTAGES: 'Wastage',
		OTHERS: 'Others',
	};
	const [activeTab, setActiveTab] = useState(TABS.MANUFACTURING);

	const formik = useFormik({
		initialValues: {
			Name: '',
			Quantity: '',
			DateTime: new Date().toLocaleString(),
		},
		validate,
		onSubmit: (values) => {
			const existingData = JSON.parse(localStorage.getItem('userData') || '[]');

// Ensure existingData is always an array
if (!Array.isArray(existingData)) {
    localStorage.setItem('userData', JSON.stringify([]));
}

// Ensure values are properly formatted
const newData = {
    id: existingData.length + 1,
    name: values.Name ? values.Name.trim() : '',  // ✅ Only trim if it's a string
    quantity: values.Quantity ? parseInt(values.Quantity, 10) : 0,  // ✅ Convert to number
    dateTime: values.DateTime,
    status: 'Pending',
    goodsUsedBy: activeTab,
};

localStorage.setItem('userData', JSON.stringify([...existingData, newData]));

// Store success message and redirect to users page
localStorage.setItem('alertMessage', 'New entry has been successfully added.');
router.push('/users');

		}
		,
	});

	return (
		<PageWrapper>
			<Head>
				<title>{Pages.editPages.subMenu.editWizard.text}</title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					<Button color='info' isLink icon='ArrowBack' onClick={() => router.back()}>
						Back to List
					</Button>
					<SubheaderSeparator />
					<span className='text-muted'>Add Goods Information</span>
				</SubHeaderLeft>
			</SubHeader>
			<Page>
				<div className='row h-100 pb-3'>
					<div className='col-lg-4 col-md-6'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='AccountCircle'>
									<CardTitle>Goods used by</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody isScrollable>
								<div className='row g-3'>
									{Object.values(TABS).map((tab) => (
										<div key={tab} className='col-12'>
											<Button
												icon='Contacts'
												color='info'
												className='w-100 p-3'
												isLight={tab !== activeTab}
												onClick={() => setActiveTab(tab)}>
												{tab}
											</Button>
										</div>
									))}
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-lg-8 col-md-6'>
						<Wizard
							isHeader
							stretch
							color='info'
							noValidate
							onSubmit={formik.handleSubmit} // Pass formik handleSubmit
							className='shadow-3d-info'>

							<WizardItem id='step1' title='Goods Details'>
								<Card>
									<CardBody>
										<div className='row g-4'>
											<div className='col-md-6'>
												<FormGroup id='Name' label='Goods Name' isFloating>
													<Input
														placeholder='Enter goods name'
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														value={formik.values.Name}
														isValid={formik.isValid}
														isTouched={formik.touched.Name}
														invalidFeedback={formik.errors.Name}
													/>
												</FormGroup>
											</div>
											<div className='col-md-6'>
												<FormGroup id='Quantity' label='How many goods?' isFloating>
													<Input
														type='number'
														placeholder='Enter quantity'
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														value={formik.values.Quantity}
														isValid={formik.isValid}
														isTouched={formik.touched.Quantity}
														invalidFeedback={formik.errors.Quantity}
													/>
												</FormGroup>
											</div>
										</div>
									</CardBody>
								</Card>
							</WizardItem>
							<WizardItem id='step2' title='Date & Time'>
								<Card>
									<CardBody>
										<div className='row g-4'>
											<div className='col-md-12'>
												<FormGroup id='DateTime' label='Date & Time' isFloating>
													<Input
														type='text'
														placeholder='Date & Time'
														value={formik.values.DateTime}
														readOnly
													/>
												</FormGroup>
											</div>
										</div>
									</CardBody>
								</Card>
							</WizardItem>
							<WizardItem id='step3' title='Preview'>
								<Card>
									<CardBody>
										<div className='row g-3'>
											<div className='col-9 offset-3'>
												<h4 className='mt-4'>Goods Information</h4>
											</div>
											<div className='col-3 text-end'>Goods Name:</div>
											<div className='col-9 fw-bold'>{formik.values.Name || '-'}</div>
											<div className='col-3 text-end'>Quantity:</div>
											<div className='col-9 fw-bold'>{formik.values.Quantity || '-'}</div>
											<div className='col-3 text-end'>Date & Time:</div>
											<div className='col-9 fw-bold'>{formik.values.DateTime || '-'}</div>
											<div className='col-3 text-end'>Goods Used By:</div>
											<div className='col-9 fw-bold'>{activeTab}</div>
										</div>
									</CardBody>
								</Card>
							</WizardItem>
						</Wizard>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale ?? 'en', ['common', 'menu'])),
	},
});

export default AddNew;
