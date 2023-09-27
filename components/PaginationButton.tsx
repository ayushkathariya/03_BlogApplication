import { FC } from "react";
import { Button } from "@/components/ui/button";

type PaginationProps = {
  page: number | any;
};

const PaginationButton: FC<PaginationProps> = ({ page }) => {
  return <Button variant="outline">{page}</Button>;
};

export default PaginationButton;
