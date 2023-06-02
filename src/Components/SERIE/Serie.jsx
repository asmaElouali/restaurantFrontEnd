import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

function SerieManagement() {
    const [nom, setNom] = useState('');
    const [serieId, setSerieId] = useState(null);
    const [series, setSeries] = useState([]);

    useEffect(() => {
        fetchAllSeries();
    }, []);

    const fetchAllSeries = async () => {
        try {
            const response = await axios.get('http://localhost:8080/series');
            setSeries(response.data);
        } catch (error) {
            console.error('Error fetching series:', error);
        }
    };

    const handleNomChange = (e) => {
        setNom(e.target.value);
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/series', { nom });
            console.log('Serie created:', response.data);
            setNom('');
            fetchAllSeries();
        } catch (error) {
            console.error('Error creating serie:', error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8080/series/${serieId}`, { nom });
            console.log('Serie updated:', response.data);
        } catch (error) {
            console.error('Error updating serie:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/series/${serieId}`);
            console.log('Serie deleted');
        } catch (error) {
            console.error('Error deleting serie:', error);
        }
    };

    const fetchSerie = async () => {
        if (serieId) {
            try {
                const response = await axios.get(`http://localhost:8080/series/${serieId}`);
                setNom(response.data.nom);
            } catch (error) {
                console.error('Error fetching serie:', error);
            }
        }
    };

    return (
        <div>
            <h1>Serie Management</h1>

            {/* Serie Form */}
            <h2>Create Serie</h2>
            <form onSubmit={handleCreate}>
                <label>
                    Nom:
                    <input type="text" value={nom} onChange={handleNomChange} />
                </label>
                <button type="submit">Create</button>
            </form>

            {/* Serie Edit Form */}
            <h2>Edit Serie</h2>
            <form onSubmit={handleUpdate}>
                <label>
                    Serie ID:
                    <input
                        type="text"
                        value={serieId || ''}
                        onChange={(e) => setSerieId(e.target.value)}
                    />
                </label>
                <label>Nom:</label>
                    <input type="text" value={nom} onChange={handleNomChange} />
                
                <button type="submit">Update</button>
            </form>

            {/* Serie Delete Button */}
            <h2>Delete Serie</h2>
            <label>
                Serie ID:
                <input
                    type="text"
                    value={serieId || ''}
                    onChange={(e) => setSerieId(e.target.value)}
                />
            </label>
            <button onClick={handleDelete}>Delete</button>

            {/* Display all series */}
            <h2>All Series</h2>
            {series.map((serie) => (
                <div key={serie.id}>{serie.nom}</div>
            ))}
        </div>
    );
}

export default SerieManagement;