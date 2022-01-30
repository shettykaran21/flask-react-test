import styles from './Button.module.css';

const Button = ({ submit, children }) => {
  return (
    <>
      {submit ? (
        <button className={styles.btn} type="submit">
          {children}
        </button>
      ) : (
        <button className={styles.btn}>{children}</button>
      )}
    </>
  );
};

export default Button;
