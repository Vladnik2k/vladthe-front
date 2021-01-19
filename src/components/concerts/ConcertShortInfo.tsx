import React from "react";
import {Link} from "react-router-dom";
import {ConcertModel} from "../../models/concert.model";

export class ConcertShortInfo extends React.Component {
    state = {
        concert: {} as ConcertModel
    };
    props: any;

    constructor(props: any) {
        super(props);

        this.props = props;
    }

    componentDidMount(): void {
        this.setState(() => ({concert: this.props.children}));
    }

    render() {
        return (
            <div className="card-wrap">
                <Link className="card h-100 card-short-info cursor" to={`../concerts/${this.state.concert._id}`}>
                    <img className="card-img-top" src={this.state.concert.imgUrl} alt=""/>
                    <div className="card-body">
                        <h5 className="card-title">{this.state.concert.title}</h5>
                    </div>
                </Link>
            </div>
        );
    }
}
