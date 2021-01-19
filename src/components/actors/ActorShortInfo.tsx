import React from "react";
import {ActorModel} from "../../models/actor.model";
import {Link} from "react-router-dom";

export class ActorShortInfo extends React.Component {
    state = {
        actor: {} as ActorModel
    };
    props: any;

    constructor(props: any) {
        super(props);

        this.props = props;
    }

    componentDidMount(): void {
        this.setState(() => ({actor: this.props.children}));
    }

    render() {
        return (
            <div className="card-wrap">
                <Link className="card h-100 card-short-info cursor" to={`../actors/${this.state.actor._id}`}>
                    <img className="card-img-top" src={this.state.actor.imgUrl} alt=""/>
                    <div className="card-body">
                        <h5 className="card-title">{this.state.actor.fullName}</h5>
                    </div>
                </Link>
            </div>
        );
    }
}
