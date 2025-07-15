export default function Button({ children, onClick, className }) {
  return (
    <button className={`button${className ? ' ' + className : ''}`} onClick={onClick}>
      {children}
    </button>
  );
}
