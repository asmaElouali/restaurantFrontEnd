import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ZoneController = () => {
    const [villes, setVilles] = useState([]);
    const [selectedVilleId, setSelectedVilleId] = useState('');
    const [zones, setZones] = useState([]);
    const [zoneName, setZoneName] = useState('');
    const [editingZoneId, setEditingZoneId] = useState(null);
    const [updatedZoneName, setUpdatedZoneName] = useState('');

    useEffect(() => {
        // Fetch all villes
        getAllVilles();
        // Fetch all zones
        getAllZones();
    }, []);

    const getAllVilles = async () => {
        try {
            const response = await axios.get('http://localhost:8080/villes');
            setVilles(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getZonesByVilleId = async (villeId) => {
        try {
            const response = await axios.get(`http://localhost:8080/zones/by-ville/${villeId}`);
            setZones(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getAllZones = async () => {
        try {
            const response = await axios.get('http://localhost:8080/zones');
            setZones(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleVilleChange = (event) => {
        const selectedId = event.target.value;
        setSelectedVilleId(selectedId);
        if (selectedId) {
            const parsedId = parseInt(selectedId, 10);
            if (!isNaN(parsedId)) {
                getZonesByVilleId(parsedId);
            } else {
                console.error('Invalid villeId:', selectedId);
            }
        } else {
            setZones([]);
        }
    };

    const handleAddZone = async () => {
        if (selectedVilleId) {
            try {
                const response = await axios.post(`http://localhost:8080/zones/by-ville/${selectedVilleId}`, {
                    nom_Zone: zoneName,
                });
                setZones([...zones, response.data]);
                setZoneName('');
            } catch (error) {
                console.error(error);
            }
        } else {
            console.error('No selected villeId');
        }
    };

    const handleDeleteZone = async (zoneId) => {
        if (editingZoneId === zoneId) {
            cancelEdit();
        }
        try {
            await axios.delete(`http://localhost:8080/zones/${zoneId}`);
            setZones(zones.filter((zone) => zone.id_Zone !== zoneId));
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateZone = async (zoneId, updatedZone) => {
        try {
            const response = await axios.put(`http://localhost:8080/zones/${zoneId}`, updatedZone);
            // Mettez à jour la liste des zones avec la zone mise à jour
            setZones(zones.map((zone) => (zone.id_Zone === zoneId ? response.data : zone)));
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateZoneForm = (zoneId) => {
        const zone = zones.find((zone) => zone.id_Zone === zoneId);
        if (zone) {
            setEditingZoneId(zoneId);
            setUpdatedZoneName(zone.nom_Zone);
        }
    };

    const cancelEdit = () => {
        setEditingZoneId(null);
        setUpdatedZoneName('');
    };

    return (
        <div>
            <h2>Zone Controller</h2>
            <div>
                <label htmlFor="ville-select">Select Ville:</label>
                <select id="ville-select" value={selectedVilleId} onChange={handleVilleChange}>
                    <option value="">All Villes</option>
                    {villes.map((ville) => (
                        <option key={ville.id_Ville} value={ville.id_Ville}>
                            {ville.nom_Ville}
                        </option>
                    ))}
                </select>
            </div>
            {selectedVilleId && (
                <div>
                    <h3>Add Zone</h3>
                    <input
                        type="text"
                        placeholder="Zone Name"
                        value={zoneName}
                        onChange={(event) => setZoneName(event.target.value)}
                    />
                    <button onClick={handleAddZone}>Add</button>
                </div>
            )}
            {zones.length > 0 && (
                <div>
                    <h3>Zones</h3>
                    <ul>
                        {zones.map((zone) => (
                            <li key={zone.id_Zone}>
                                {zone.nom_Zone}
                                <button onClick={() => handleDeleteZone(zone.id_Zone)}>Delete</button>
                                <button onClick={() => handleUpdateZoneForm(zone.id_Zone)}>Edit</button>
                                {editingZoneId === zone.id_Zone && (
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="New Zone Name"
                                            value={updatedZoneName}
                                            onChange={(event) => setUpdatedZoneName(event.target.value)}
                                        />
                                        <button onClick={() => handleUpdateZone(zone.id_Zone, { nom_Zone: updatedZoneName })}>Save</button>
                                        <button onClick={() => cancelEdit()}>Cancel</button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ZoneController;