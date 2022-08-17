export interface Movies {
    movies: Movie[];
}

export interface MovieID {
    movieId: number;
}

export interface Data {
    movie: Movie;
}

export interface Movie {
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
}

export interface SeatProps {
    seatNumber: number | null,
    seatPosition: string,
    numberOfSeats: number,
    isActive: boolean,
    isSelected: boolean,
    isReserved: boolean,
    totalCost: number
}

export interface Ticket {
    firstName: string;
    lastName: string;
    email: string;
    ticketType: string;
    active?: boolean;
    createdAt?: string;
    totalCost?: number;
    owner?: User;
    seat?: Seat;
}

export interface Seat {
    id: number;
    seatNumber: string;
    seatPosition: string;
    ticket: Ticket;
}

export interface User {
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

export enum TicketType {
    SINGLE = 'SINGLE',
    COUPLE = 'COUPLE',
    FAMILY = 'FAMILY'
}



export const primaryColor = '#0066FF'
export const secondaryColor = '#0844eb'

