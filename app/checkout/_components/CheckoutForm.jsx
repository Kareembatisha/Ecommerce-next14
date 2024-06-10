"use client";
import { useState, useEffect, useContext } from "react";
import { cartContext } from "../../_context/CartContext";
import { useUser } from "@clerk/nextjs";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import OrderApis from "../../_utils/OrderApis";
import cartApis from "../../_utils/cartApis";

function CheckoutForm({ amount }) {
  const { user } = useUser();
  const { cart, setCart } = useContext(cartContext);
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the client secret from your backend when the component mounts
    fetch("/api/create-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount }), // Example amount in cents
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        console.error("Error fetching client secret:", error);
        setErrorMessage("Failed to initialize payment.");
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    createOrder();

    sendEmail();
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3002/paymentConfirm", // Adjust this URL to your success page
      },
      clientSecret,
    });

    if (result.error) {
      setErrorMessage(result.error.message);
    }

    setLoading(false);
  };

  const createOrder = () => {
    let productIds = [];
    cart.map((el) => {
      productIds.push(el?.product?.id);
    });
    const data = {
      data: {
        email: user.primaryEmailAddress.emailAddress,
        username: user.fullName,
        amount,
        products: productIds,
      },
    };
    OrderApis.createOrder(data).then((res) => {
      if (res) {
        cart.map((el) => {
          cartApis.deleteCartItem(el?.id).then((reselt) => {});
        });
      }
    });
  };
  const sendEmail = async () => {
    const res = await fetch("/api/send-email", {
      method: "POST",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-32 md:mx-[420px] mt-12">
        <PaymentElement />
        <button
          className="w-full p-2 mt-4 text-white rounded-md bg-primary"
          disabled={!stripe || !elements || !clientSecret || loading}
        >
          {loading ? "Processing..." : "Submit"}
        </button>
        {errorMessage && (
          <div id="error-message" className="text-red-500 mt-4">
            {errorMessage}
          </div>
        )}
      </div>
    </form>
  );
}

export default CheckoutForm;
