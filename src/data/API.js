import config from '../config';

const baseUrl = config.API_URL;

export function createProduct(product) {
  return fetch(`${baseUrl}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  }).then(response => response.json());
}

export function fetchProducts() {
  return fetch(`${baseUrl}/products`)
    .then(response => response.json());
}

export function updateProduct(id, product) {
  return fetch(`${baseUrl}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  });
}

export function deleteProduct(id) {
  return fetch(`${baseUrl}/products/${id}`, {
    method: 'DELETE'
  });
}

// Esta función crea una orden basándose en los detalles del cliente y el carrito de compras.
export function createOrder(customerDetails, cart) {
    const orderDetails = cart.map(item => ({
        ProductID: item.productID,
        Quantity: item.quantity,
        Price: item.price
    }));

    const orderData = {
        CustomerID: customerDetails.customerID,
        OrderDate: new Date().toISOString(),
        OrderDetails: orderDetails,
        Customer: {
            CustomerID: customerDetails.customerID,
            FirstName: customerDetails.firstName,
            LastName: customerDetails.lastName,
            Email: customerDetails.email
        }
    };

    console.log("Sending order details:", JSON.stringify(orderData));

    return fetch(`${baseUrl}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                console.log("Error response data:", data);  // Muestra datos de error si la respuesta no es OK
                throw new Error(data.message || "Failed to create order");
            });
        }
        return response.json();
    })
    .then(data => {
        console.log("Success response data:", data);  // Muestra datos de éxito
        return { success: true, data };  // Asegúrate de que esto coincida con lo que espera tu front-end
    })
    .catch(error => {
        console.error("Failed to create order:", error.message);
        throw error; // Propagar el error para manejo adicional si es necesario
    });
}


// Agrega esta función para buscar o crear un cliente por correo electrónico
export function fetchCustomerByEmail(email) {
    return fetch(`${baseUrl}/customers/email/${email}`, { // Asegúrate de que el endpoint coincida con tu configuración de API
        method: 'GET', // Usa GET si solo estás buscando al cliente
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Cliente no encontrado");
        }
        return response.json();
    })
    .catch(error => {
        console.error("Error al buscar al cliente:", error);
        throw error;
    });
}
