function Textarea({ className = "", ...props }) {
  return <textarea className={`ui-textarea ${className}`.trim()} {...props} />;
}

export default Textarea;
