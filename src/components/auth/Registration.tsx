import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";
import Modal from "react-bootstrap/cjs/Modal";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/cjs/Button";
import {register} from "../../services/auth.service";

export const Registration = forwardRef((props: any, ref: any) => {
    const [show, setShow] = useState(false);

    const form: any = useRef();
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [nameIsValid, setNameIsValid] = useState(false);
    const [passwordIsValid, setPasswordIsValid] = useState(false);
    const [retryPasswordIsValid, setRetryPasswordIsValid] = useState(false);
    const [isSubmitForm, setIsSubmitForm] = useState(false);

    const handleClose = () => setShow(false);
    useImperativeHandle(ref, () => ({
        handleShow() {
            setShow(true);
        }
    }));

    const emailChange = ($event: any) => {
        const value = $event.target.value;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setEmailIsValid(emailRegex.test(String(value).toLowerCase()));
    };

    const nameChange = ($event: any) => {
        const value = $event.target.value;
        setNameIsValid(value.length > 0);
    };

    const passwordChange = ($event: any) => {
        const value = $event.target.value;
        const passwordNumber = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/; // at least one number, big and small letter, spec character and min 8 characters
        setPasswordIsValid(passwordNumber.test(String(value).toLowerCase()));
    };

    const retryPasswordChange = ($event: any) => {
        const value = $event.target.value;
        const password = $event.target.form[2].value;
        setRetryPasswordIsValid(password === value)
    };

    const submit = (event: any): void => {
        setIsSubmitForm(true);
        if (!emailIsValid || !nameIsValid || !passwordIsValid || !retryPasswordIsValid) {
            return;
        }

        event.preventDefault();
        const email: string = form.current[0].value;
        const name: string = form.current[1].value;
        const password: string = form.current[2].value;

        register(email, name, password).then((res: any) => {
            if (res.success === false) {
                return;
            } else {
                localStorage.setItem('token', res.token);
                handleClose();
            }
        });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Реєстрація</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form ref={form}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control isInvalid={!emailIsValid && isSubmitForm} onChange={emailChange} placeholder="Введіть email"/>
                        <Form.Control.Feedback tooltip type="invalid">Неправильний email</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Ім'я</Form.Label>
                        <Form.Control isInvalid={!nameIsValid && isSubmitForm} onChange={nameChange} type="text" placeholder="Введіть ім'я"/>
                        <Form.Control.Feedback tooltip type="invalid">Введіть ім'я</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control isInvalid={!passwordIsValid && isSubmitForm} onChange={passwordChange} placeholder="Введіть пароль"/>
                        <Form.Control.Feedback tooltip type="invalid">Пароль повинен мати хоча б одну велику, малу букву, цифру, спец символ та мінімум 8 символів</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Повторіть пароль</Form.Label>
                        <Form.Control isInvalid={!retryPasswordIsValid && isSubmitForm} onChange={retryPasswordChange} type="password" placeholder="Повторіть пароль"/>
                        <Form.Control.Feedback tooltip type="invalid">Пароль повинен співпадати</Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={handleClose}>Відміна</Button>
                <Button variant="dark" onClick={submit}>Зареєструвати</Button>
            </Modal.Footer>
        </Modal>
    );
});
