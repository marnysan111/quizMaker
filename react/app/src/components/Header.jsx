import React, {useContext, useEffect, useState} from 'react';
import { AppBar, Toolbar, Drawer, List, ListItem, Typography, Link, ListItemButton } from '@mui/material';
function Header() {
  const [items, setItems] = useState([
    {name: "Home", url: "/"},
    {name: "ログイン", url: "/login"},
    {name: "社員検索", url: "/employee"},
    {name: "ファイル検索", url: "/file"},
    {name: "画像検索", url: "/image"}
  ]);

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">
            QUIZMAKER
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;