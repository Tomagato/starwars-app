import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function SingleVehicle(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableBody>
          <TableRow>
            <TableCell>
              Vehicle name with the largest sum is:{' '}
              {props.vehicleDetails.vehicleName}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Related home planet and respective population: [
              {props.vehicleDetails.planet.map(
                (planet) => planet.planetName + ', ' + planet.population
              )}
              ]
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Related pilot names:{' '}
              {props.vehicleDetails.pilotNames.map((pilotName) => pilotName)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
