interface IProps {
  title: string;
}

const Title = ({ title }: IProps) => {
  return <h1>{title}</h1>;
};

export default Title;
