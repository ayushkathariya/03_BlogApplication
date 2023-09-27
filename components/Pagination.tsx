import { FC } from "react";
import PaginationButton from "./PaginationButton";
import { ChevronRightIcon } from "lucide-react";

const Pagination: FC = () => {
  return (
    <span>
      <h3 className="mt-8 ml-1 text-xl font-bold md:ml-6 lg:ml-10 xl:ml-14 2xl:ml-20">
        Next
      </h3>
      <span className="flex flex-wrap gap-2 mt-5 gap-y-2 justify-evenly">
        <PaginationButton page={1} />
        <PaginationButton page={2} />
        <PaginationButton page={3} />
        <PaginationButton page={4} />
        <PaginationButton page={5} />
        <PaginationButton page={6} />
        <PaginationButton page={7} />
        <PaginationButton page={8} />
        <PaginationButton page={9} />
        <PaginationButton page={<ChevronRightIcon />} />
      </span>
    </span>
  );
};

export default Pagination;
