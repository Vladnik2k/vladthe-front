import React from "react";
import {ActorModel} from "../../models/actor.model";
import {getActorById, getConcertsByActorId} from "../../services/actors.service";
import {ConcertModel} from "../../models/concert.model";
import {ConcertShortInfo} from "../concerts/ConcertShortInfo";

export class ActorInfo extends React.Component {
    state = {
        actor: {} as ActorModel,
        concerts: [] as Array<ConcertModel>
    };

    componentDidMount(): void {
        // @ts-ignore
        const actorId = this.props.match.params.id;
        getActorById(actorId).then(result => {
            this.setState(() => ({actor: result}))
        });

        getConcertsByActorId(actorId).then(result => {
            this.setState(() => ({concerts: result}))
        });
    }

    render() {
        return (
            <div className="page">
                <h2 className="text-center">{this.state.actor.fullName}</h2>
                <div className="info-wrapper">
                    <div className="info">
                        <div className="info-image"><img src={this.state.actor.imgUrl} alt=""/></div>
                        <div className="info-text">
                            <h4 className="text-center">Коротка інформація:</h4>
                            <div>{this.state.actor.biography}</div>
                        </div>
                    </div>
                    <div className="relatives">
                        <h2 className="text-center">Вистави</h2>
                        <div className="card-short-info-container-sm">{
                            this.state.concerts.map((concert) => (<ConcertShortInfo key={concert._id}>{ concert }</ConcertShortInfo>))
                        }</div>
                    </div>
                </div>
            </div>
        );
    }
}
