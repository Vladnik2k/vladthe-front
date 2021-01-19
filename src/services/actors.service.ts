import {API_URL} from "../constants";
import {ActorModel} from "../models/actor.model";
import {ConcertModel} from "../models/concert.model";

export const actorsUrl = `${API_URL}actors/`;

export const getActors = (): Promise<Array<ActorModel>> => {
    return fetch(actorsUrl).then(res => res.json());
};

export const getActorById = (id: string): Promise<ActorModel> => {
    return fetch(`${actorsUrl}${id}`).then(res => res.json());
};

export const getConcertsByActorId = (id: string): Promise<Array<ConcertModel>> => {
    return fetch(`${actorsUrl}${id}/concerts`).then(res => res.json());
};
