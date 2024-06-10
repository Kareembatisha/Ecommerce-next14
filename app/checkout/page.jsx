"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"; // Correct import
import CheckoutForm from "./_components/CheckoutForm";
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
); // Correct spelling
function Page() {
  const searchparams = useSearchParams();
  const options = {
    mode: "payment",
    currency: "usd",
    amount: Number(searchparams.get("amount")) * 100,
  };
  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm amount={Number(searchparams.get("amount"))} />
      </Elements>
    </div>
  );
}

export default Page;
