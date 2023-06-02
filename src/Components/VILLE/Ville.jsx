import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Ville.css';
import 'bootstrap/dist/css/bootstrap.css';

const Ville = () => {
    const [villes, setVilles] = useState([]);
    const [ville, setVille] = useState({ id_Ville: 0, nom_Ville: '' });
    const [villeId, setVilleId] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchVilles();
    }, []);

    const fetchVilles = async () => {
        try {
            const response = await axios.get('http://localhost:8080/villes');
            setVilles(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const addVille = async () => {
        try {
            const response = await axios.post('http://localhost:8080/villes', ville);
            setVille({ id_Ville: 0, nom_Ville: '' });
            fetchVilles();
        } catch (error) {
            console.error(error);
        }
    };

    const updateVille = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/villes/${villeId}`, ville);
            setVilleId('');
            setVille({ id_Ville: 0, nom_Ville: '' });
            fetchVilles();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteVille = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/villes/${id}`);
            fetchVilles();
        } catch (error) {
            console.error(error);
        }
    };

    const searchVille = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/villes/${searchQuery}`);
            setVilles([response.data]);
            setSearchQuery('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='ville-container'>
            <h2>Ajouter une ville</h2>
            <div className='row'>
            <div className='form-group'>
                
            <input
                className='form-control'
                type="text"
                placeholder="Nom de la ville"
                value={ville.nom_Ville}
                onChange={(e) => setVille({ ...ville, nom_Ville: e.target.value })}
            />
            <button  onClick={addVille}>Ajouter</button>
            </div>
            <h2>Modifier une ville</h2>
            <div className='form-group'>
            <input
                className='form-control'
                type="text"
                placeholder="ID de la ville"
                value={villeId}
                onChange={(e) => setVilleId(e.target.value)}
            />
            <input
                className='form-control'
                type="text"
                placeholder="Nouveau nom de la ville"
                value={ville.nom_Ville}
                onChange={(e) => setVille({ ...ville, nom_Ville: e.target.value })}
            />
            <button onClick={updateVille}>Modifier</button>
            </div>
            </div>
            <h2>Supprimer une ville</h2>
            <input
                className='form-control'
                type="text"
                placeholder="ID de la ville"
                value={villeId}
                onChange={(e) => setVilleId(e.target.value)}
            />
            <button  onClick={() => deleteVille(villeId)}>Supprimer</button>

            <h2>Rechercher une ville</h2>
            <input
                className='form-control'
                type="text"
                placeholder="ID ou nom de la ville"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={searchVille}>Rechercher</button>
            <h2>Liste des villes</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nom de la ville</th>
                    </tr>
                </thead>
                <tbody>
                    {villes.map((ville) => (
                        <tr key={ville.id_Ville}>
                            <td>{ville.id_Ville}</td>
                            <td>{ville.nom_Ville}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Ville;