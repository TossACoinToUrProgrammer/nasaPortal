import React from 'react';
import LinkMessage from './LinkMessage';
import css from '../SpaceWeather.module.scss';
const MessageBody = ({text}) => {
    let messageBody = text.split("##");
    messageBody = messageBody.map((message, index) => {
      if (message.includes("http")) {
        message = message.split("http").map((item, index) => {
          if (index === 0) return item;
          return <LinkMessage key={index} text={item} />;
        });
      }
      return (
        <li key={index} className={css.card_section}>
          {message}
          <br />
        </li>
      );
    });
    return <>{messageBody}</>;
};

export default MessageBody;