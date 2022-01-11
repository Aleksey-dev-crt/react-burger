import React from 'react';
import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import './App.css';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main className="content">
        <BurgerIngredients />
      </main>
    </div>
  );
}

export default App;
