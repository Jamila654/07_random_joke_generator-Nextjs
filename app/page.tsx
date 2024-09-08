"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [joke, setJoke] = useState("Click 'Generate Now' to get a joke!");

  const fetchJoke = async () => {
    try {
      const response = await fetch("https://api.api-ninjas.com/v1/jokes", {
        headers: { "X-Api-Key": "lKtqOcitXKlPdf5kvf1ysg==AguhIHwYblypgdyF" },
      });
      const data = await response.json();
      if (data && data.length > 0) {
        setJoke(data[0].joke);
      }
    } catch (error) {
      console.error("Error fetching the joke:", error);
      setJoke("Failed to fetch a joke, please try again.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(joke).then(
      () => {
        alert("Joke copied to clipboard!");
      },
      (err) => {
        console.error("Failed to copy the joke:", err);
      }
    );
  };

  return (
    <div
      className="min-h-screen bg-cover flex items-center justify-center"
      style={{ backgroundImage: "url('/background-image.jpg')" }}
    >
      <main>
        <Card>
          <CardHeader>
            <CardTitle className=" text-center">Random Joke Generator</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-wrap">{joke}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-around font-bold">
            <Button onClick={fetchJoke}>Generate Now</Button>
            <Button onClick={copyToClipboard}>Copy Now</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
