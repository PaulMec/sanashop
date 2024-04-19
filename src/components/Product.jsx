export default function Product({ product, addToCart }) {
    const { productID, productName, image, description, price, stock, categories } = product;

    const formattedCategories = categories?.map(cat => <i key={cat.categoryID}>{cat.categoryName}</i>).reduce((prev, curr) => [prev, ', ', curr]);

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4 image-container">
                <img className="img-fluid" src={image} alt="producto" />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{productName}</h3>
                <p className="text-black fw-bold text-uppercase">(Código: {productID})</p>
                <p>Descripción: {description}</p>
                {categories && categories.length > 0 && (
                    <>
                        <p>Categoría: {formattedCategories}</p>
                    </>
                )}
                <p className="fw-black text-primary fs-3">${price}</p>
                <span className={`badge ${stock > 0 ? 'bg-success' : 'bg-danger'}`}>Stock: {stock}</span>
                <button type="button" className="btn btn-dark w-100" onClick={() => addToCart(product)} >Agregar al Carrito</button>
            </div>
        </div>
    );
}
