
// JavaScript to handle CRUD operations and fetch data from the backend API
let selectedId = null;

async function fetchData() {
  const response = await fetch('http://localhost:5217/HoneyInventory'); // Replace with your actual API endpoint
  const data = await response.json();
  populateData(data);
}

function populateData(data) {
  const dataContainer = document.getElementById('data-container');
  dataContainer.innerHTML = '';
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'bg-white p-4 rounded shadow cursor-pointer';
    card.innerHTML = `
      <h2 class="text-xl font-bold">${item.Honey_Name}</h2>
      <p>Color: ${item.Honey_Color}</p>
      <p>Price: ${item.Honey_Price}</p>
    `;
    card.addEventListener('click', () => selectItem(item));
    dataContainer.appendChild(card);
  });
}

function selectItem(item) {
  selectedId = item.Id;
  document.getElementById('honey-name').value = item.Honey_Name;
  document.getElementById('honey-color').value = item.Honey_Color;
  document.getElementById('honey-price').value = item.Honey_Price;
}

async function createItem() {
  const newItem = {
    Honey_Name: document.getElementById('honey-name').value,
    Honey_Color: document.getElementById('honey-color').value,
    Honey_Price: parseFloat(document.getElementById('honey-price').value)
  };
  const response = await fetch('http://localhost:5217/HoneyInventory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newItem)
  });
  if (response.ok) {
    fetchData();
  }
}

async function updateItem() {
  if (!selectedId) return;
  const updatedItem = {
    Honey_Name: document.getElementById('honey-name').value,
    Honey_Color: document.getElementById('honey-color').value,
    Honey_Price: parseFloat(document.getElementById('honey-price').value)
  };
  const response = await fetch(`http://localhost:5217/HoneyInventory/${selectedId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedItem)
  });
  if (response.ok) {
    fetchData();
  }
}

async function deleteItem() {
  if (!selectedId) return;
  const response = await fetch(`http://localhost:5217/HoneyInventory/${selectedId}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    fetchData();
  }
}

document.getElementById('create-button').addEventListener('click', createItem);
document.getElementById('update-button').addEventListener('click', updateItem);
document.getElementById('delete-button').addEventListener('click', deleteItem);

// Call fetchData on page load
window.addEventListener('DOMContentLoaded', (event) => {
  fetchData();
});
