import React, { useState, useEffect } from 'react';
import { fetchEquipments, createEquipment, deleteEquipment } from '../api/fueskiapi';

const EquipmentPage = () => {
  const [equipments, setEquipments] = useState([]);
  const [newEquipment, setNewEquipment] = useState({ name: '', type: '' });

  useEffect(() => {
    const loadEquipments = async () => {
      const fetchedEquipments = await fetchEquipments();
      setEquipments(fetchedEquipments);
    };
    loadEquipments();
  }, []);

  const handleCreateEquipment = async () => {
    await createEquipment(newEquipment.name, newEquipment.type);
    setNewEquipment({ name: '', type: '' });
    loadEquipments();
  };

  const handleDeleteEquipment = async (equipmentId) => {
    await deleteEquipment(equipmentId);
    loadEquipments();
  };

  return (
    <div>
      <h2>Equipment</h2>
      <input
        type="text"
        placeholder="Name"
        value={newEquipment.name}
        onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Type"
        value={newEquipment.type}
        onChange={(e) => setNewEquipment({ ...newEquipment, type: e.target.value })}
      />
      <button onClick={handleCreateEquipment}>Create Equipment</button>

      <ul>
        {equipments.map((equipment) => (
          <li key={equipment.id}>
            {equipment.name} ({equipment.type})
            <button onClick={() => handleDeleteEquipment(equipment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EquipmentPage;
