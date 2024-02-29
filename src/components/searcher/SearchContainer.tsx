import { Searcher } from "./Searcher";

export const SearcherContainer = () => {
  return (
    <Searcher
      action={function accion() {
        window.location.href = "/search";
      }}
    />
  );
};
