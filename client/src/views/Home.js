import React, { useEffect, useState, useContext, createContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Loading from "../components/Loading.js";
import BeerGarden from "../components/BeerGarden.js";
import Favorites from "../views/Favorites.js";

    function Home() {
        const [beerGardens, setBeerGardens] = useState([]);
        const [loading, setLoading] = useState(true);
 // const { beerGardens } = useContext(BeerGardensContext)
    const myBeerGarden = async () => {
        try {
            const response = await fetch(`http://localhost:5000/beergardens/all`);
        const data = await response.json();
            setBeerGardens(data);
            setLoading(false);
        console.log(response);
        console.log(data);
        } catch(err) {
            console.log(err)
        }    
    }

    useEffect(() => {
        myBeerGarden();
    }, []);
        return (loading ? <Loading></Loading>:
            beerGardens.map((oneBeerGarden, index) => {
                return (
                    <BeerGarden key={index} beerGarden={oneBeerGarden} />
    
                )
            })
        )
}
export default Home;


// // use map function - takes each opject in an array and returns it

// create a beergarden component
// pass it from home component to beergarden component
// style it (material ui)
