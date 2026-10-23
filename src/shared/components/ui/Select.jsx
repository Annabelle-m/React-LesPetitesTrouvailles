function Select({ className = "", ...props }) {
  return <select className={`ui-select ${className}`.trim()} {...props} />;
}

export default Select;
