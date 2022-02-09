import classes from './Dropdown.module.css';

export const Dropdown = ({children}) => {
      return (
        <div className={classes.dropdown}>
          {children}
        </div>
       
      );
  }
  
  export default Dropdown;