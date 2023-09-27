import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  image: string;
};

export default function AvatarCard({ image }: Props) {
  return (
    <Avatar>
      <AvatarImage src={image} alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
