import React, { useEffect, useState, useContext, createContext } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Home() {
    const [beergarden, setBeergarden] = useState([])
 const { beergardens } = useContext(BeergardensContext)
    const myBeergarden = async () => {
        try {
            const response = await fetch(`http://localhost:5000/beergardens/all`);
        const data = await response.json();
        setBeergarden(data);
        console.log(response);
        console.log(data);
        } catch(err) {
            console.log(err)
        }
        
    }

    useEffect(() => {
        myBeergarden();
    }, []);
   return  />;
// use map function - takes each opject in an array and returns it
                    // if loading false show description if loading is true - loading
            })
        ) : (
            <h2>loading..</h2>
        )}
    </div>
        </div>
);
        }
export default Home;

