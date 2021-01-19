import React, {forwardRef, useImperativeHandle, useState} from "react";
import Modal from "react-bootstrap/cjs/Modal";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/cjs/Button";
import {createPayment} from "../../services/payment.service";
import {getSchedulesByConcertId} from "../../services/concerts.service";

export const Payment = forwardRef((props: any, ref: any) => {
    const [show, setShow] = useState(false);
    const [concertId, setConcertId] = useState('');
    const [schedules, setSchedules] = useState([]);

    const handleClose = () => setShow(false);
    useImperativeHandle(ref, () => ({
        handleShow(concertId: string) {
            setConcertId(concertId);

            getSchedulesByConcertId(concertId).then((res: any) => {
                setSchedules(
                    res
                        .sort((a: any, b: any) => a.startedAt > b.startedAt ? -1 : 1)
                        .filter((schedule: any) => new Date(schedule.startedAt) > new Date())
                        .slice(0, 6)
                        .map((schedule: any) => {
                            const date = new Date(schedule.startedAt);
                            schedule.startedAt = `${date.getMonth()}/${date.getDate()}, ${date.getHours()}:00`;
                            return schedule;
                        })
                );
            });

            setShow(true);
        }
    }));

    const submit = (event: any): void => {
        event.preventDefault();
        const form = event.target;
        const numberOfSites: string = form[0].value;
        // @ts-ignore
        const scheduleId: string = schedules[form[1].selectedIndex]._id;

        createPayment(concertId, scheduleId, numberOfSites).then((res: any) => {
            handleClose();
        });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Купити квиток</Modal.Title>
            </Modal.Header>
            <Form onSubmit={submit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Кількість місць</Form.Label>
                        <Form.Control placeholder="Введіть кількість місць"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Обрана дата</Form.Label>
                        <Form.Control as="select">{
                            schedules.map((schedule) => (<option key={(schedule as any)._id}>{ (schedule as any).startedAt }</option>))
                        }</Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={handleClose}>Відміна</Button>
                    <Button variant="dark" type="submit">Купити</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
});
