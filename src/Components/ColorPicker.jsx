import React, {useState} from "react";
import { HexColorPicker } from "react-colorful";
import "react-colorful/dist/index.css";

const App = () => {
  const [color, setColor] = useState("#aabbcc");
  return <HexColorPicker color={color} onChange={setColor} />;
};

export default App;