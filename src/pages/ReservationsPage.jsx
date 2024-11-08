import React, { useState, useEffect } from 'react';
import { fetchReservations, createReservation, deleteReservation } from '../api/fueskiapi';

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [newReservation, setNewReservation] = useState({ date: '', userId: '', installationId: '' });

  useEffect(() => {
    const loadReservations = async () => {
      const fetchedReservations = await fetchReservations();
      setReservations(fetchedReservations);
    };
    loadReservations();
  }, []);

  const handleCreateReservation = async () => {
    await createReservation(newReservation.date, newReservation.userId, newReservation.installationId);
    setNewReservation({ date: '', userId: '', installationId: '' });
    loadReservations();
  };

  const handleDeleteReservation = async (reservationId) => {
    await deleteReservation(reservationId);
    loadReservations();
  };

  return (
    <div>
      <h2>Reservations</h2>
      <input
        type="text"
        placeholder="Date"
        value={newReservation.date}
        onChange={(e) => setNewReservation({ ...newReservation, date: e.target.value })}
      />
      <input
        type="text"
        placeholder="User ID"
        value={newReservation.userId}
        onChange={(e) => setNewReservation({ ...newReservation, userId: e.target.value })}
      />
      <input
        type="text"
        placeholder="Installation ID"
        value={newReservation.installationId}
        onChange={(e) => setNewReservation({ ...newReservation, installationId: e.target.value })}
      />
      <button onClick={handleCreateReservation}>Create Reservation</button>

      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            {reservation.date} (User: {reservation.user}, Installation: {reservation.installation})
            <button onClick={() => handleDeleteReservation(reservation.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationsPage;
