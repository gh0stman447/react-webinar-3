import React from 'react';
import List from '../list';
import './style.css';

const Cart = ({ products, setVisible, renderItem, totalAmount }) => {
  return (
    <div className='Cart'>
      <div className='Cart-head'>
        <div className='Cart-title'>
          <h1>Корзина</h1>
        </div>
        <div className='Cart-close'>
          <button onClick={() => setVisible(false)}>Закрыть</button>
        </div>
      </div>
      <div className='Cart-list'>
        {!products.length ? (
          <div className='Cart-empty'>
            <h2>В корзине пусто</h2>
          </div>
        ) : (
          <div>
            <List list={products} renderItem={renderItem} />
            <div className='Cart-footer'>
              <div className='Cart-total'>
                <div>Итого</div>
                <div>{totalAmount.toLocaleString()} ₽</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Cart);
