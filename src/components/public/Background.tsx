const Background = ({ children }: any): JSX.Element => {
  return (
    <body className="bg-gray-50 dark:bg-black transition-all">{children}</body>
  );
};

export default Background;
