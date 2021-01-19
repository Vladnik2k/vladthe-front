import React from "react";
import {ConcertShortInfo} from "./ConcertShortInfo";
import {ConcertModel} from "../../models/concert.model";
import {getConcerts} from "../../services/concerts.service";

export class Concerts extends React.Component {
    state = {
        concerts: [] as Array<ConcertModel>
    };

    componentDidMount(): void {
        getConcerts().then(result => {
            this.setState(() => ({concerts: result}));
        });
    }

    render() {
        return (
            <div className="page">
                <h2 className="text-center main-header">Список вистав</h2>
                <div className="card-short-info-container">{
                    this.state.concerts.map((concert) => (<ConcertShortInfo key={concert._id}>{ concert }</ConcertShortInfo>))
                }</div>
            </div>
        );
    }
}
