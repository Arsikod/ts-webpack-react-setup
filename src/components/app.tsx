import { Link, Outlet } from "react-router-dom";

import CompSvg from "@/assets/comp.svg";
import classes from "./app.module.scss";
import compPngPath from "@/assets/comp.png";
import compjpgPath from "@/assets/comp.jpg";
import { useState } from "react";

export function App() {
  return <Counter />;
}

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1 data-testid="app">Platform changed variable {__PLATFORM__}</h1>

      <h2 data-testid="h2">ENV variable is equeal to {__ENV__}</h2>

      <input type="text" />

      <img src={compPngPath} alt="comp" height={30} width={30} />
      <img src={compjpgPath} alt="comp" height={30} width={30} />

      <CompSvg height={50} width={50} color="green" />

      <Link to="/about">About</Link>
      <Link to="/shop">Shop</Link>

      <p>{count}</p>
      <button className={classes.button} onClick={() => setCount(count + 1)}>
        Increment
      </button>

      <Outlet />
    </div>
  );
}
