"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"; // Correct import
import CheckoutForm from "./_components/CheckoutForm";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
); // Correct spelling

function Checkout() {
  const searchparams = useSearchParams();
  const amount = Number(searchparams.get("amount"));
  const options = {
    mode: "payment",
    currency: "usd",
    amount: amount * 100,
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
}

function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Checkout />
      </Suspense>
    </div>
  );
}

export default Page;
