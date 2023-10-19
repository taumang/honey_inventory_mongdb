let selectedId = null;

async function fetchData() {
  const response = await fetch('http://localhost:5217/HoneyInventory'); 
  const data = await response.json();
  populateData(data);
}

function populateData(data) {
  const dataContainer = document.getElementById('data-container');
  dataContainer.innerHTML = '';
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'flex mb-4';
    card.innerHTML = `
    <div class="w-1/4">
    <h2 class="text-xl font-bold">${item.Honey_Name}</h2>
    <p>Color: ${item.Honey_Color}</p>
    <p>Price: ${item.Honey_Price}</p>
    <p>Size: ${item.Honey_Size}</p>
    <p>Quantity: ${item.Honey_Quantity}</p>
  </div>
  <button id= ${updateButton} class="p-2 bg-yellow-500 text-white rounded">Update</button>
  <button id=${deleteButton} class="p-2 bg-red-500 text-white rounded ml-2">Delete</button>
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
  document.getElementById('honey-size').value = item.Honey_Size;
  document.getElementById('honey-quantity').value = item.Honey_Quantity;
}

async function createItem() {
  const newItem = {
    Honey_Name: document.getElementById('honey-name').value,
    Honey_Color: document.getElementById('honey-color').value,
    Honey_Price: parseFloat(document.getElementById('honey-price').value),
    Honey_Size: document.getElementById('honey-size').value,
    Honey_Quantity: parseFloat(document.getElementById('honey-quantity').value)
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
    Honey_Price: parseFloat(document.getElementById('honey-price').value),
    Honey_Size: document.getElementById('honey-size').value,
    Honey_Quantity: parseFloat(document.getElementById('honey-quantity').value)
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
var updateButton = document.getElementById('update-button').addEventListener('click', updateItem);
var deleteButton = document.getElementById('delete-button').addEventListener('click', deleteItem);


window.addEventListener('DOMContentLoaded', (event) => {
  fetchData();
});
