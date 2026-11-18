import type { Request, Response } from "express";

interface FrankfurterRate {
  date: string;
  base: string;
  quote: string;
  rate: number;
}

export const getCurrencyRates = async (_req: Request, res: Response) => {
  try {
    const response = await fetch(
      "https://api.frankfurter.dev/v2/rates?base=EUR&quotes=INR,GBP,AUD,USD",
    );

    if (!response.ok) {
      throw new Error(`Frankfurter API error: ${response.status}`);
    }

    const data: FrankfurterRate[] = await response.json();

    const firstRate = data[0];

    if (!firstRate) {
      throw new Error("No exchange rates received");
    }

    const rates: Record<string, number> = {
      EUR: 1,
    };

    for (const item of data) {
      rates[item.quote] = item.rate;
    }

    return res.status(200).json({
      success: true,
      base: "EUR",
      date: firstRate.date,
      rates,
    });
  } catch (error) {
    console.error("getCurrencyRates:", error);

    return res.status(502).json({
      success: false,
      message: "Failed to fetch currency exchange rates",
    });
  }
};
