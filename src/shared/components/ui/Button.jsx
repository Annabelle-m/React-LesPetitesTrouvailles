function Button({
  className = "",
  type = "button",
  variant = "custom",
  ...props
}) {
  const variantClass = variant === "custom" ? "" : `ui-button--${variant}`;
  const classes = ["ui-button", variantClass, className]
    .filter(Boolean)
    .join(" ");

  return <button className={classes} type={type} {...props} />;
}

export default Button;
