import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function BasicTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Vehicle</TableCell>
            <TableCell align="right">Planet</TableCell>
            <TableCell align="right">Population</TableCell>
            <TableCell align="right">Pilots</TableCell>
            <TableCell align="right">Sum Population</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.vehicleDetails.map((row) => (
            <TableRow
              key={row.vehicleName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.vehicleName}
              </TableCell>
              <TableCell align="right">{row.planet.map((obj, index)=> " " + obj.planetName)}</TableCell>
              <TableCell align="right">{row.planet.map(obj=> " " + obj.population)}</TableCell>
              <TableCell align="right">{row.pilotNames.map(pilot =>  " " + pilot)}</TableCell>
              <TableCell align="right">{row.sumPoplulation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}