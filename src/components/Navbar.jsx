import { useState } from "react";
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
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DehazeIcon from "@mui/icons-material/Dehaze";
import MovieIcon from "@mui/icons-material/Movie";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from 'react-router-dom';
import { searchMovie } from '../services/MovieService'; // Adjust this import according to your project structure

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();
  
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
    navigate(`/movie/list?page=1&limit=3&genre=` + genre);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    console.log(searchQuery)
    if (searchQuery.trim()) {
      searchMovie(searchQuery).then(response => {
        console.log('Search Results:', response.data);
        // You can navigate to a search results page or display the results here
      }).catch(error => {
        console.error('Search Error:', error);
      });
    }
  };

  const DrawerList = (
    <Box
      sx={{ width: 250, backgroundColor: "#17191b", height: "100%" }}
      className="custom-scrollbar"
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List className="bg-black">
        <ListItem className="bg-black" disablePadding>
          <ListItemButton sx={{ "&:hover": { backgroundColor: "#3e3e3e" } }}>
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
              onChange={handleSearchInputChange} // Handle input change
            />
            <div
              className="px-3 py-1.5 bg-gray-700 rounded-r"
              onClick={handleSearchClick} // Trigger search on click
              style={{ cursor: "pointer" }}
            >
              <SearchIcon
                sx={{ color: "white", width: "20px", height: "20px" }}
              />
            </div>
          </div>
          <IconButton aria-label="profile">
            <AccountCircleIcon sx={{ color: "white" }} />
          </IconButton>
        </div>
      </div>
    </nav>
  );
}
