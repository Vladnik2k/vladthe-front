import React from "react";
import {ActorModel} from "../../models/actor.model";
import {ActorShortInfo} from "./ActorShortInfo";
import {getActors} from "../../services/actors.service";

export class Actors extends React.Component {
    state = {
        actors: [] as Array<ActorModel>
    };

    componentDidMount(): void {
        getActors().then(result => {
            this.setState(() => ({actors: result}))
        });
    }

    render() {
        return (
            <div className="page">
                <h2 className="text-center">Список акторів</h2>
                <div className="card-short-info-container">{
                    this.state.actors.map((actor) => (<ActorShortInfo key={actor._id}>{ actor }</ActorShortInfo>))
                }</div>
            </div>
        );
    }
}
