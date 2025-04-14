import React from 'react';

const ArtificialPlants = () => {
return (
  <section className="artificial-plants">
    <header className="artificial-plants__header">
      <h1>Artificial Plants Collection</h1>
      <p>Enhance your space with realistic, beautifully designed artificial plants.</p>
    </header>

    <div className="artificial-plants__gallery">
      {/* Example Product Card */}
      <article className="plant-card">
        <img 
          src="path/to/plant-image.jpg" 
          alt="Artificial Monstera Plant" 
          className="plant-card__image" 
        />
        <h2 className="plant-card__title">Artificial Monstera</h2>
        <p className="plant-card__description">
          A lifelike monstera plant to bring nature into your home without the upkeep.
        </p>
      </article>
      {/* Additional plant cards can be added here */}
    </div>
  </section>
);
};

export default ArtificialPlants;