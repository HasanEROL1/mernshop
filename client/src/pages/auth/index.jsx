import { useState } from "react";
import Login from "./login";
import Register from "./register";

export default function Auth() {

  const [isLogin, SetIsLogin] = useState(true)

  return (
    <div>
      {isLogin ? (
        <Login onSwitch={() => SetIsLogin(false)} />
      ) : (
        <Register onSwitch={() => SetIsLogin(true)} />
      )}

    </div>

  );
}
