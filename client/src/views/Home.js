import React, { useEffect, useState, useContext, createContext } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Loading from "../components/Loading.js";

    function Home() {
        const [beergarden, setBeergarden] = useState([]);
        const [loading, setLoading] = useState(true);
 // const { beergardens } = useContext(BeergardensContext)
    const myBeergarden = async () => {
        try {
            const response = await fetch(`http://localhost:5000/beergardens/all`);
        const data = await response.json();
            setBeergarden(data);
            setLoading(false);
        console.log(response);
        console.log(data);
        } catch(err) {
            console.log(err)
        }    
    }

    useEffect(() => {
        myBeergarden();
    }, []);
        return (loading ? <Loading></Loading>:
            beergarden.map((oneBeergarden, index) => {
                return (
                    <div key={oneBeergarden._id}>
                    <img src={oneBeergarden.picture}></img>
                        <p>{oneBeergarden.name }</p>
                        </div>
                )
            })
        )
}
export default Home;


// // use map function - takes each opject in an array and returns it

// create a beergarden component
// pass it from home component to beergarden component
// style it (material ui)
