import React from "react";
import Button from "./Component/Button";

const Home = () => {
  return (
    <div>
      <Button children={<a href="/signin">로그인</a>} /> 
      <Button children={<a href="/signup">회원가입</a>} />
    </div>
  );
};

export default Home;
