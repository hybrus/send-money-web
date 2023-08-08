import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import useMoneyFormatter from "../../../utils/useMoneyFormatter";

const AccountBalance = () => {
	const accountBalance = useSelector((state) => state.auth?.user?.account?.available_balance);
	const moneyFormatter = useMoneyFormatter();

	return (
		<Card className="shadow p-2">
			<Card.Body>
				<Card.Title>Account Balance</Card.Title>
				<Card.Text>{moneyFormatter(accountBalance || 0)}</Card.Text>
			</Card.Body>
		</Card>
	);
}

export default AccountBalance;