import React from 'react'
import React, { useEffect, useState, useContext, createContext } from 'react'

export default function Home() {
    return (
        <div>
            
        </div>
    )
}

 const { beergardens } = useContext(CompaniesContext)
    const searchProfile = async () => {
        try {
            const response = await fetch(`local`);
        const data = await response.json();
        setCompany(data);
        console.log(response);
        console.log(data);
        } catch(err) {
            console.log(err)
        }
        
    }