import styles from './Input.module.css';

const Input = ({ name, ...props }) => {
  return (
    <input
      type="text"
      name={name}
      id={name}
      className={styles.input}
      {...props}
    />
  );
};

export default Input;
