// src/components/Layout.js

import React, { useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserDetails, logout } from '../store/actions/AuthActions';

const Layout = ({ children }) => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);
	const user = useSelector((state) => state.auth.user);

	useEffect(() => {
		if (!!token && !user) {
			dispatch(fetchUserDetails());
		}
	}, [dispatch, token, user])

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<>
			<Navbar bg="dark" variant="dark" expand="lg">
				<Container>
					<Navbar.Brand as={Link} to="/">
						Send Money App
					</Navbar.Brand>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							{user ? (
								<NavDropdown title={user.name} id="user-dropdown">
									<NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
								</NavDropdown>
							) : (
								<Nav.Link as={Link} to="/">
									Login
								</Nav.Link>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Container>{children}</Container>
		</>
	);
};

export default Layout;
