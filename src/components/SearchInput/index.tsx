import { SearchInputProp } from "./SearchInput.types";

const SearchInput = ({ location, onChange }: SearchInputProp): JSX.Element => (
  <div className="flex justify-center space-x-4">
    <input
      className="border-b-2 outline-none"
      type="text"
      placeholder="Search a location"
      onChange={(e) => onChange(e?.target?.value)}
      value={location}
    />
  </div>
);

export default SearchInput;
