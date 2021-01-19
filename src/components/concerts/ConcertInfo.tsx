import React from "react";
import {getActorsByConcertId, getConcertById} from "../../services/concerts.service";
import {ConcertModel} from "../../models/concert.model";
import {ActorModel} from "../../models/actor.model";
import {ActorShortInfo} from "../actors/ActorShortInfo";
import {connect} from "react-redux";
import Button from "react-bootstrap/cjs/Button";
import {Payment} from "./Payment";

class ConcertInfo extends React.Component {
    state = {
        concert: {} as ConcertModel,
        actors: [] as Array<ActorModel>
    };
    paymentRef: any = React.createRef();

    componentDidMount(): void {
        // @ts-ignore
        const concertId = this.props.match.params.id;
        getConcertById(concertId).then(result => {
            this.setState(() => ({concert: result}));
        });

        getActorsByConcertId(concertId).then(result => {
            this.setState(() => ({actors: result}));
        });
    }

    buyTicket(concertId: string): void {
        this.paymentRef.current.handleShow(concertId);
    }

    render() {
        return (
            <div className="page">
                <Payment ref={this.paymentRef}/>
                <h2 className="text-center">{this.state.concert.title}</h2>
                <div className="info-wrapper">
                    <div className="info">
                        <div className="info-image"><img src={this.state.concert.imgUrl} alt=""/></div>
                        <div className="info-text">
                            <h4 className="text-center">Коротка інформація:</h4>
                            <div>{this.state.concert.description}</div>
                        </div>
                    </div>
                    <div className="relatives">
                        <h2 className="text-center">Актори</h2>
                        <div className="card-short-info-container-sm">{
                            this.state.actors.map((actor) => (<ActorShortInfo key={actor._id}>{ actor }</ActorShortInfo>))
                        }</div>
                    </div>
                    {
                        !(this.props as any).loginState ?
                            <></> :
                            <Button className="buy-button" variant="success" onClick={() => this.buyTicket(this.state.concert._id)}>Купити</Button>
                    }
                </div>
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
)(ConcertInfo);
