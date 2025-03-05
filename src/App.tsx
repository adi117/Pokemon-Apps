import "./App.css"
// import usePokemonList from "./hooks/usePokemonList"
// import usePokemonDetails from "./hooks/usePokemonDetail"
import PokemonDetail from "./components/PokemonDetail";

function App() {
  // Use the custom hook to fetch pokemon list
  // Example below
  // const list = usePokemonList();
  // const detail = usePokemonDetails("bulbasaur");

  return (
    <div className="w-80 bg-[#252A3E] h-[568px] overflow-y-scroll no-scrollbar">
      {/* Start the development here */}
      {/* Use react-router-dom Expected routes:  */}
      {/* 1. Home path: "/" */}
      {/* 1. Details path: "/details:" */}
      <PokemonDetail></PokemonDetail>

    </div>
  )
}

export default App
