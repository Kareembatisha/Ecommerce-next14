import Image from "next/image";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="flex flex-col items-center justify-center px-5 mt-4">
      <Image src="/verified.gif" alt="check" width={130} height={130} />
      <h2 className="text-[24px]">payment successful</h2>
      <h2 className="text-[17px] text-center mt-6 text-gray-500">
        we sent an email with your order confirmation along with digital content
      </h2>
      <Link href="/" className="p-2 mt-6 text-white rounded-md bg-primary">
        {" "}
        Go to Home
      </Link>
    </div>
  );
}

export default page;
