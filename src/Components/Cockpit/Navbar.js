import React from 'react';
import {Button, ButtonToolbar, Form, FormControl, Nav, Navbar, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';

/**
 * React component for the navbar
 * @param props properties
 * @returns {*} a navbar
 */
const nav = (props) =>
{
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
            <Navbar.Brand>Database Viewer</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Form onSubmit={props.searchClicked} inline>
                    <FormControl value={props.inputValue} onChange={props.searchChanged} type="text"
                                 placeholder="Search"
                                 className="mr-sm-2"/>
                    <Button onClick={props.searchClicked} variant="outline-info">Search</Button>
                    <ButtonToolbar>
                        <ToggleButtonGroup value={props.radioValue}
                                           onChange={props.radioChange}
                                           type="radio" name="options"
                                           defaultValue={1}>
                            <ToggleButton value={1}>All</ToggleButton>
                            <ToggleButton value={2}>Title</ToggleButton>
                            <ToggleButton value={3}>Brand</ToggleButton>
                            <ToggleButton value={4}>ePID</ToggleButton>
                        </ToggleButtonGroup>
                    </ButtonToolbar>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default nav;