import React, { useEffect, useState } from 'react';
import Header from "./components/Header";
import Product from "./components/Product";
import config from './config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchCustomerByEmail } from './data/API';

function App() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState(() => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  });
  const [email, setEmail] = useState('');
  const [customerDetails, setCustomerDetails] = useState(null);

  useEffect(() => {
    fetch(`${config.API_URL}/products`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {
    if (!customerDetails) {
      toast.error("Por favor, valide un cliente antes de añadir productos al carrito.");
      return;
    }
  
    const itemIndex = cart.findIndex((product) => product.productID === item.productID);
    if (itemIndex >= 0) {
      const newCart = [...cart];
      newCart[itemIndex].quantity++;
      setCart(newCart);
    } else {
      setCart(prevCart => [...prevCart, { ...item, quantity: 1 }]);
    }
  }
  

  function removeFromCart(productID) {
    setCart(prevCart => prevCart.filter(product => product.productID !== productID));
  }

  function updateQuantity(productID, delta) {
    setCart(prevCart => prevCart.map(item =>
      item.productID === productID ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  }

  function clearCart() {
    setCart([]);
  }

  const handleCheckCustomer = async () => {
    if (!email) {
      toast.error("Por favor, ingrese un correo electrónico.");
      return;
    }
    try {
      const customer = await fetchCustomerByEmail(email);
      if (customer) {
        setCustomerDetails(customer);
        toast.success("Cliente verificado con éxito!");
      } else {
        throw new Error();
      }
    } catch (error) {
      setCustomerDetails(null);
      toast.error("Cliente no encontrado, por favor cree uno nuevo.");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Header
  cart={cart}
  removeFromCart={removeFromCart}
  increaseQuantity={(productID) => updateQuantity(productID, 1)}
  decreaseQuantity={(productID) => updateQuantity(productID, -1)}
  clearCart={clearCart}
  customerDetails={customerDetails}
/>

      <main className="container-xl mt-5">
        <div className="text-center mb-4">
          <h2>Nuestros Productos</h2>
          <div className="my-4 d-flex justify-content-center">
            <input
              type="email"
              className="form-control w-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Introduce el correo del cliente"
            />
            <button className="btn btn-dark ms-2" onClick={handleCheckCustomer}>Buscar Cliente</button>
          </div>
          {customerDetails && (
            <div className="text-center mt-3">
              <h4>Detalles del Cliente:</h4>
              <p>Nombre: {customerDetails.firstName} {customerDetails.lastName}</p>
              <p>Correo: {customerDetails.email}</p>
            </div>
          )}
        </div>
        <div className="row mt-5">
  {data.map(product => (
    <Product
      key={product.productID}
      product={product}
      cart={cart}
      addToCart={addToCart}
    />
  ))}
</div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">SanaTest - Yilver Díaz</p>
        </div>
      </footer>
    </>
  );
}

export default App;
