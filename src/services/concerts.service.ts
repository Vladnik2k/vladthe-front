import {API_URL} from "../constants";
import {ConcertModel} from "../models/concert.model";
import {ActorModel} from "../models/actor.model";

export const concertUrl = `${API_URL}concerts/`;

export const getConcerts = (): Promise<Array<ConcertModel>> => {
    return fetch(concertUrl).then(res => res.json());
};

export const getConcertById = (id: string): Promise<ConcertModel> => {
    return fetch(`${concertUrl}${id}`).then(res => res.json());
};

export const getActorsByConcertId = (id: string): Promise<Array<ActorModel>> => {
    return fetch(`${concertUrl}${id}/actors`).then(res => res.json());
};

export const getSchedulesByConcertId = (id: string): Promise<Array<any>> => {
    return fetch(`${concertUrl}${id}/schedules`).then(res => res.json());
};
