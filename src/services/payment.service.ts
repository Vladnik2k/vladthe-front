import {API_URL} from "../constants";
import {PaymentModel} from "../models/payment.model";

export const paymentsUrl = `${API_URL}payments/`;

export const getPayments = (): Promise<Array<PaymentModel>> => {
    return fetch(paymentsUrl, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(res => res.json());
};

export const createPayment = (concertId: string, scheduleId: string, numberOfSites: any): Promise<any> => {
    return fetch(paymentsUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({ concertId: concertId, scheduleId: scheduleId, numberOfSites: numberOfSites })
    });
};

export const removePayment = (paymentId: string): Promise<any> => {
    return fetch(paymentsUrl + paymentId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
};
