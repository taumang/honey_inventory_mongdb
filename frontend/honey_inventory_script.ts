// Define the HoneyItem interface
interface HoneyItem {
    id: string;
    name: string;
    quantity: number;
  }
  
  // Function to fetch all items from the backend API
  async function fetchItems() {
    const response = await fetch('http://localhost:5217/HoneyInventory');
    const data: HoneyItem[] = await response.json();
    populateInventoryList(data);
  }
  
  // Function to get a single item by ID
  async function fetchItemById(id: string) {
    const response = await fetch(`http://localhost:5217/HoneyInventory/${id}`);
    const data: HoneyItem = await response.json();
    // Handle the data (e.g., populate a details view)
  }
  
  // Function to add a new item via the API
  async function addItemToBackend(item: HoneyItem) {
    const response = await fetch('http://localhost:5000/HoneyInventory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });
    // Refresh the list after adding
    fetchItems();
  }
  
  // Function to populate the inventory list based on the fetched data
  function populateInventoryList(data: HoneyItem[]) {
    const inventoryList = document.getElementById("inventory-list") as HTMLDivElement;
    inventoryList.innerHTML = "";
    data.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.innerHTML = `<p>${item.name}: ${item.quantity}</p>`;
      inventoryList.appendChild(itemDiv);
    });
  }
  
  // Event listener for the "Add" button
  document.getElementById("add-item-btn")?.addEventListener("click", () => {
    const itemName = (document.getElementById("new-item-name") as HTMLInputElement).value;
    const itemQuantity = parseInt((document.getElementById("new-item-quantity") as HTMLInputElement).value);
    const newItem: HoneyItem = {
      id: '', // This should be generated by the backend
      name: itemName,
      quantity: itemQuantity
    };
    addItemToBackend(newItem);
  });
  
  // Fetch and populate items when the page loads
  fetchItems();
  