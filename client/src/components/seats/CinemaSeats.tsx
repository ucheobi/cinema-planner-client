import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { useAppSelector } from '../../redux/hooks';
import { TicketType } from '../../types';
import { Button } from '../Button';
import { QUERY_SINGLE_MOVIE } from '../modal';
import { checkSeatCost, getTicketCost, SeatCost } from './checkSeatCost';
import { SeatDetailsTable, TableProps } from './SeatDetailsTable';

const Theatre = styled.div`
    display: flex;
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const CinemaLeftSeat = styled.div`
    display: flex;
`;

//Left Seating arrangements
const LeftSeatContainer = styled.div`
    transform: skew(-15deg);
    margin: 0 6px;
`;

const LeftSeatRow = styled.div`
    cursor: pointer;
    width: 35px;
    height: 50px;
    border-radius: 7px;
    background: linear-gradient(to top, #761818, #761818, #761818, #761818, #761818, #B54041, #F3686A);
    margin-bottom: 10px;
    transform: skew(20deg);
    margin-top: -32px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    
        
    &:active:before {
        content: '';
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 7px;
    }

    &:hover:before {
        content: '';
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 7px;
    }
    //&.active {}
`;

const LeftSeatContainerTwo = styled(LeftSeatContainer)`
    transform: skew(-13deg);
`;

const LeftSeatRowTwo = styled(LeftSeatRow)`
    transform: skew(18deg);
`;

const LeftSeatContainerThree = styled(LeftSeatContainer)`
    transform: skew(-12deg);
`;

const LeftSeatRowThree = styled(LeftSeatRow)`
    transform: skew(16deg);
`;

const LeftSeatContainerFour = styled(LeftSeatContainer)`
    transform: skew(-11deg);
`;

const LeftSeatRowFour = styled(LeftSeatRow)`
    transform: skew(15deg);
`;

const LeftSeatContainerFive = styled(LeftSeatContainer)`
    transform: skew(-10deg);
`;

const LeftSeatRowFive = styled(LeftSeatRow)`
    transform: skew(12deg);
`;

const LeftSeatContainerSix = styled(LeftSeatContainer)`
    transform: skew(-9deg);
`;

const LeftSeatRowSix = styled(LeftSeatRow)`
    transform: skew(10deg);
`;

const LeftSeatContainerSeven = styled(LeftSeatContainer)`
    transform: skew(-7deg);
`;

const LeftSeatRowSeven = styled(LeftSeatRow)`
    transform: skew(8deg);
`;

//Right Seating arrangement
const CinemaRightSeat = styled(CinemaLeftSeat)`
    margin-left: 70px;
`
const RightSeatContainer = styled(LeftSeatContainer)`
    transform: skew(7deg);
    margin: 0 6px;
`;

const RightSeatRow = styled(LeftSeatRow)`
    width: 35px;
    height: 50px;
    border-radius: 7px;
    background: linear-gradient(to top, #761818, #761818, #761818, #761818, #761818, #B54041, #F3686A);
    margin-bottom: 10px;
    transform: skew(-8deg);
    margin-top: -32px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
`;

const RightSeatContainerTwo = styled(RightSeatContainer)`
    transform: skew(9deg);
`;

const RightSeatRowTwo = styled(RightSeatRow)`
    transform: skew(-10deg);
`;

const RightSeatContainerThree = styled(RightSeatContainer)`
    transform: skew(10deg);
`;

const RightSeatRowThree = styled(RightSeatRow)`
    transform: skew(-12deg);
`;

const RightSeatContainerFour = styled(RightSeatContainer)`
    transform: skew(11deg);
`;

const RightSeatRowFour = styled(RightSeatRow)`
    transform: skew(-15deg);
`;

const RightSeatContainerFive = styled(RightSeatContainer)`
    transform: skew(12deg);
`;

const RightSeatRowFive = styled(RightSeatRow)`
    transform: skew(-16deg);
`;

const RightSeatContainerSix = styled(RightSeatContainer)`
    transform: skew(13deg);
`;

const RightSeatRowSix = styled(RightSeatRow)`
    transform: skew(-18deg);
`;

const RightSeatContainerSeven = styled(RightSeatContainer)`
    transform: skew(15deg);
`;

const RightSeatRowSeven = styled(RightSeatRow)`
    transform: skew(-20deg);
`;

const Rug = styled.div`
    display: flex;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50rem;
    height: 20rem;
    background: linear-gradient(to top, #1b08c7, #1b08c7, #1b08c7, #1b08c7, #1b08c7, #1b08c7, #1b08c7);
    border-radius: 7px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
`;

//Movie details and summary
const MovieSummary = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
`; 

const MovieDetails = styled.h4`
    font-size: 7px;
    margin-bottom: 5px;
`;

//Ticket details and summary
const TicketSummary = styled.div`
    width: 30%;
`;

const TicketCategory = styled.h4`
    font-size: 7px;
    margin-bottom: 5px;
`;

// Seat Details and Summary
const SeatDetailsContainer = styled.div` 
    position: absolute; 
    top: -230px;
    left: 12%;
    margin: 0 auto;
    width: 80%;
    display: flex;
    justify-content: space-between;
`;

const SeatNumber = styled.div`
  font-size: 0.7rem;
  font-weight: bold;
`;

const SeatSummary = styled.span`
    width: 30%;
`;

const SeatTitle = styled(SeatNumber)`
   font-size: 7px;
   margin-bottom: 5px;
`;

const TableDetails = styled.div`
    display: flex;
    margin: 0 auto;

`;

const TotalSeats = styled.div`
    font-size: 7px;
    margin: 5px;
    font-weight: bold;
`;

const ButtonHolder = styled.div`
    position: absolute;
    bottom: -110px;
    right: -90px;
    width: 30%;
    font-weight: bold;
    font-size: 5px;
`;

const NB = styled.div`
    font-style: italic;
    font-weight: bold;
    font-size: 5px;
    margin-top: 15px;
`;

export const CinemaSeats = () => {
    const [seats, setSeats] = React.useState<Array<number>>([]);
    const [totalSeatsSelected, setTotalSeatsSelected] = React.useState<number>(0);
    const [totalPrice, setTotalPrice] = React.useState<number>(0);
    const [isActive, setIsActive] = React.useState<boolean>(false);
    const [isSelected, setIsSelected] = React.useState<boolean>(false);
    const [isReserved, setIsReserved] = React.useState<boolean>(false);
    const [seatPositions, setSeatPositions] = React.useState<string[]>([]);
    const [maximumSeats, setMaximumSeats] = React.useState<number>(0);
    const [seatDetails, setSeatDetails] = React.useState<TableProps[]>(
       [{ seatNo: null, position: "", price: null, type: ""},]
    );

    const movieId = useAppSelector(state => state.modal.movieId);

    // const { } = client.readQuery(
    //     {
    //         query: QUERY_SINGLE_MOVIE,
    //         variables: { id: movieId }
    //     }
    // )

    //check if seat exist in seats array
    const checkSeat = (seatNumber: number): boolean => {
        return seats.includes(seatNumber);
    }

    //add seat to seats array and update totalSeatsSelected
    const addSeat = (seatNumber: number, seatPosition: string) => {
        if (checkSeat(seatNumber)) {
            setSeats(seats.filter(seat => seat !== seatNumber));
        } else {
            setSeats([...seats, seatNumber]);
            setTotalSeatsSelected(seats.length + 1);

            const ticketCost = getTicketCost(ticketType as TicketType);
            //const totalCost = checkSeatCost(seatNumber, totalSeatsSelected, ticketType as TicketType);
            const totalCost = ticketCost * (totalSeatsSelected + 1);
            setTotalPrice(totalCost);
            addSeatDetail({seatNo: seatNumber, position: seatPosition, price: ticketCost, type: ticketType});
        }
    }

    //add seat position to seatPositions array
    const addSeatPosition = (seatPosition: string) => {
        if (seatPositions.includes(seatPosition)) {
            setSeatPositions(seatPositions.filter(position => position !== seatPosition));
        } else {
            setSeatPositions([...seatPositions, seatPosition]);
        }
    }

    //add seat detail to seatDetails array
    const addSeatDetail = (seatDetail: TableProps) => {
        if (seatDetails.includes(seatDetail)) {
            setSeatDetails(seatDetails.filter(detail => detail !== seatDetail));
        } else {
            setSeatDetails([...seatDetails, seatDetail]);
        }
    }

    const { ticketType } = useAppSelector(state => state.ticket);

    const onSeatClick = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        let { id }  = ev.currentTarget;
        let seatPosition = id;
        let seatNumber = parseInt(id.split('-')[1]);

        setIsSelected(true);
        

        //check if seat exist in seats array & the type of ticket
        if (checkSeat(seatNumber) || checkTicketType(ticketType as TicketType)) {
            return;
        } else {
            setIsReserved(!isReserved);
            setIsActive(true);
            checkMaximumSeats(ticketType as TicketType);
            addSeat(seatNumber, seatPosition);
            addSeatPosition(seatPosition);      
        } 
    }

    //permit only one ticket type to be booked
    const checkTicketType = (ticketType: TicketType): boolean => {
        if (ticketType === TicketType.SINGLE && totalSeatsSelected === 1) {
            return true;
        } else if ((ticketType === TicketType.COUPLE) && (totalSeatsSelected === 2)) {
            return true;
        } else if (ticketType === TicketType.FAMILY && totalSeatsSelected === 5) {
            return true;
        } else {
            return false;
        }
    }

    //set maximum seats to be booked
    const checkMaximumSeats = (ticketType: TicketType): void => {
        if (ticketType === TicketType.SINGLE ) {
            setMaximumSeats(1);
        } else if (ticketType === TicketType.COUPLE) {
            setMaximumSeats(2);
        } else if (ticketType === TicketType.FAMILY) {
            setMaximumSeats(5);
        }
    }

  return (
    <Theatre>
        <SeatDetailsContainer>
            <MovieSummary> 
                <MovieDetails>Movie: </MovieDetails>
                <MovieDetails>Start Time: </MovieDetails>
                <MovieDetails>End Time: </MovieDetails>
                <MovieDetails>Date: </MovieDetails>
            </MovieSummary>
            <TicketSummary>
                <TicketCategory>TOTAL COST (euros):- </TicketCategory>
                <TicketCategory>Normal: { SeatCost.NORMAL_TICKET_COST } </TicketCategory>
                <TicketCategory>Family: { SeatCost.FAMILY_TICKET_COST } </TicketCategory>
                <TicketCategory>Couple: { SeatCost.COUPLE_TICKET_COST } </TicketCategory>
                <TicketCategory>VIP: { SeatCost.VIP_SEAT_COST } </TicketCategory>
            </TicketSummary>

            <SeatSummary>
                <SeatTitle>Available Seats: </SeatTitle>
                <SeatTitle>Selected Seats: </SeatTitle>
                <TableDetails>
                    <SeatDetailsTable data={seatDetails}/>
                </TableDetails>
                {isActive && <TotalSeats>Total Cost: {totalPrice} Euros</TotalSeats>}
                {isActive && <NB>NOTE: You can only book maximum of {maximumSeats} ticket(s) for {ticketType}</NB>}
            </SeatSummary>
            
        </SeatDetailsContainer>
        
        <Rug />
        <CinemaLeftSeat>
            <LeftSeatContainer>
                <LeftSeatRow  id="LR1-1"  onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRow id="LR1-2" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRow id="LR1-3" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRow id="LR1-4" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRow id="LR1-5" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRow id="LR1-6" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRow id="LR1-7" onClick={(ev) => onSeatClick(ev)} />
            </LeftSeatContainer> 

            <LeftSeatContainerTwo>
                <LeftSeatRowTwo id="LR2-8" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowTwo id="LR2-9" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowTwo id="LR2-10" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowTwo id="LR2-11" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowTwo id="LR2-12" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowTwo id="LR2-13" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowTwo id="LR2-14" onClick={(ev) => onSeatClick(ev)} />
            </LeftSeatContainerTwo>

            <LeftSeatContainerThree>
                <LeftSeatRowThree id="LR3-15" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowThree id="LR3-16" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowThree id="LR3-17" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowThree id="LR3-18" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowThree id="LR3-19" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowThree id="LR3-20" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowThree id="LR3-21" onClick={(ev) => onSeatClick(ev)} />
            </LeftSeatContainerThree>

            <LeftSeatContainerFour>
                <LeftSeatRowFour id="LR4-22" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowFour id="LR4-23" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowFour id="LR4-24" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowFour id="LR4-25" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowFour id="LR4-26" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowFour id="LR4-27" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowFour id="LR4-28" onClick={(ev) => onSeatClick(ev)} />
            </LeftSeatContainerFour>

            <LeftSeatContainerFive>
                <LeftSeatRowFive id="LR5-29" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowFive id="LR5-30" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowFive id="LR5-31" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowFive id="LR5-32" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowFive id="LR5-33" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowFive id="LR5-34" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowFive id="LR5-35" onClick={(ev) => onSeatClick(ev)} />
            </LeftSeatContainerFive>

            <LeftSeatContainerSix>
                <LeftSeatRowSix id="LR6-36" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowSix id="LR6-37" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowSix id="LR6-38" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowSix id="LR6-39" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowSix id="LR6-40" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowSix id="LR6-41" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowSix id="LR6-42" onClick={(ev) => onSeatClick(ev)} />
            </LeftSeatContainerSix>

            <LeftSeatContainerSeven>
                <LeftSeatRowSeven id="LR7-43" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowSeven id="LR7-44" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowSeven id="LR7-45" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowSeven id="LR7-46" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowSeven id="LR7-47" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowSeven id="LR7-48" onClick={(ev) => onSeatClick(ev)} />
                <LeftSeatRowSeven id="LR7-49" onClick={(ev) => onSeatClick(ev)} />
            </LeftSeatContainerSeven>

        </CinemaLeftSeat>
        
        <CinemaRightSeat>
            <RightSeatContainer>
                <RightSeatRow id="RR1-50" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRow id="RR1-51" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRow id="RR1-52" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRow id="RR1-53" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRow id="RR1-54" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRow id="RR1-55" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRow id="RR1-56" onClick={(ev) => onSeatClick(ev)} />
            </RightSeatContainer>

            <RightSeatContainerTwo>
                <RightSeatRowTwo id="RR2-57" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowTwo id="RR2-58" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowTwo id="RR2-59" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowTwo id="RR2-60" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowTwo id="RR2-61" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowTwo id="RR2-62" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowTwo id="RR2-63" onClick={(ev) => onSeatClick(ev)} />
            </RightSeatContainerTwo>

            <RightSeatContainerThree>
                <RightSeatRowThree id="RR3-64" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowThree id="RR3-65" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowThree id="RR3-66" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowThree id="RR3-67" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowThree id="RR3-68" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowThree id="RR3-69" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowThree id="RR3-70" onClick={(ev) => onSeatClick(ev)} />
            </RightSeatContainerThree>

            <RightSeatContainerFour>
                <RightSeatRowFour id="RR4-71" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowFour id="RR4-72" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowFour id="RR4-73" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowFour id="RR4-74" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowFour id="RR4-75" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowFour id="RR4-76" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowFour id="RR4-77" onClick={(ev) => onSeatClick(ev)} />
            </RightSeatContainerFour>

            <RightSeatContainerFive>
                <RightSeatRowFive id="RR5-78" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowFive id="RR5-79" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowFive id="RR5-80" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowFive id="RR5-81" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowFive id="RR5-82" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowFive id="RR5-83" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowFive id="RR5-84" onClick={(ev) => onSeatClick(ev)} />
            </RightSeatContainerFive>

            <RightSeatContainerSix>
                <RightSeatRowSix id="RR6-85" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowSix id="RR6-86" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowSix id="RR6-87" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowSix id="RR6-88" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowSix id="RR6-89" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowSix id="RR6-90" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowSix id="RR6-91" onClick={(ev) => onSeatClick(ev)} />
            </RightSeatContainerSix>

            <RightSeatContainerSeven>
                <RightSeatRowSeven id="RR7-92" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowSeven id="RR7-93" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowSeven id="RR7-94" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowSeven id="RR7-95" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowSeven id="RR7-96" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowSeven id="RR7-97" onClick={(ev) => onSeatClick(ev)} />
                <RightSeatRowSeven id="RR7-98" onClick={(ev) => onSeatClick(ev)} />
            </RightSeatContainerSeven>
        </CinemaRightSeat>
    
        {isActive && 
            <ButtonHolder>
                <Link to="/movie/ticket/booking-summary">
                    <Button type='button' color='success'>Next</Button>
                </Link>    
            </ButtonHolder>
        }
        
    </Theatre>
  )
}
