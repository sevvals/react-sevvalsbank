import React from 'react';
import {Navbar,Container,Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { UserContext } from './user-context';

function NavigationBar() {
    const ctx = React.useContext(UserContext);
    const [loggedIn, setLoggedIn] = ctx.loginState;
    return (
        <Navbar className="color-nav" variant="light" expand="lg">
            <Container>
                <Navbar.Brand href="/" className='text-bank'>SEVVALS BANK</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    <LinkContainer to="/createaccount">
                            <Nav.Link title="Create a New Account">Hesap Açmak İçin Tıklayın!</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/">
                            <Nav.Link title="Home Page">Ana Sayfa</Nav.Link>
                        </LinkContainer>
                        {!loggedIn && <LinkContainer to="login">
                            <Nav.Link title="Log In">Giriş</Nav.Link>
                        </LinkContainer>}
                        <LinkContainer to="deposit">
                            <Nav.Link title="Deposit Funds">Para Yatır</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="withdraw">
                            <Nav.Link title="Withdraw Funds">Havale</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="transaction-history">
                            <Nav.Link title="View your Transaction History">Hesap Hareketleri</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="alldata">
                            <Nav.Link title="See all User Data">Müşteri Bilgileri</Nav.Link>
                        </LinkContainer>
                        {loggedIn && <LinkContainer to="login">
                            <Nav.Link title="Log Out">Çıkış</Nav.Link>
                        </LinkContainer>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar> 
    );
}

export default NavigationBar;