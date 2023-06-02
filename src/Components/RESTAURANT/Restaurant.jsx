import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RestaurantForm = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [name, setName] = useState('');
  const [zone, setZone] = useState('');
  const [specialite, setSpecialite] = useState('');

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:8080/restaurants');
      setRestaurants(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleZoneChange = (event) => {
    setZone(event.target.value);
  };

  const handleSpecialiteChange = (event) => {
    setSpecialite(event.target.value);
  };

  const handleCreateRestaurant = async () => {
    try {
      const response = await axios.post('http://localhost:8080/restaurants', {
        name,
        zone,
        specialite,
      });
      setRestaurants([...restaurants, response.data]);
      setName('');
      setZone('');
      setSpecialite('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateRestaurant = async (id, updatedRestaurant) => {
    try {
      const response = await axios.put(`http://localhost:8080/restaurants/${id}`, updatedRestaurant);
      const updatedRestaurants = restaurants.map((restaurant) =>
        restaurant.id === id ? response.data : restaurant
      );
      setRestaurants(updatedRestaurants);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRestaurant = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/restaurants/${id}`);
      const updatedRestaurants = restaurants.filter(
        (restaurant) => restaurant.id !== id
      );
      setRestaurants(updatedRestaurants);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Restaurant Form</h2>
      <input type="text" value={name} onChange={handleNameChange} placeholder="Name" />
      <input type="text" value={zone} onChange={handleZoneChange} placeholder="Zone" />
      <input type="text" value={specialite} onChange={handleSpecialiteChange} placeholder="Specialite" />
      <button onClick={handleCreateRestaurant}>Add Restaurant</button>

      <h2>Restaurants</h2>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            {restaurant.nom} - {restaurant.zone} - {restaurant.specialite}
            <button onClick={() => handleDeleteRestaurant(restaurant.id)}>Delete</button>
            <button onClick={() => handleUpdateRestaurant(restaurant.id, { name: 'Updated Name' })}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantForm;