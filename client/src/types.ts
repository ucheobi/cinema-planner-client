export type Movies = {
    movies: Movie[];
}

export type MovieID = {
    movieId: number;
}

export type Data = {
    movie: Movie;
}

export type Movie = {
    id: number;
    title: string;
    description: string;
    duration: string;
    genre: string;
    cost: number;
    url: string;
    date: string;
    availability: string;
    time: string;
    tickets: Ticket[];
}

export type Ticket = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    ticketType: string;
    active: boolean;
    createdAt: string;
    totalCost: number;
    owner: User;
    seat: Seat;
}

export type Seat = {
    id: number;
    seatNumber: string;
    seatPosition: string;
    ticket: Ticket;
}

export type User = {
    id: number;
    firstName: string;
    lastname: string;
    email: string;
    role: string;
    password: string;
    ticket: Ticket[];
}

export interface IHandler {
    setMember: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    children?: React.ReactNode;
    title?: string;
    text?: string;
}



export const primaryColor = '#0066FF'
export const secondaryColor = '#0844eb'

