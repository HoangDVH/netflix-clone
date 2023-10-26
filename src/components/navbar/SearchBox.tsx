import { useState, useRef, useEffect } from "react";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import { useNavigate, useSearchParams } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty-pattern
const Search = styled("div")(({}) => ({
  position: "relative",
  width: "100%",
  display: "flex",
  alignItems: "center",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  cursor: "pointer",
  padding: theme.spacing(0, 1),
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .NetflixInputBase-input": {
    width: 0,
    transition: theme.transitions.create("width", {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeIn,
    }),
    "&:focus": {
      width: "auto",
    },
  },
}));

// import statements...

// import statements...

export const SearchBox = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null); // initialize with null

  const handleEnterPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchInputRef.current) {
      navigate(`/search?q=${searchInput}`);
    }
  };

  useEffect(() => {
    const handleInputChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const newSearchInput = target.value;
      setSearchInput(newSearchInput);
    };

    if (searchInputRef.current) {
      searchInputRef.current.addEventListener("input", handleInputChange);
    }

    return () => {
      if (searchInputRef.current) {
        searchInputRef.current.removeEventListener("input", handleInputChange);
      }
    };
  }, []);

  return (
    <Search
      sx={isFocused ? { border: "1px solid white", backgroundColor: "black" } : {}}
    >
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        inputRef={searchInputRef}
        placeholder="Titles, people, genres"
        inputProps={{
          "aria-label": "search",
          onFocus: () => {
            setIsFocused(true);
          },
          onBlur: () => {
            setIsFocused(false);
          },
          onKeyDown: handleEnterPress,
        }}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </Search>
  );
};
