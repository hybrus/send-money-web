import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TransactionLogs from './components/TransactionLogs';
import AccountBalance from './components/AccountBalancePanel';
import ActionPanel from './components/ActionPanel';

const DashboardPage = () => {

	return (
		<Container className='my-4'>
			<h1>Dashboard</h1>
			<Row>
				<Col md={4}>
					<AccountBalance />
					<ActionPanel />
				</Col>
				<Col md={8}>
					<TransactionLogs />
				</Col>
			</Row>
		</Container>

	);
};

export default DashboardPage;
