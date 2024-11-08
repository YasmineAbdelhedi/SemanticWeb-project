import React, { useState, useEffect } from 'react';
import { fetchPayments, createPayment, deletePayment } from '../api/fueskiapi';

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [newPayment, setNewPayment] = useState({ amount: '', userId: '', date: '' });

  useEffect(() => {
    const loadPayments = async () => {
      const fetchedPayments = await fetchPayments();
      setPayments(fetchedPayments);
    };
    loadPayments();
  }, []);

  const handleCreatePayment = async () => {
    await createPayment(newPayment.amount, newPayment.userId, newPayment.date);
    setNewPayment({ amount: '', userId: '', date: '' });
    loadPayments();
  };

  const handleDeletePayment = async (paymentId) => {
    await deletePayment(paymentId);
    loadPayments();
  };

  return (
    <div>
      <h2>Payments</h2>
      <input
        type="text"
        placeholder="Amount"
        value={newPayment.amount}
        onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
      />
      <input
        type="text"
        placeholder="User ID"
        value={newPayment.userId}
        onChange={(e) => setNewPayment({ ...newPayment, userId: e.target.value })}
      />
      <input
        type="text"
        placeholder="Date"
        value={newPayment.date}
        onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })}
      />
      <button onClick={handleCreatePayment}>Create Payment</button>

      <ul>
        {payments.map((payment) => (
          <li key={payment.id}>
            {payment.amount} (User: {payment.user}, Date: {payment.date})
            <button onClick={() => handleDeletePayment(payment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentsPage;
