import { useState } from "react";
import 'react-pro-sidebar/dist/css/styles.css';
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from "react-router-dom";
import { tokens } from  "../../theme";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PublicIcon from '@mui/icons-material/Public';
import AlignVerticalTopIcon from '@mui/icons-material/AlignVerticalTop';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import TerrainIcon from '@mui/icons-material/Terrain';
import AirIcon from '@mui/icons-material/Air';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      
      <Link to={to}>
        <Typography>{title}</Typography>
      </Link>
    </MenuItem>
  );
};


const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner":{
                    background: `${colors.grey[900]} !important`
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important"
                },
                "& .pro-inner-item":{
                    padding: "20px 35px 30px 20px !important"
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important"
                },
                "& .pro-menu-item.active": {
                    color: "6870fa !important"
                },
            }}
        >
    <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
              fontSize: "5px"
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="5px"
              >
                <Typography variant="title" color={colors.grey[100]} style={{ fontSize: 26}}>
                  <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold' }}>FlowBASE</span>
                    <AirIcon style={{ fontSize: 48, marginLeft: '1px' }} />
                  </div>
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          
          {/* MENU ITEMS */}
          <Box paddingLeft = {isCollapsed ? undefined : "10%"  } >
            
            <Box>
            <Item
              title = "MapX"
              to = "/map"
              icon = {<PublicIcon style={{ fontSize:30 }} />}
              selected = {selected}
              setSelected = {setSelected}
              
            />
            <Typography variant="title" color={colors.grey[100]}></Typography>
            <Item
              title = "ProdX"
              to = "/production"
              icon = {<QueryStatsIcon  style={{ fontSize: 30 }} />}
              selected = {selected}
              setSelected = {setSelected}
            />
            </Box>
            <Item
              title = "LogX"
              to = "/wireline"
              icon = {<AlignVerticalTopIcon  style={{ fontSize: 30 }} />}
              selected = {selected}
              setSelected = {setSelected}
            />
            <Item
              title="GeoX"
              to="/geology"
              icon={<TerrainIcon style={{ fontSize: 30 }} />}
              selected={selected}
              setSelected={setSelected}
              
            />
            
            {/*
            <Item
              title = "DevX"
              to = "/"
              icon = {<ManageHistoryIcon  style={{ fontSize: 30 }} />}
              selected = {selected}
              setSelected = {setSelected}
            />
            */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
    );
};

export default Sidebar;