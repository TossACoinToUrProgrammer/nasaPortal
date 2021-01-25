import React from "react";

const LinkMessage = ({ text }) => {
  const link = text.split(" ")[0];
  const plainText = text.split(" ")[1];
  const href = "http" + link;
  return (
    <>
      <a target="_blank" href={href}>
        http{link}
      </a>{" "}
      {plainText}
    </>
  );
};

export default LinkMessage;
