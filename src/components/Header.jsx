import React, { useMemo, useState } from "react";
import { toast } from 'react-toastify';
import { createOrder } from '../data/API';

export default function Header({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, customerDetails }) {
    // Estado derivado para verificar si el carrito está vacío
    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    // Cálculo del total del carrito
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Función para manejar la creación del pedido
    const handleCreateOrder = async () => {
        if (!customerDetails) {
            toast.error("No hay detalles del cliente disponibles.");
            return;
        }
    
        setIsSubmitting(true);
        try {
          const result = await createOrder(customerDetails, cart);
          if (result && result.success) {
            clearCart();
            // Crear un mensaje que incluya los detalles de los productos comprados
            const productDetails = cart.map(item => `${item.quantity}x ${item.productName}`).join(", ");
            toast.success(`Pedido creado con éxito! Compraste: ${productDetails}`);
          } else {
            toast.error("Error al crear el pedido.");
          }
        } catch (err) {
          toast.error("Error al crear el pedido: " + err.message);
          console.error("Order creation failed:", err);
        } finally {
          setIsSubmitting(false);
        }
    };
    
    

    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="/img/LogoSana.png" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div className="carrito">
                            <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />
                            <div id="carrito" className="bg-white p-3">
                                {isEmpty ? (
                                    <p className="text-center">El carrito está vacío</p>
                                ) : (
                                    <>
                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map(product => (
                                                    <tr key={product.productID}>
                                                        <td>
                                                            <img className="img-fluid" src={product.image} alt="Producto" />
                                                        </td>
                                                        <td>{product.productName}</td>
                                                        <td className="fw-bold">${product.price}</td>
                                                        <td className="flex align-items-start gap-4">
                                                        <button
  type="button"
  className="btn btn-dark"
  onClick={() => decreaseQuantity(product.productID)}
  disabled={product.quantity === 1} // Desactiva si la cantidad es 1
>
  -
</button>
{product.quantity}
<button
  type="button"
  className="btn btn-dark"
  onClick={() => increaseQuantity(product.productID)}
  disabled={product.quantity >= product.stock} // Desactiva si la cantidad es igual o supera el stock
>
  +
</button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-danger"
                                                                type="button"
                                                                onClick={() => removeFromCart(product.productID)}
                                                            >
                                                                X
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <p className="text-end">Total a pagar: <span className="fw-bold">${cartTotal}</span></p>
                                        <button
                                            className="btn btn-dark w-100 mt-3 p-2"
                                            onClick={clearCart}
                                        >
                                            Vaciar Carrito
                                        </button>
                                        <button
                                            className="btn btn-success w-100 mt-3"
                                            onClick={handleCreateOrder}
                                            disabled={isEmpty || isSubmitting}
                                        >
                                            {isSubmitting ? 'Procesando...' : 'Finalizar Pedido'}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
