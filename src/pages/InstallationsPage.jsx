import React, { useState, useEffect } from 'react';
import { fetchInstallations, searchInstallationsByName, searchInstallationsByLocation, createInstallation, updateInstallation, deleteInstallation } from '../api/fueskiapi';

const InstallationsPage = () => {
  const [installations, setInstallations] = useState([]);
  const [newInstallation, setNewInstallation] = useState({
    name: '',
    location: '',
    imageUrl: '',
  });
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [selectedInstallationId, setSelectedInstallationId] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  useEffect(() => {
    const loadInstallations = async () => {
      const fetchedInstallations = await fetchInstallations();
      setInstallations(fetchedInstallations);
    };

    loadInstallations();
  }, []);

  const handleCreateInstallation = async () => {
    await createInstallation(newInstallation.name, newInstallation.location, newInstallation.imageUrl);
    setNewInstallation({ name: '', location: '', imageUrl: '' });
    const updatedInstallations = await fetchInstallations();
    setInstallations(updatedInstallations);
  };

  const handleUpdateInstallation = async () => {
    if (selectedInstallationId) {
      await updateInstallation(selectedInstallationId, newInstallation.name, newInstallation.location, newInstallation.imageUrl);
      setNewInstallation({ name: '', location: '', imageUrl: '' });
      setIsUpdateMode(false);
      setSelectedInstallationId(null);
      const updatedInstallations = await fetchInstallations();
      setInstallations(updatedInstallations);
    }
  };

  const handleDeleteInstallation = async (installationId) => {
    await deleteInstallation(installationId);
    const updatedInstallations = await fetchInstallations();
    setInstallations(updatedInstallations);
  };

  const handleEditClick = (installation) => {
    setNewInstallation({
      name: installation.name,
      location: installation.location,
      imageUrl: installation.imageUrl,
    });
    setIsUpdateMode(true);
    setSelectedInstallationId(installation.id);
  };

  const handleSearchByName = async () => {
    const results = await searchInstallationsByName(searchName);
    setInstallations(results);
  };

  const handleSearchByLocation = async () => {
    const results = await searchInstallationsByLocation(searchLocation);
    setInstallations(results);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Installations</h1>

   

      {/* Create or Update Installation Form */}
      <div className="card mb-4 p-4 shadow-sm">
        <h2>{isUpdateMode ? 'Update Installation' : 'Create Installation'}</h2>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter installation name"
            value={newInstallation.name}
            onChange={(e) => setNewInstallation({ ...newInstallation, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter installation location"
            value={newInstallation.location}
            onChange={(e) => setNewInstallation({ ...newInstallation, location: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter image URL"
            value={newInstallation.imageUrl}
            onChange={(e) => setNewInstallation({ ...newInstallation, imageUrl: e.target.value })}
          />
        </div>
        <button
          className="btn btn-primary mt-3"
          onClick={isUpdateMode ? handleUpdateInstallation : handleCreateInstallation}
        >
          {isUpdateMode ? 'Update Installation' : 'Create Installation'}
        </button>
      </div>

   {/* Search Bar */}
   <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <button className="btn btn-secondary mt-2" onClick={handleSearchByName}>Search by Name</button>
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by location"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
          <button className="btn btn-secondary mt-2" onClick={handleSearchByLocation}>Search by Location</button>
        </div>
      </div>

      {/* Installations List */}
      <h2 className="mb-4">Existing Installations</h2>
      <div className="row">
        {installations.map((installation) => (
          <div key={installation.id} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              {installation.imageUrl && (
                <img src={installation.imageUrl} alt={installation.name} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
              )}
              <div className="card-body">
                <h5 className="card-title">{installation.name}</h5>
                <p className="card-text">{installation.location}</p>
                <button className="btn btn-warning btn-sm" onClick={() => handleEditClick(installation)}>
                  Update
                </button>
                <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDeleteInstallation(installation.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstallationsPage;
