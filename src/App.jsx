import './App.css';
import { fetchPlanets } from './api';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Population from './components/population/Population';
import Table from './components/table/Table';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [tableTuple, setTableTuple] = useState([
    { vehicleName: '', planet: [{planetName: '', poplulation: '' }], pilotNames: [] },
  ]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const NUM_ITEMS_ARRAY = 10;

  useEffect(async () => {
    await axios('https://swapi.py4e.com/api/vehicles/?page=1')
      .then(async (response) => {
        var currPage = 1;
        const pageCount = Math.ceil(
          Number(response.data.count) / NUM_ITEMS_ARRAY
        );
        while (pageCount != currPage - 1) {
          let currPageStr = currPage.toString();
          await axios(
            `https://swapi.py4e.com/api/vehicles/?page=${currPageStr}`
          )
            .then((response) => {
              setVehicles((vehicles) => [
                ...vehicles,
                ...response.data.results,
              ]);
            })
            .catch((error) => {
              console.error('Error fetching data inside 2nd axios: ', error);
              setError(error);
            });
          currPage++;
        }
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getPilots = async (pilotUrl,vehicle) => {
    await axios(pilotUrl)
      .then(async (response) => {
        setTableTuple((tableTuple) => [
          ...tableTuple,
          [{ vehicleName: vehicle, planet: [{planetName: '', poplulation: '' }], pilotNames: [response.data.name] }],
        ], console.log(response.data.name));
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const findMaxVehicles = () => (
    <li>
      {vehicles.map((vehicle) =>
        vehicle.pilots.map((pilotUrl) => getPilots(pilotUrl,vehicle.name))
      )}
    </li>
  );

  return (
    <div className='App'>
      this is a test
      {!loading && findMaxVehicles()}
    </div>
  );
}
export default App;
