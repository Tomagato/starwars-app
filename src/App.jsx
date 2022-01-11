import './App.css';
import { fetchPlanets } from './api';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Population from './components/Population';

function App() {
  const [planets, setPlanets] = useState([]);
  const [people, setPeople] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const NUM_ITEMS_ARRAY = 10;


  useEffect(async () => {
    await axios('https://swapi.py4e.com/api/planets/?page=1')
      .then(async (response) => {
        var currPage = 1;
        const pageCount = Math.ceil(
          Number(response.data.count) / NUM_ITEMS_ARRAY
        );
        while (pageCount != currPage - 1) {
          let currPageStr = currPage.toString();
          console.log(currPageStr);
          await axios(`https://swapi.py4e.com/api/planets/?page=${currPageStr}`)
            .then((response) => {
              setPlanets((planets) => [...planets, ...response.data.results]);
            })
            .catch((error) => {
              console.error('Error fetching data inside 2nd axios: ', error);
              setError(error);
            });
          currPage++;
        }
        console.log(planets);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  useEffect(async() => {
    await axios('https://swapi.py4e.com/api/people/?page=1')
      .then(async (response) => {
        var currPage = 1;
        const pageCount = Math.ceil(
          Number(response.data.count) / NUM_ITEMS_ARRAY
        );
        while (pageCount != currPage - 1) {
          let currPageStr = currPage.toString();
          console.log(currPageStr);
          await axios(`https://swapi.py4e.com/api/people/?page=${currPageStr}`)
            .then((response) => {
              setPeople((people) => [...people, ...response.data.results]);
            })
            .catch((error) => {
              console.error('Error fetching data inside 2nd axios: ', error);
              setError(error);
            });
          currPage++;
        }
        console.log(people);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  useEffect(async () => {
    await axios('https://swapi.py4e.com/api/vehicles/?page=1')
      .then( async (response) => {
        var currPage = 1;
        const pageCount = Math.ceil(
          Number(response.data.count) / NUM_ITEMS_ARRAY
        );
        while (pageCount != currPage - 1) {
          let currPageStr = currPage.toString();
          console.log(currPageStr);
          await axios(`https://swapi.py4e.com/api/vehicles/?page=${currPageStr}`)
            .then((response) => {
              setVehicles((vehicles) => [...vehicles, ...response.data.results]);
            })
            .catch((error) => {
              console.error('Error fetching data inside 2nd axios: ', error);
              setError(error);
            });
          currPage++;
        }
        console.log(vehicles);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (<div className='App'>this is a test
  <Population/>
  </div>
            
  );

  
}

export default App;
