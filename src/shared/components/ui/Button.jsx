function Button({
  as: Component = "button",
  className = "",
  type = "button",
  variant = "custom",
  ...props
}) {
  const variantClass = variant === "custom" ? "" : `ui-button--${variant}`;
  const classes = ["ui-button", variantClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Component
      className={classes}
      type={Component === "button" ? type : undefined}
      {...props}
    />
  );
}

export default Button;
