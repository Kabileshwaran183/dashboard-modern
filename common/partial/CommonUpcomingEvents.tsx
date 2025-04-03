import React, { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { priceFormat } from '../../helpers/helpers';
import Card, { CardActions, CardBody, CardHeader, CardLabel, CardTitle } from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import Icon from '../../components/icon/Icon';
import Avatar from '../../components/Avatar';
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from '../../components/bootstrap/Dropdown';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../components/PaginationButtons';
import useSortableData from '../../hooks/useSortableData';
import useDarkMode from '../../hooks/useDarkMode';
import EVENT_STATUS from '../data/enumEventStatus';

interface ICommonUpcomingEventsProps {
    isFluid?: boolean;
}

const CommonUpcomingEvents: FC<ICommonUpcomingEventsProps> = ({ isFluid }) => {
    const router = useRouter();
    const { themeStatus, darkModeStatus } = useDarkMode();
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(PER_COUNT['5']);
    const { items, requestSort, getClassNamesFor } = useSortableData([]);
    const [tableData, setTableData] = useState<any[]>([]);

    useEffect(() => {
        let storedData = JSON.parse(localStorage.getItem('userData') || '[]');

        if (!Array.isArray(storedData)) {
            storedData = []; // Ensure storedData is always an array
        }

        setTableData(storedData);

        // Retrieve alert message from local storage
        const alertMessage = localStorage.getItem('alertMessage');
        if (alertMessage) {
            alert(alertMessage); // Display success message
            localStorage.removeItem('alertMessage'); // Clear message after showing
        }
    }, []);




    return (
        <Card stretch={isFluid}>
            <CardHeader borderSize={1}>
                <CardLabel icon='Alarm' iconColor='info'>
                    <CardTitle>Goods Table</CardTitle>
                </CardLabel>
                <CardActions>
                    <Button color='success' icon='Plus' onClick={() => router.push('/users/addnew')}>
                        Add New
                    </Button>
                </CardActions>
            </CardHeader>
            <CardBody className='table-responsive' isScrollable={isFluid}>
                <table className='table table-modern'>
                    <thead>
                        <tr>
                            <td style={{ width: 60 }} />
                            <th>Goods Name</th>
                            <th>How Many Items</th>
                            <th>Goods Used By</th>
                            <th>Date / Time of Reporting</th>
                            <th>Status</th>
                            <td />
                        </tr>
                    </thead>
                    <tbody>
                        {dataPagination(tableData, currentPage, perPage).map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <Button
                                        isOutline={!darkModeStatus}
                                        color='dark'
                                        isLight={darkModeStatus}
                                        className={classNames({ 'border-light': !darkModeStatus })}
                                        icon='Info'
                                        aria-label='Detailed information'
                                    />
                                </td>
                                <td>{item.goodsName ? item.goodsName : 'N/A'}</td>
                                <td>{item.itemCount ? item.itemCount : '0'}</td>
                                <td>{item.usedBy ? item.usedBy : 'Unknown'}</td>

                                <td>{item.dateTime ? dayjs(item.dateTime).format('MMM Do YYYY, h:mm a') : 'Not Reported'}</td>
                                <td>
                                    <Dropdown>
                                        <DropdownToggle hasIcon={false}>
                                            <Button isLink color={item.status?.color || 'secondary'} icon='Circle'>
                                                {item.status?.name || 'Pending'}
                                            </Button>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {Object.keys(EVENT_STATUS).map((key) => (
                                                <DropdownItem key={key}>
                                                    <div>
                                                        <Icon icon='Circle' color={EVENT_STATUS[key].color} />
                                                        {EVENT_STATUS[key].name}
                                                    </div>
                                                </DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </Dropdown>
                                </td>
                                <td>
                                    <Button
                                        isOutline={!darkModeStatus}
                                        color='dark'
                                        isLight={darkModeStatus}
                                        className={classNames('text-nowrap', { 'border-light': !darkModeStatus })}
                                        icon='Edit'
                                    >
                                        Edit
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardBody>
            <PaginationButtons
                data={tableData}
                label='items'
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
            />
        </Card>
    );
};

export default CommonUpcomingEvents;
