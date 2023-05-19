import './style.css';

const Modal = ({ children, visible, setVisible }) => {
  const rootClasses = ['Modal'];
  if (visible) {
    rootClasses.push('active');
  }
  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className='Modal-content' onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
    
export default Modal;
