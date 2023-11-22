import SearchIcon from "@mui/icons-material/Search";
interface SearchParams {
  onChange: () => void;
}

export const AdminSearch = (props: SearchParams) => {
  const { onChange } = props;


  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mt-10 -mb-5 text-end w-full">
        <input
          className="border-2 border-gray-400 w-1/4 px-2 py-2"
          onChange={onChange}
        ></input>
        <button className="bg-blue-500 text-white px-5 py-2 rounded">
          <SearchIcon />
        </button>
      </div>
    </div>
  );
};
