import { SearchContainer } from "./search-style"

const Search = () =>(<SearchContainer className=" bg-light rounded rounded-pill">
<div className="input-group">
  <input type="search" placeholder="What're you searching for?" aria-describedby="button-addon1" className="form-control border-0 bg-light" />
  <div className="input-group-append">
    <button id="button-addon1" type="submit" className="btn btn-link text-primary"><i className="fa fa-search"></i></button>
  </div>
</div>
</SearchContainer>)

export default Search
