import React from 'react';

interface IProps {
  data: IArticle[];
}

interface IArticle {
  id: string;
  title: string;
  text: string;
}

const Articles = ({ data }: IProps) => {
  return (
    <ul>
      {data.map((item: IArticle) => (
        <li>{item.title}</li>
      ))}
    </ul>
  );
};

export default Articles;
