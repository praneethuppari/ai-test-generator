function calculateTotal(items, tax) {
    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    return subtotal * (1 + tax);
}

async function fetchUserData(userId) {
    const response = await fetch(`/api/users/${userId}`);
    return await response.json();
}