let partiesData = [];

const fetchPartiesData = async () => {
    try {
        const response = await fetch('./assets/parties.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        partiesData = data;
        renderPartyList(data);
    } catch (error) {
        console.error('Error fetching parties data:', error);
    }
};

const renderPartyList = (parties) => {
    const partyListContainer = document.getElementById('party-list');
    partyListContainer.innerHTML = '';

    parties.forEach(party => {
        const partyItem = document.createElement('div');
        partyItem.className = 'party-item';
        partyItem.innerHTML = `
            <h3>${party.name}</h3>
            <p>${party.description}</p>
            <button onclick="viewPartyDetails('${party.id}')">Ver detalles</button>
        `;
        partyListContainer.appendChild(partyItem);
    });
};

window.viewPartyDetails = (partyId) => {
    const party = partiesData.find(p => p.id === partyId);
    const detailsSection = document.getElementById('party-details');
    if (!party) return;

    detailsSection.innerHTML = `
        <h3>${party.name}</h3>
        <p><strong>Descripción:</strong> ${party.description}</p>
        <p><strong>Plan de Gobierno:</strong> ${party.plan}</p>
        <h4>Integrantes:</h4>
        <ul>
            ${party.candidates.map(c => `<li>${c.role}: ${c.name}</li>`).join('')}
        </ul>
        <button onclick="closePartyDetails()">Cerrar</button>
    `;
    detailsSection.classList.remove('hidden');
};

window.closePartyDetails = () => {
    document.getElementById('party-details').classList.add('hidden');
};

document.addEventListener('DOMContentLoaded', fetchPartiesData);