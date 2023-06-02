import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SpecialiteManagement() {
  const [nom, setNom] = useState('');
  const [specialiteId, setSpecialiteId] = useState(null);
  const [specialites, setSpecialites] = useState([]);

  useEffect(() => {
    fetchSpecialites();
  }, []);

  const handleNomChange = (e) => {
    setNom(e.target.value);
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/specialites', { nom });
      console.log('Specialite created:', response.data);
      setNom('');
      fetchSpecialites();
    } catch (error) {
      console.error('Error creating specialite:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8080/specialites/${specialiteId}`, { nom });
      console.log('Specialite updated:', response.data);
      fetchSpecialites();
    } catch (error) {
      console.error('Error updating specialite:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/specialites/${specialiteId}`);
      console.log('Specialite deleted');
      fetchSpecialites();
    } catch (error) {
      console.error('Error deleting specialite:', error);
    }
  };

  const fetchSpecialites = async () => {
    try {
      const response = await axios.get('http://localhost:8080/specialites');
      setSpecialites(response.data);
    } catch (error) {
      console.error('Error fetching specialites:', error);
    }
  };

  return (
    <div>
      <h1>Specialite Management</h1>

      {/* Specialite Form */}
      <h2>Create Specialite</h2>
      <form onSubmit={handleCreate}>
        <label>
          Nom:
          <input type="text" value={nom} onChange={handleNomChange} />
        </label>
        <button type="submit">Create</button>
      </form>

      {/* Specialite Edit Form */}
      <h2>Edit Specialite</h2>
      <form onSubmit={handleUpdate}>
        <label>
          Specialite ID:
          <input
            type="text"
            value={specialiteId || ''}
            onChange={(e) => setSpecialiteId(e.target.value)}
          />
        </label>
        <label>
          Nom:
          <input type="text" value={nom} onChange={handleNomChange} />
        </label>
        <button type="submit">Update</button>
      </form>

      {/* Specialite Delete Button */}
      <h2>Delete Specialite</h2>
      <label>
        Specialite ID:
        <input
          type="text"
          value={specialiteId || ''}
          onChange={(e) => setSpecialiteId(e.target.value)}
        />
      </label>
      <button onClick={handleDelete}>Delete</button>

      {/* List of Specialites */}
      <h2>List of Specialites</h2>
      <ul>
        {specialites.map((specialite) => (
          <li key={specialite.id}>{specialite.nom}</li>
        ))}
      </ul>
    </div>
  );
}

export default SpecialiteManagement;