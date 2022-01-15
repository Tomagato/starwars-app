import './App.css';
import Table from './components/table/Table';
import SingleVehicle from './components/singleVehicle/SingleVehicle';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleTable, setVehicleTable] = useState([
    {
      vehicleName: '',
      planet: [{ planetName: '', poplulation: '' }],
      pilotNames: [],
      sumPoplulation: 0,
    },
  ]);


  const [fivePlanets, setfivePlanets] = useState([]);
  const [error, setError] = useState(null);

  const NUM_ITEMS_ARRAY = 10;

  const get_pilotes = async (url_arr) => {
    const promise_arr = url_arr.map((url) => {
      return axios(url);
    });
    return promise_arr;
  };

  useEffect(async () => {
    console.log(vehicles);
    await axios('https://swapi.py4e.com/api/vehicles/?page=1')
      .then(async (response) => {
        // calculation to count how many pages we need to iterate over 
        const pageCount = Math.ceil(
          Number(response.data.count) / NUM_ITEMS_ARRAY
        );

        // creating size of pageCount array to iterate over
        const page_index_arr = new Array(pageCount).fill(0).map((_, index) => {
          return index + 1;
        });

        //returns promise array
        const promise_arr = page_index_arr.map(async (n) => {
          return await axios(`https://swapi.py4e.com/api/vehicles/?page=${n}`);
        });

        const res_arr = await Promise.all(promise_arr);

        // getting data of vehicles from results and flattning
        const total_vehicles_arr = res_arr
          .map((response) => response.data.results)
          .flat();
        const total_vehicles_arr_filtered = total_vehicles_arr.filter(
          (obj) => obj.pilots.length > 0
        );

        const tupel_state_arr = [];

        //setting vehicle in tuple object
        total_vehicles_arr_filtered.forEach((obj) => {
          let tupel = {
            vehicleName: obj.name,
            planet: [],
            pilotNames: obj.pilots,
            sumPoplulation: 0,
          };
          tupel_state_arr.push(tupel);
        });

        // fetching results from currently api urls in the pilots array
        tupel_state_arr.forEach(async (tuple) => {
          const promise_pilots_arr = await get_pilotes(tuple.pilotNames);
          tuple.pilotNames = promise_pilots_arr;
        });

        //returning all pilot axios calls promises
        Promise.all(
          tupel_state_arr.map(async function (tuple) {
            return Promise.all(await get_pilotes(tuple.pilotNames));
          })
        ).then((pilots_arr) => {
          pilots_arr.forEach((array, index) => {
            array.map((obj) => {
              tupel_state_arr[index].pilotNames.push(obj.data.name);
              tupel_state_arr[index].planet.push({
                planetName: obj.data.homeworld,
              });
            });
          });
          tupel_state_arr.forEach((obj) => {
            obj.pilotNames = obj.pilotNames.filter((name) => {
              return typeof name === 'string';
            });
          });

          //returning all planets promises again
          const promise4all_planet = Promise.all(
            tupel_state_arr.map(async function (tuple) {
              return Promise.all(
                tuple.planet.map(async (p) => {
                  return await axios(p.planetName);
                })
              );
            })
          );

          //setting information from axios call in tuple array
          promise4all_planet.then((planets_array) => {
            planets_array.forEach((array, index) => {
              array.map((obj) => {
                tupel_state_arr[index].planet.push({
                  planetName: obj.data.name,
                  population:
                    obj.data.population == 'unknown' ? 0 : obj.data.population,
                });
              });
            });
            tupel_state_arr.forEach((obj) => {
              obj.planet = obj.planet.filter((p) => {
                return p.hasOwnProperty('population');
              });
            });
            tupel_state_arr.forEach((obj) => {
              obj.planet.map((p) => {
                obj.sumPoplulation += Number(p.population);
              });
            });

            // sort by max population
            tupel_state_arr.sort((a, b) => {
              return b.sumPoplulation - a.sumPoplulation;
            });

            setVehicleTable(tupel_state_arr);
          });
        });
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setError(error);
      });
  }, []);

  useEffect(async () => {
    const planetsArray = ['Tatooine', 'Alderaan', 'Naboo', 'Bespin', 'Endor'];
    await axios('https://swapi.py4e.com/api/planets/')
      .then(async (response) => {
        // calculation to count how many pages we need to iterate over 
        const pageCount = Math.ceil(
          Number(response.data.count) / NUM_ITEMS_ARRAY
        );

        // creating size of pageCount array to iterate over
        const page_index_arr = new Array(pageCount).fill(0).map((_, index) => {
          return index + 1;
        });

        //returns promise array
        const promise_arr = page_index_arr.map(async (n) => {
          return await axios(`https://swapi.py4e.com/api/vehicles/?page=${n}`);
        });

        const res_arr = await Promise.all(promise_arr);
        console.log(res_arr)
      })
  }, []);

  return (
    <div className='App'>
    <SingleVehicle vehicleDetails={vehicleTable[0]}/>
      {/* <Table prop={vehicleTable} /> */}
    </div>
  );
}
export default App;
