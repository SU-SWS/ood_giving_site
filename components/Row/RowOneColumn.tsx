type RowOneColumnProps = React.HTMLAttributes<HTMLDivElement>;

export const RowOneColumn = ({ children, ...props }: RowOneColumnProps) => {
  return (
    <div {...props}>{children}</div>
  );
};
