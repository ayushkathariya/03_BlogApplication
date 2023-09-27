import { FC } from "react";
import SearchBar from "./SearchBar";

const Dashboard: FC = () => {
  return (
    <div className="px-6 py-10 md:px-10 lg:px-72">
      <div className="flex flex-col items-center gap-10">
        <span className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-bold md:text-3xl">Read the most </h2>
          <h2 className="text-2xl font-bold tracking-wide md:text-3xl md:tracking-wider">
            Intersting articles
          </h2>
        </span>
        <span className="text-center md:font-medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
          mollitia nulla, sit tenetur necessitatibus recusandae. Lorem ipsum
          dolor sit amet consectetur, adipisicing elit.
        </span>
        <SearchBar />
      </div>
    </div>
  );
};

export default Dashboard;
