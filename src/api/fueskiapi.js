// src/api/fusekiApi.js
import axios from 'axios';

const endpoint = 'http://localhost:3030/dataset-websemantique';
const PREFIX = `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX ex: <http://sportify.org/ontology#>
`;
// Utility function to handle requestsy
const runQuery = async (query) => {
  const encodedQuery = encodeURIComponent(query);
  const response = await axios.get(`${endpoint}/query?query=${encodedQuery}&output=json`);
  return response.data.results.bindings;
};


// USERS
export const fetchUsers = async () => {
    const query = `
      ${PREFIX}
      SELECT ?user ?name ?email ?imageUrl
      WHERE {
        ?user rdf:type ex:Utilisateur ;
              ex:name ?name ;
              ex:email ?email ;
              ex:imageUrl ?imageUrl .
      }
    `;
  
    try {
      const response = await axios.get(
        `${endpoint}/query?query=${encodeURIComponent(query)}&output=json`,
        {
          headers: {
            'Accept': 'application/sparql-results+json',
          },
        }
      );
      const results = response.data.results.bindings;
      return results.map(result => ({
        id: result.user.value,
        name: result.name.value,
        email: result.email.value,
        imageUrl: result.imageUrl ? result.imageUrl.value : null,
      }));
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
};


export const createUser = async (name, email, imageUrl) => {
    const baseUri = 'http://sportify.org/resource/';
    const userId = `newUser${Math.floor(Math.random() * 1000)}`;
    const userUri = baseUri + userId;

    const query = `
      ${PREFIX}
      INSERT DATA {
        <${userUri}> a ex:Utilisateur ;
                      ex:name "${name}" ;
                      ex:email "${email}" ;
                      ex:imageUrl "${imageUrl}" .
      }
    `;
    await axios.post(
      `${endpoint}/update`, 
      `update=${encodeURIComponent(query)}`, 
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
};


  

export const updateUser = async (userData) => {
  const { id, name, email, imageUrl } = userData; // Destructure user data for clarity

  const updateQuery = `
    PREFIX ex: <http://example.com/ns#>

    DELETE {
      ?user ex:name ?oldName ;
            ex:email ?oldEmail ;
            ex:imageUrl ?oldImageUrl .
    }
    INSERT {
      ?user ex:name "${name}" ;
            ex:email "${email}" ;
            ex:imageUrl "${imageUrl}" .
    }
    WHERE {
      ?user a ex:User ;
            ex:userId "${id}" ;  # Use the actual user ID
            ex:name ?oldName ;
            ex:email ?oldEmail ;
            ex:imageUrl ?oldImageUrl .
    }
  `;

  try {
    const response = await axios.post(
      'http://localhost:3030/dataset-websemantique/update', 
      `update=${encodeURIComponent(updateQuery)}`, 
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    return response.data;
  } catch (error) {
    console.error('Error in updateUser SPARQL update:', error);
    throw error;
  }
};

  
  
  export const deleteUser = async (userId) => {
    const query = `
      ${PREFIX}
      DELETE WHERE {
        <${userId}> a ex:Utilisateur ;
                    ex:name ?name ;
                    ex:email ?email ;
                    ex:imageUrl ?imageUrl . 
      }
    `;
  
    try {
      const response = await axios.post(
        `${endpoint}/update`, 
        `update=${encodeURIComponent(query)}`, 
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      console.log('User deleted successfully:', response.data);
      return response.data; // Ensure you return the data indicating success
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error; // Propagate error for proper error handling in the UI
    }
  };
  
  
  

// INSTALLATIONS

export const fetchInstallations = async () => {
    const query = `
      ${PREFIX}
      SELECT ?installation ?name ?location ?imageUrlInstallation
      WHERE {
        ?installation a ex:Installation ;
                      ex:name ?name ;
                      ex:location ?location ;
                      ex:imageUrlInstallation ?imageUrlInstallation . 
      }
    `;
    const results = await runQuery(query);
    return results.map(result => ({
      id: result.installation.value,
      name: result.name.value,
      location: result.location.value,
      imageUrl: result.imageUrlInstallation ? result.imageUrlInstallation.value : null,  // Handle imageUrl
    }));
  };
  

// Search Installations by name
export const searchInstallationsByName = async (searchTerm) => {
    const query = `
      ${PREFIX}
      SELECT ?installation ?name ?location ?imageUrlInstallation
      WHERE {
        ?installation a ex:Installation ;
                      ex:name ?name ;
                      ex:location ?location ;
                      ex:imageUrlInstallation ?imageUrlInstallation .
        FILTER(CONTAINS(LCASE(?name), LCASE("${searchTerm}")))
      }
    `;
    const results = await runQuery(query);
    return results.map(result => ({
      id: result.installation.value,
      name: result.name.value,
      location: result.location.value,
      imageUrl: result.imageUrlInstallation ? result.imageUrlInstallation.value : null,
    }));
  };
  
  // Search Installations by location
  export const searchInstallationsByLocation = async (searchTerm) => {
    const query = `
      ${PREFIX}
      SELECT ?installation ?name ?location ?imageUrlInstallation
      WHERE {
        ?installation a ex:Installation ;
                      ex:name ?name ;
                      ex:location ?location ;
                      ex:imageUrlInstallation ?imageUrlInstallation .
        FILTER(CONTAINS(LCASE(?location), LCASE("${searchTerm}")))
      }
    `;
    const results = await runQuery(query);
    return results.map(result => ({
      id: result.installation.value,
      name: result.name.value,
      location: result.location.value,
      imageUrl: result.imageUrlInstallation ? result.imageUrlInstallation.value : null,
    }));
  };
  

export const createInstallation = async (name, location, imageUrl) => {
    const baseUri = 'http://sportify.org/resource/';
    const installationId = `newInstallation${Math.floor(Math.random() * 1000)}`;
    const installationUri = baseUri + installationId;
  
    const query = `
      ${PREFIX}
      INSERT DATA {
        <${installationUri}> a ex:Installation ;
                             ex:name "${name}" ;
                             ex:location "${location}" ;
                             ex:imageUrlInstallation "${imageUrl}" . 
      }
    `;
    
    await axios.post(
      `${endpoint}/update`, 
      `update=${encodeURIComponent(query)}`, 
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
};

  
  

export const updateInstallation = async (installationId, name, location, imageUrl) => {
    const query = `
      ${PREFIX}
      DELETE {
        <${installationId}> ex:name ?oldName ;
                           ex:location ?oldLocation ;
                           ex:imageUrlInstallation ?oldImageUrl . 
      }
      INSERT {
        <${installationId}> ex:name "${name}" ;
                           ex:location "${location}" ;
                           ex:imageUrlInstallation "${imageUrl}" . 
      }
      WHERE {
        <${installationId}> ex:name ?oldName ;
                           ex:location ?oldLocation ;
                           ex:imageUrlInstallation ?oldImageUrl . 
      }
    `;
  
    try {
      const response = await axios.post(
        `${endpoint}/update`,
        `update=${encodeURIComponent(query)}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      console.log('Installation updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating installation:', error);
    }
};

  
  export const deleteInstallation = async (installationId) => {
    const query = `
      ${PREFIX}
      DELETE WHERE {
        <${installationId}> a ex:Installation ;
                            ex:name ?name ;
                            ex:location ?location .
      }
    `;
  
    try {
      const response = await axios.post(
        `${endpoint}/update`,
        `update=${encodeURIComponent(query)}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      console.log('Installation deleted successfully:', response.data);  // Debug logging
    } catch (error) {
      console.error('Error deleting installation:', error);  // Debug logging
    }
  };
  
  
  

// RESERVATIONS
export const fetchReservations = async () => {
  const query = `
    ${PREFIX}
    SELECT ?reservation ?date ?user ?installation
    WHERE {
      ?reservation a ex:Reservation ;
                   ex:date ?date ;
                   ex:user ?user ;
                   ex:installation ?installation .
    }
  `;
  const results = await runQuery(query);
  return results.map(result => ({
    id: result.reservation.value,
    date: result.date.value,
    user: result.user.value,
    installation: result.installation.value,
  }));
};

export const createReservation = async (date, userId, installationId) => {
  const query = `
    ${PREFIX}
    INSERT DATA {
      _:reservation a ex:Reservation ;
                    ex:date "${date}" ;
                    ex:user <${userId}> ;
                    ex:installation <${installationId}> .
    }
  `;
  await axios.post(`${endpoint}/update?update=${encodeURIComponent(query)}`);
};

export const deleteReservation = async (reservationId) => {
  const query = `
    ${PREFIX}
    DELETE WHERE {
      <${reservationId}> a ex:Reservation ;
                         ex:date ?date ;
                         ex:user ?user ;
                         ex:installation ?installation .
    }
  `;
  await axios.post(`${endpoint}/update?update=${encodeURIComponent(query)}`);
};

// PAYMENTS
export const fetchPayments = async () => {
  const query = `
    ${PREFIX}
    SELECT ?payment ?amount ?user ?date
    WHERE {
      ?payment a ex:Payment ;
               ex:amount ?amount ;
               ex:user ?user ;
               ex:date ?date .
    }
  `;
  const results = await runQuery(query);
  return results.map(result => ({
    id: result.payment.value,
    amount: result.amount.value,
    user: result.user.value,
    date: result.date.value,
  }));
};

export const createPayment = async (amount, userId, date) => {
  const query = `
    ${PREFIX}
    INSERT DATA {
      _:payment a ex:Payment ;
                ex:amount "${amount}" ;
                ex:user <${userId}> ;
                ex:date "${date}" .
    }
  `;
  await axios.post(`${endpoint}/update?update=${encodeURIComponent(query)}`);
};

export const deletePayment = async (paymentId) => {
  const query = `
    ${PREFIX}
    DELETE WHERE {
      <${paymentId}> a ex:Payment ;
                     ex:amount ?amount ;
                     ex:user ?user ;
                     ex:date ?date .
    }
  `;
  await axios.post(`${endpoint}/update?update=${encodeURIComponent(query)}`);
};

// EQUIPMENT
export const fetchEquipments = async () => {
  const query = `
    ${PREFIX}
    SELECT ?equipment ?name ?type
    WHERE {
      ?equipment a ex:Equipment ;
                 ex:name ?name ;
                 ex:type ?type .
    }
  `;
  const results = await runQuery(query);
  return results.map(result => ({
    id: result.equipment.value,
    name: result.name.value,
    type: result.type.value,
  }));
};

export const createEquipment = async (name, type) => {
  const query = `
    ${PREFIX}
    INSERT DATA {
      _:equipment a ex:Equipment ;
                  ex:name "${name}" ;
                  ex:type "${type}" .
    }
  `;
  await axios.post(`${endpoint}/update?update=${encodeURIComponent(query)}`);
};

export const deleteEquipment = async (equipmentId) => {
  const query = `
    ${PREFIX}
    DELETE WHERE {
      <${equipmentId}> a ex:Equipment ;
                       ex:name ?name ;
                       ex:type ?type .
    }
  `;
  await axios.post(`${endpoint}/update?update=${encodeURIComponent(query)}`);
};
