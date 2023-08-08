import React, { useEffect, useState } from 'react';
import { ListGroup, Card, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactionLog } from '../../../store/actions/TransactionActions';
import TransactionLogModal from './TransactionLogModal';
import useMoneyFormatter from '../../../utils/useMoneyFormatter';
import useDateFormatter from '../../../utils/useDateFormatter';


const TransactionLogs = () => {
	const transaction = useSelector((state) => state.transactions);
	const accountBalance = useSelector((state) => state.auth?.user?.account?.available_balance);
	const dispatch = useDispatch();
	const [showMore, setShowMore] = useState(false);
	const moneyFormatter = useMoneyFormatter();
	const formatDate = useDateFormatter();

	useEffect(() => {
		if (!transaction.init) {
			dispatch(fetchTransactionLog());
		}
	}, [dispatch, accountBalance, transaction])

	const handleShowMore = () => {
		setShowMore(true)
	}

	return (
		<>
			<Card className='shadow p-2'>
				<Card.Body>
					<Card.Title>Transaction History</Card.Title>
					<ListGroup>
						{!!transaction?.logs && transaction?.logs.length > 0 ? transaction?.logs.map((log) =>
							<ListGroup.Item key={log?.id}>
								<p className='mb-0'>{log?.description}</p>
								<small className='text-secondary'>Amount: <span className={log?.action === "sub" ? "text-danger" : "text-success"}>{moneyFormatter(log?.amount)}</span> | Previous Balance: {moneyFormatter(log?.previous_balance)} | Date: {formatDate(log?.created_at)} </small>
							</ListGroup.Item>
						) : !transaction?.init ? <span><Spinner variant='primary' animation="border" size="sm" /> "Loading Transaction History ..." </span> : "No Transaction History . . ."}
					</ListGroup>
					{!!transaction?.logs && transaction?.logs.length > 9 ?
						<Button variant="secondary" onClick={handleShowMore} className='w-100'>
							Show More
						</Button>
						: ""}
				</Card.Body>
			</Card>

			<TransactionLogModal show={showMore} setShow={setShowMore} />
		</>
	)
};


export default TransactionLogs;