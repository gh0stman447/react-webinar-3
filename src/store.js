/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    let isCodeUnique = false;
    let uniqueCode;
    while (!isCodeUnique) {
      // Генерация уникального id
      uniqueCode = Math.floor(Math.random() * 100);
      isCodeUnique = this.state.list.every((item) => item.code !== uniqueCode);
    }

    this.setState({
      ...this.state,
      list: [...this.state.list, { code: uniqueCode, title: 'Новая запись', count: 0 }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code, event) {
    const target = event.target;
    const updatedList = this.state.list.map((item) => {
      // Сохранение выделения при удалении
      if (target.tagName === 'BUTTON') {
        return item;
      } // Подсчёт количества выделений
      if (item.code === code) {
        if (!item.selected) {
          item.count += 1;
        }
        item.selected = !item.selected;
      } // Сброс старого выделения
      if (item.selected && item.code !== code) {
        item.selected = !item.selected;
      }
      return item;
    });
    this.setState({
      ...this.state,
      list: updatedList,
    });
  }
}

export default Store;
