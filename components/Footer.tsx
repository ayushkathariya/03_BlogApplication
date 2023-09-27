import { FC } from "react";
import { FcLikePlaceholder } from "react-icons/fc";

const Footer: FC = () => {
  return (
    <footer className="mb-4 mt-10">
      <div className="flex flex-col md:flex-row md:gap-8 gap-3 justify-center items-center">
        <span>
          <FcLikePlaceholder className="text-xl md:text-2xl" />
        </span>
        <span>
          <h1 className="md:text-lg">
            Copyright © 2023 <span className="font-bold">Ayush Kathariya</span>
          </h1>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
