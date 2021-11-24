const Background = ({ children }: any): JSX.Element => {
  return (
    <body className="bg-white dark:bg-black transition-all">{children}</body>
  );
};

export default Background;
