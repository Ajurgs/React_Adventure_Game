import React from "react";
const Style={
  creditsList:{
    listStyleType:"none",
    fontSize:"15px",
  },
  credit:{
    display:"inline",
  },
  creditLink:{
    color:"black",
  }
}
const Footer = () => {
  return (
    <footer className="w-100 mt-auto text-dark p-4">
      <div className="container text-center mb-5">
        <h4>&copy; {new Date().getFullYear()} - Haunted Caverns</h4>
        <p>Image Credits:
          <ul style={Style.creditsList}>
            <li style={Style.credit}> <a href="https://superdark.itch.io/16x16-free-npc-pack" style={Style.creditLink}>Superdark's x16-free-npc-pack</a></li>
            <li style={Style.credit}> | </li>
            <li style={Style.credit}> <a href="https://superdark.itch.io/enchanted-forest-characters" style={Style.creditLink}>Superdark's enchanted-forest-characters</a></li>
            <li style={Style.credit}> | </li>
            <li style={Style.credit}> <a href="https://0x72.itch.io/dungeontileset-ii " style={Style.creditLink}>0x72's dungeontileset-II</a></li>
            <li style={Style.credit}> | </li>
            <li style={Style.credit}> <a href="https://anritool.itch.io/cr-tileset" style={Style.creditLink}>AnriTool's cr-tileset</a></li>
          </ul>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
