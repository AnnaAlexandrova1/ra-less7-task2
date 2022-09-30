import React, { useState } from "react";
import { nanoid } from "nanoid";

function New(props) {
  return (
    <div className="wrap-item wrap-item-new">
      <span className="label">New!</span>
      {props.children}
    </div>
  );
}

function Popular(props) {
  return (
    <div className="wrap-item wrap-item-popular">
      <span className="label">Popular!</span>
      {props.children}
    </div>
  );
}

const drowBorder = (Popular, New) => {
  return function (props) {
    if (props.views >= 1000) {
      return <Popular {...props}  />;
    }
    if (props.views < 50) {
      return <New {...props} />;
    } else {
      return props.children
    }
  };
};
const Border = drowBorder(Popular, New);

function Article(props) {
  console.log(props.id)
  return (
    <div className="item item-article" key={props.id}>
      <h3>
        <a href="#">{props.title}</a>
      </h3>
      <p className="views">Прочтений: {props.views}</p>
    </div>
  );
}

function Video(props) {
  return (
    <div className="item item-video" >
      <iframe
        src={props.url}
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        key={props.id}
      ></iframe>
      <p className="views">Просмотров: {props.views}</p>
    </div>
  );
}

function List(props) {
  return props.list.map((item) => {
    switch (item.type) {
      case "video":
        return (
          <Border views={item.views}>
            <Video {...item}  />
          </Border>
        );

      case "article":
        return (
          <Border views={item.views}>
            <Article {...item} />;
          </Border> )
    }
  });
}

export default function App() {
  const [list, setList] = useState([
    {
      type: "video",
      url: "https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0",
      views: 50,
      id: nanoid()
    },
    {
      type: "video",
      url: "https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0",
      views: 12,
      id: nanoid()
    },
    {
      type: "article",
      title: "Невероятные события в неизвестном поселке...",
      views: 175,
      id: nanoid()
    },
    {
      type: "article",
      title: "Секретные данные были раскрыты!",
      views: 1532,
      id: nanoid()
    },
    {
      type: "video",
      url: "https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0",
      views: 4253,
      id: nanoid()
    },
    {
      type: "article",
      title: "Кот Бегемот обладает невероятной...",
      views: 12,
      id: nanoid()
    },
  ]);

  return <List list={list} />;
}
