import { Layers3 } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Layers3 className="h-7 w-7 text-primary" />
      <span className="text-xl font-bold text-primary font-headline">
        SchemeSevak
      </span>
    </Link>
  );
};

export default Logo;
