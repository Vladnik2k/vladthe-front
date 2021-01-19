import React, {forwardRef, useImperativeHandle, useState} from "react";
import {login} from "../../services/auth.service";
import Modal from "react-bootstrap/cjs/Modal";
import Button from "react-bootstrap/cjs/Button";
import {Form} from "react-bootstrap";

export const Login = forwardRef((props: any, ref: any) => {
    const [show, setShow] = useState(false);
    const [isSubmitForm, setIsSubmitForm] = useState(false);

    const handleClose = () => setShow(false);
    useImperativeHandle(ref, () => ({
        handleShow() {
            setShow(true);
        }
    }));

    const submit = (event: any): void => {
        event.preventDefault();
        const form = event.target;
        const email: string = form[0].value;
        const password: string = form[1].value;

        login(email, password).then((res: any) => {
            setIsSubmitForm(true);
            if (res.success === false) {
                return;
            } else {
                props.handleLogin();
                localStorage.setItem('token', res.token);
                handleClose();
            }
        });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Вхід</Modal.Title>
            </Modal.Header>
            <Form onSubmit={submit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control placeholder="Введіть email"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control isInvalid={isSubmitForm} type="password" placeholder="Введіть пароль"/>
                        <Form.Control.Feedback tooltip type="invalid">Пароль або email неправильний</Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={handleClose}>Відміна</Button>
                    <Button variant="dark" type="submit">Увійти</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
});
