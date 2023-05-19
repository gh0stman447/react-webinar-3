import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural } from '../../utils';

function Controls({ setVisible, increaseCount, totalAmount }) {
  return (
    <div className='Controls'>
      <div className=''>
        В корзине: {increaseCount ? `${increaseCount} ${plural(increaseCount, {one: 'товар', few: 'товара', many: 'товаров'})} / ${totalAmount.toLocaleString()} ₽ ` : 'пусто'}
      </div>
      <button onClick={() => setVisible(true)}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

Controls.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Controls);
