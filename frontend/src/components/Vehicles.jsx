import { useState, useEffect } from 'react';
import axios from 'axios';

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const token = localStorage.getItem('accessToken');
      const res = await axios.get('http://localhost:4000/api/vehicles', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVehicles(res.data);
    };
    fetchVehicles();
  }, []);

  return (
    <div>
      <h1>Liste des Véhicules</h1>
      <ul>
        {vehicles.map((vehicle) => (
          <li key={vehicle._id}>
            {vehicle.make} {vehicle.model} ({vehicle.year}) - ${vehicle.rentalPrice}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Vehicles;