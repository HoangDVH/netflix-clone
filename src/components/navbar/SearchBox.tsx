import { useState, useRef, useEffect } from "react";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import { useNavigate } from "react-router-dom";

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
interface SearchProps {
  toggle: boolean;
  onhandleToggle: () => void;
}
export const SearchBox = (props: SearchProps) => {
  const { toggle, onhandleToggle } = props;
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const typingTimeoutRef = useRef(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const newSearchInput = target.value;
    setSearchInput(newSearchInput);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      if (newSearchInput.trim() === "") {
        navigate("/browse");
      } else {
        navigate(`/search?q=${newSearchInput}`);
      }
    }, 100);
  };

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.addEventListener("input", handleInputChange);
    }

    return () => {
      if (searchInputRef.current) {
        searchInputRef.current.removeEventListener("input", handleInputChange);
      }
    };
  }, [handleInputChange]);

  return (
    <div className="pb-5">
      {" "}
      <Search
        sx={
          isFocused
            ? { border: "1px solid white", backgroundColor: "black" }
            : {}
        }
      >
        <SearchIconWrapper>
          {toggle && <SearchIcon onClick={onhandleToggle} />}
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
          }}
          value={searchInput}
        />
      </Search>
    </div>
  );
};
