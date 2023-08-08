import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Table, Pagination } from 'react-bootstrap';
import useDateFormatter from '../../../utils/useDateFormatter';
import useMoneyFormatter from '../../../utils/useMoneyFormatter';
import api from '../../../utils/api';

const TransactionLogModal = ({ show, setShow }) => {
	const dateFormatter = useDateFormatter();
	const moneyFormatter = useMoneyFormatter();

	const [transactionLogs, setTransactionLogs] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	const getResData = useCallback(() => {
		api.get(`transaction?page=${currentPage}`)
			.then(response => {
				setLastPage(response.data?.last_page);
				setTransactionLogs(response.data.data);
			})
			.catch(error => {
				console.error('Error fetching data:', error);
			});
	}, [currentPage]);

	useEffect(() => {
		if(show){
			getResData();
		}
	}, [getResData, show]);

	const handlePageChange = useCallback(pageNumber => {
		setCurrentPage(pageNumber);
	}, []);

	return (
		<Modal show={show} onHide={() => setShow(false)} size="xl">
			<Modal.Header closeButton>
				<Modal.Title>Transaction History</Modal.Title>
			</Modal.Header>
			<Modal.Body className='transaction-modal'>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Description</th>
							<th>Amount</th>
							<th>Previous Balance</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody>
						{transactionLogs.map(log => (
							<tr key={log.id}>
								<td>{log.description}</td>
								<td><span className={log?.action === "sub" ? "text-danger" : "text-success"}>{moneyFormatter(log?.amount)}</span></td>
								<td>{moneyFormatter(log.previous_balance)}</td>
								<td>{dateFormatter(log.created_at)}</td>
							</tr>
						))}
					</tbody>
				</Table>
				<div className='pagination-container'>
					<Pagination>
						{Array.from({ length: lastPage }).map((_, index) => (
							<Pagination.Item
								key={index}
								active={index + 1 === currentPage}
								onClick={() => handlePageChange(index + 1)}
							>
								{index + 1}
							</Pagination.Item>
						))}
					</Pagination>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default TransactionLogModal;
