import React from "react";
import styled from "styled-components";

export interface TableProps {
  seatNo: number | null;
  position: string;
  price: number | null;
  type: string;
}

export interface TableData {
  data: TableProps[];
}

const StyledTable = styled.table`
  border: none;
  border-collapse: collapse;
  width: 100%;
`;

const TableHeader = styled.thead`
  display: flex;
  border: none;
  width: 100%;
  justify-content: space-between;
`;

const TableHeaderRow = styled.tr`
  border: none;
  background-color: #c2c2c257;
`;

const TableHeaderCell = styled.th`
  border: none;
  padding: 5px;
  text-align: center;
  font-size: 6px;
`;

const TableBody = styled.tbody`
  
`;

const TableRow = styled.tr`
  display: flex;
  width: 100%;
`;

const TableItem = styled.td`
  font-size: 7px;
  padding: 3px;
  margin-left: 10px;
  width: 24%;
  text-align: center;
`;


const TableMarkup = ({ data }: TableData): JSX.Element => (  
  <StyledTable>
    <TableHeader>
        <TableHeaderRow>
            <TableHeaderCell>Seat No</TableHeaderCell>
        </TableHeaderRow>
        <TableHeaderRow>
            <TableHeaderCell>Position</TableHeaderCell>
        </TableHeaderRow>
        <TableHeaderRow>
            <TableHeaderCell>Type</TableHeaderCell>
        </TableHeaderRow>
        <TableHeaderRow>
            <TableHeaderCell>Price</TableHeaderCell>
        </TableHeaderRow>
    </TableHeader>

    <TableBody>
        {data.map(((item, index) => (
            <TableRow key={index}>
                <TableItem>{item.seatNo}</TableItem>
                <TableItem>{item.position}</TableItem>
                <TableItem>{item.type}</TableItem>
                <TableItem>{item.price}</TableItem>
            </TableRow>
        )))}  
    </TableBody>
  </StyledTable>
);


export const SeatDetailsTable = ({ data }: TableData) => (
    <TableMarkup data={data} />
);