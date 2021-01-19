import React from "react";
import {getPayments} from "../services/payment.service";
import {PaymentModel} from "../models/payment.model";
import {connect} from "react-redux";
import {getDetails} from "../services/auth.service";
import {UserModel} from "../models/user.model";

class Profile extends React.Component {
    state = {
        payments: [] as Array<PaymentModel>,
        userDetails: {} as UserModel
    };

    logout(): void {
        // @ts-ignore
        this.props.onChangeLogin(false);
        localStorage.removeItem('token');
    }

    componentDidMount(): void {
        getPayments().then(result => {
            this.setState(() => ({payments: result}));
            console.log(result);
        }, err => {
            this.logout()
        });

        getDetails().then(result => {
            this.setState(() => ({userDetails: result}));
        }, err => this.logout());
    }

    render() {
        return (
            <div className="page">
                <h2 className="text-center main-header">Профіль</h2>
                <div className="info-wrapper">
                    <div className="info">
                        <div>Ім'я: { this.state.userDetails.name }</div>
                        <div>Email: { this.state.userDetails.email }</div>
                    </div>
                </div>

                <h2 className="text-center main-header">Білети</h2>
                {
                    this.state.payments.length ?
                        <div className="card-short-info-container">{
                            this.state.payments.map((payment) => (
                                <div className="card-wrap card-wrap-width-max" key={payment._id}>
                                    <div className="card h-100 card-short-info cursor">
                                        Концерт: { payment.concertName }<br/>
                                        Дата бронювання: { payment.doneAt }<br/>
                                        Дата концерту: { payment.date }<br/>
                                        Кількість місць: { payment.numberOfSites }<br/>
                                        Сума: { payment.price } грн
                                    </div>
                                </div>
                            ))
                        }</div> :
                        <div className="text-center">
                            Немає даних
                        </div>
                }

            </div>
        );
    }
}
export default connect(
    state => ({
        loginState: state
    }), dispatch => ({
        onChangeLogin: (isLogin: boolean) => {
            dispatch({ type: "LOGIN", payload: isLogin });
        }
    })
)(Profile);
