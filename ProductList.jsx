import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const plantsArray = [
    {
      category: "Air Purifying",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bac?auto=format&fit=crop&w=300", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=300", description: "Easy to grow indoor plant.", cost: "$12" },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=300", description: "Removes toxins from air.", cost: "$18" },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=300", description: "Loves high humidity.", cost: "$14" },
        { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=300", description: "Broad glossy leaves.", cost: "$20" },
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=300", description: "Healing gel inside leaves.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=300", description: "Soothing relaxing fragrance.", cost: "$16" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=300", description: "Sweet smelling flowers.", cost: "$22" },
        { name: "Mint", image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=300", description: "Refreshing culinary herb.", cost: "$8" },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&w=300", description: "Fragrant evergreen herb.", cost: "$12" },
        { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=300", description: "Aromatic cooling leaves.", cost: "$19" },
        { name: "Lemon Balm", image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=300", description: "Citrus scented leaves.", cost: "$9" }
      ]
    },
    {
      category: "Medicinal",
      plants: [
        { name: "Chamomile", image: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=300", description: "Calming herbal tea base.", cost: "$11" },
        { name: "Calendula", image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=300", description: "Soothes skin conditions.", cost: "$13" },
        { name: "Echinacea", image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=300", description: "Immune support herb.", cost: "$15" },
        { name: "Thyme", image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=300", description: "Antimicrobial herb.", cost: "$10" },
        { name: "Holy Basil (Tulsi)", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=300", description: "Adaptogenic medicinal plant.", cost: "$14" },
        { name: "Sage", image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=300", description: "Traditional healing herb.", cost: "$12" }
      ]
    }
  ];

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-logo" onClick={() => setShowCart(false)}>
          <h3>Paradise Nursery</h3>
        </div>
        <div className="nav-links">
          <button className="nav-btn" onClick={() => setShowCart(false)}>Plants</button>
          <button className="nav-btn cart-icon-btn" onClick={() => setShowCart(true)}>
            🛒 Cart <span className="cart-badge">{totalCartCount}</span>
          </button>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid-container">
          {plantsArray.map((categoryObj, catIdx) => (
            <div key={catIdx} className="category-section">
              <h2 className="category-title">{categoryObj.category}</h2>
              <div className="product-list">
                {categoryObj.plants.map((plant, plantIdx) => {
                  const isAdded = cartItems.some(item => item.name === plant.name);
                  return (
                    <div className="product-card" key={plantIdx}>
                      <img src={plant.image} alt={plant.name} className="product-img" />
                      <h3>{plant.name}</h3>
                      <p>{plant.description}</p>
                      <p className="product-cost">{plant.cost}</p>
                      <button 
                        className={`add-to-cart-btn ${isAdded ? 'disabled' : ''}`}
                        onClick={() => handleAddToCart(plant)}
                        disabled={isAdded}
                      >
                        {isAdded ? "Added to Cart" : "Add to Cart"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
