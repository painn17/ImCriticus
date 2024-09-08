import Link from "next/link";

function LinkTo({ href, children }) {
  return (
    <Link href={href}>
      <div className="link-small text-gray-200 flex flex-row gap-1 hover:scale-105 hover:text-green-200 transition ease-linear duration-200">
        {children}
      </div>
    </Link>
  );
}

export default LinkTo;
