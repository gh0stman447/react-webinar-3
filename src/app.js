import React, { useCallback, useState, useMemo } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from './components/Modal';
import Cart from './components/cart';
import Item from './components/item';
import CartItem from './components/cartItem';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const [modal, setModal] = useState(false);
  const count = useMemo(() => list.reduce((acc, item) => acc + !!item.count, 0), [list]);
  const amount = useMemo(
    () => list.reduce((acc, item) => acc + item.price * (item.count ?? 0), 0),
    [list],
  );
  const callbacks = {
    onDeleteItem: useCallback(
      (code) => {
        store.deleteItem(code);
      },
      [store],
    ),
    onSelectItem: useCallback(
      (code) => {
        store.selectItem(code);
      },
      [store],
    ),
    increaseCount: useCallback(
      (code) => {
        store.increaseCount(code);
      },
      [store],
    ),
    addItem: useCallback(() => {}, []),

    removeItem: useCallback((code) => store.deleteItem(code), [store]),
  };

  const cartItems = useMemo(() => list.filter((item) => item.count), [list]);

  const renders = {
    renderCatalogItem: useCallback(
      (item) => (
        <Item item={item} addItem={callbacks.addItem} increaseCount={callbacks.increaseCount} />
      ),
      [callbacks.addItem, callbacks.increaseCount],
    ),
    renderCartItem: useCallback(
      (item) => <CartItem item={item} deleteItem={callbacks.removeItem} />,
      [callbacks.addItem, callbacks.increaseCount],
    ),
  };

  return (
    <PageLayout>
      <Modal visible={modal} setVisible={setModal}>
        <Cart
          renderItem={renders.renderCartItem}
          visible={modal}
          setVisible={setModal}
          products={cartItems}
          totalAmount={amount}
        />
      </Modal>
      <Head title='Приложение на чистом JS' />
      <Controls setVisible={setModal} increaseCount={count} totalAmount={amount} />
      <List list={list} renderItem={renders.renderCatalogItem} />
    </PageLayout>
  );
}
export default App;
