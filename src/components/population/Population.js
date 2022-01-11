import './population.css';

export default function Population(props) {
  
  const displayPlanets = ["Tatooine", "Alderaan", "Naboo", "Bespin", "Endor"];

  return (
    <>
      <h1> Chart</h1>

      <div class='chart-wrap'>
        <h2 class='title'>Bar Chart HTML </h2>

        <div class='grid'>
          {planets.map((planet) => {
            return <li key={planet}>{planet} </li>;
          })}
        </div>
      </div>
    </>
  );
}
