import { useState, useEffect } from "react";
import {
  Button,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  ListSubheader,
  IconButton,
  Tooltip
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DehazeIcon from "@mui/icons-material/Dehaze";
import MovieIcon from "@mui/icons-material/Movie";
import SearchIcon from "@mui/icons-material/Search";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");



  const genres = [
    "Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", "Thriller",
    "Fantasy", "Cartoon", "Adventure", "Mystery", "Musical", "Crime",
    "Family", "Western", "War",
  ];

  const goToHome = () => {
    navigate('/');
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const chooseGenre = (genre) => {
    console.log(genre);
    navigate(`/movie/list?page=1&limit=10&genre=` + genre);
  };

  const newestMovie = () => {
    navigate(`/movie/sort?page=1&limit=10&input_number=-1`);
  };

  const oldestMovie = () => {
    navigate(`/movie/sort?page=1&limit=10&input_number=1`);
  };

  const login_register = () => {
    navigate(`/user/login-register`);
  };

  const goToFavorite = () => {
    const user = localStorage.getItem('user');
    if (user) {
        navigate(`/movie/favorite`);
    } else {
        navigate(`/user/login-register`);
    }
};

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    console.log(searchQuery)
    if (searchQuery.trim()) {
      navigate(`/movie/search?page=1&limit=10&input=` + searchQuery);
    }
    setSearchQuery("")
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate(`/`);
    window.location.reload();
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      console.log(parsedUser)
      setCurrentUser(parsedUser);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const DrawerList = (
    <Box
      sx={{ width: 250, backgroundColor: "#17191b", height: "100%" }}
      className="custom-scrollbar"
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List className="bg-black">
        <ListItem className="bg-black" disablePadding>
          <ListItemButton onClick={()=>goToFavorite()} sx={{ "&:hover": { backgroundColor: "#3e3e3e" } }}>
            <IconButton aria-label="add to favorites">
              <AddCircleOutlineIcon sx={{ color: "#e5b41a" }} />
            </IconButton>
            <ListItemText primary="My Favorite" className="text-white" />
          </ListItemButton>
        </ListItem>
        <Divider sx={{ borderColor: "white" }} />
        <ListSubheader
          sx={{
            backgroundColor: "#e5b41a",
            color: "white",
            fontSize: "18px",
          }}
        >
          <IconButton aria-label="movies">
            <AnalyticsIcon sx={{ color: "white" }} />
          </IconButton>
          Release years
        </ListSubheader>
        <ListItem
          onClick={() => newestMovie()}
          sx={{ backgroundColor: "#17191b" }}
          disablePadding
        >
          <ListItemButton sx={{ "&:hover": { backgroundColor: "#3e3e3e" } }}>
            <ListItemText className="text-white" >Newest movie</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem
          onClick={() => oldestMovie()}
          sx={{ backgroundColor: "#17191b" }}
          disablePadding
        >
          <ListItemButton sx={{ "&:hover": { backgroundColor: "#3e3e3e" } }}>
            <ListItemText className="text-white" >Oldest movie</ListItemText>
          </ListItemButton>
        </ListItem>



        <ListSubheader
          sx={{
            backgroundColor: "#e5b41a",
            color: "white",
            fontSize: "18px",
          }}
        >
          <IconButton aria-label="movies">
            <MovieIcon sx={{ color: "white" }} />
          </IconButton>
          Movies
        </ListSubheader>
        {genres.map((text) => (
          <ListItem
            onClick={() => chooseGenre(text)}
            sx={{ backgroundColor: "#17191b" }}
            key={text}
            disablePadding
          >
            <ListItemButton sx={{ "&:hover": { backgroundColor: "#3e3e3e" } }}>
              <ListItemText primary={text} className="text-white" />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ borderColor: "white" }} />
    </Box>
  );

  return (
    <nav className="bg-black text-white">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button onClick={goToHome}>
            <h1 className="py-5 px-3 mr-10 text-white font-bold text-4xl">
              MDS
            </h1>
          </Button>
          <div className="md:hidden flex items-center">
            <Button onClick={toggleDrawer(true)}>
              <DehazeIcon sx={{ color: "white" }} />
            </Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </div>
          <div className="md:flex md:flex-row flex-col items-center justify-start md:space-x-4 pb-3 md:pb-0 hidden">
            <Button
              className="bg-white text-white"
              onClick={toggleDrawer(true)}
            >
              <DehazeIcon sx={{ color: "white" }} />
            </Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
          </div>
        </div>

        <div className="md:flex items-center space-x-4">
          <div className="hidden md:flex items-center border border-gray-600 rounded">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1.5 bg-black text-white border-none rounded-l focus:outline-none"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <div
              className="px-3 py-1.5 bg-gray-700 rounded-r"
              onClick={handleSearchClick}
              style={{ cursor: "pointer" }}
            >
              <SearchIcon
                sx={{ color: "white", width: "20px", height: "20px" }}
              />
            </div>
          </div>
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center">

                <AccountCircleIcon sx={{ fontSize: 25, color: "white" }} />

                <span className="text-white text-lg font-medium ml-2">{currentUser}</span>
              </div>
              <Tooltip title="Logout" arrow>
                <IconButton
                  aria-label="logout"
                  onClick={() => handleLogout()}
                  sx={{
                    color: "white",
                    transition: "transform 0.2s ease, background-color 0.2s ease",
                    '&:hover': {
                      backgroundColor: "#555",
                    },
                    '&:active': {
                      transform: "scale(0.95)",
                      backgroundColor: "#333",
                    }
                  }}
                >
                  <LogoutIcon sx={{ fontSize: 25 }} />
                </IconButton>
              </Tooltip>

            </div>
          ) : (
            <Button
              className="bg-white text-black"
              onClick={() => login_register()}
              sx={{backgroundColor:'#e5b41a',color:'black'}}
            >
              Sigin
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
