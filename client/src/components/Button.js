import styles from './Button.module.css';

const Button = ({ submit, children, ...props }) => {
  return (
    <>
      {submit ? (
        <button className={styles.btn} type="submit" {...props}>
          {children}
        </button>
      ) : (
        <button className={styles.btn} {...props}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
