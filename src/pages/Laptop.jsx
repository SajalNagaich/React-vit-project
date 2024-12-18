import axios from 'axios'
import React, { useEffect } from 'react'

const Laptop = () => {

    useEffect(() => {
        async function fetchRegistredUser() {
          let { data } = await axios.get("http://localhost:8283/laptopController/getAllLaptop");
          console.log(data);
          
        }
        fetchRegistredUser();
      }, []);
    return (
        <div>Laptop</div>
    )
}

export default Laptop