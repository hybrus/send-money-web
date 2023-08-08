import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import SendToUserForm from "./SendToUserForm";
import SendToBankForm from "./SendToBankForm";
import { useDispatch } from "react-redux";
import { fetchProviders } from "../../../store/actions/ResourceActions";


const ActionPanel = () => {

	const [sendToUser, setSendToUser] = useState(false);
	const [sendToBank, setSendToBank] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProviders())
	}, [dispatch])

	const handleUserTransfer = () => {
		setSendToUser(true)
		setSendToBank(false)
	};

	const handleBankTransfer = () => {
		setSendToUser(false)
		setSendToBank(true)
	};

	return (
		<>
			{!(sendToUser || sendToBank) &&
				<Card className="mt-4 shadow p-2">
					<Card.Body>
						<Card.Title>Action Panel</Card.Title>

						<Button variant="outline-primary" onClick={handleUserTransfer}>
							Send Money To User
						</Button>
						<Button variant="outline-success" className="ms-2" onClick={handleBankTransfer}>
							Send Money To Bank
						</Button>
					</Card.Body>
				</Card>
			}

			{sendToUser && <SendToUserForm setSelf={setSendToUser} />}
			{sendToBank && <SendToBankForm setSelf={setSendToBank} />}
		</>
	)
}


export default ActionPanel;