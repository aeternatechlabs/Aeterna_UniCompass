import Groq from "groq-sdk";

const client = () => {
  const key = process.env.GROQ_API_KEY;

  if (!key) {
    throw new Error("GROQ_API_KEY is missing from .env");
  }

  return new Groq({ apiKey: key });
};

const MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b";

// Profile Evaluation Types

export interface ProfileEvaluationInput {
  undergraduateCourse: string;
  targetDestination: string;
  fieldOfSpecialisation: string;
  targetBudget: string;
}

export interface ProfileEvaluationResult {
  matchedUniversity: string;
  fitLevel: string;
  fitAssessment: string;
  academicCheck: string;
  englishReq: string;
  visaRoute: string;
}

// Parse AI JSON Response

const parseJson = (text: string): ProfileEvaluationResult => {
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start < 0 || end < start) {
    throw new Error("Groq returned invalid JSON");
  }

  return JSON.parse(cleaned.slice(start, end + 1)) as ProfileEvaluationResult;
};

// Evaluate Student Profile

export const evaluateStudentProfile = async (
  profile: ProfileEvaluationInput,
): Promise<ProfileEvaluationResult> => {
  const prompt = `
You are an experienced international education advisor for Aeterna UniCompass.

Your task is to evaluate a student's study-abroad compatibility using their actual profile.

STUDENT PROFILE:

Education Level / Current Qualification: ${profile.undergraduateCourse}
Target Study Destination: ${profile.targetDestination}
Core Field of Specialisation: ${profile.fieldOfSpecialisation}
Target Annual Budget: ${profile.targetBudget}

IMPORTANT PROFILE RULES:

1. Use all four submitted profile values when generating your evaluation.
2. Never change, ignore, or invent the student's selected information.
3. Never assume the student has a bachelor's degree if they selected High School (12th).
4. Do not invent GPA, academic marks, work experience, test scores, or achievements.
5. Make recommendations relevant to the student's selected education level and specialization.

COUNTRY SELECTION:

If the student selects a specific country:
- Recommend universities only in that country.
- Provide information relevant to that country's education system.
- Use its appropriate student visa category.
- Explain relevant language and admission requirements.

If the student selects "Open to all countries":
- Compare suitable study destinations across different countries.
- Recommend universities from different countries only when relevant to the student's profile.
- Consider affordability, academic suitability, and program availability.
- Explain the advantages and limitations of each destination.
- Do not recommend famous universities simply because they are well known.
- Highlight which destinations appear most suitable overall.



UNIVERSITY RECOMMENDATIONS:

- Recommend a maximum of 2 universities.
- Recommend only universities in the selected country.
- For Open to all countries, select universities from suitable destinations.
- For each university, provide:
  University Name | Programme | Language | Annual Tuition | Match Reason
- Keep each university to a maximum of 2 short lines.
- Do not add lengthy descriptions, rankings, or extra explanations.
- Use only information relevant to the selected profile.

For EACH university, provide only these five details:

1. University Name
2. Relevant Programme
3. Teaching Language
4. Estimated Annual Tuition Fees
5. Why It Matches the Student's Profile

FORMATTING RULES:

- Keep each university recommendation to 2–3 sentences maximum.
- Use a clear numbered list.
- Keep the information concise and easy to understand.
- Do not include university history, rankings, lengthy descriptions, or unrelated details.
- Do not invent programmes, teaching languages, or tuition fees.
- If reliable fee information is unavailable, write "Tuition fees need to be verified".
- Clearly label estimated tuition fees as estimates.


BUDGET EVALUATION:

- Use the exact budget range submitted by the student.
- Never invent a different budget.
- Consider tuition fees, accommodation, food, insurance, transport, and other essential expenses.
- Distinguish tuition fees from total annual expenses.
- Classify affordability as Affordable, Potentially Affordable, or Above Budget.
- Do not assume that the student will receive a scholarship.
- Explain when the total estimated cost may exceed the selected budget.
- If exact costs are unavailable, clearly label them as estimates.

ACADEMIC COMPATIBILITY:

- Match prerequisites to the student's selected education level and specialization.
- Explain relevant academic qualifications and subject requirements.
- Do not apply a universal GPA requirement to all countries or universities.
- Do not invent GPA conversions or claim that the student is eligible without sufficient information.
- Mention entrance exams only when relevant to the destination and program.
- Identify missing academic information that could affect admission.

LANGUAGE REQUIREMENTS:

- Distinguish between English-taught and local-language programs.
- Mention IELTS, TOEFL, PTE, or other language tests only when relevant.
- Provide indicative scores only when appropriate.
- Explain that exact language requirements vary by university and program.
- Never assume that a language test is automatically waived.

STUDENT VISA INFORMATION:

Use the appropriate visa or study permit category for the selected country.

Examples:
- Germany: National Visa for study (Type D), where applicable.
- France: Long-stay student visa (VLS-TS), where applicable.
- United Kingdom: Student visa.
- Canada: Study permit.
- Australia: Student visa (Subclass 500).
- United States: F-1 student visa.

These are examples, not a complete list.

- Never mix visa requirements between countries.
- Do not guarantee visa approval or post-study work eligibility.
- Do not invent financial thresholds, processing times, or visa rights.
- Mention that immigration requirements can change.
- Recommend checking the relevant official government immigration website.

FIT LEVEL:

Choose exactly one:
- High Fit
- Moderate Fit
- Low Fit

High Fit:
The available profile information shows strong alignment with academic, financial, and destination preferences.

Moderate Fit:
The profile appears reasonably suitable, but important academic, financial, or admission details need verification.

Low Fit:
There are significant potential academic, financial, or program-related mismatches.

Do not assign High Fit without sufficient supporting information.

ACCURACY RULES:

- Never fabricate universities, programs, tuition fees, admission requirements, or immigration rules.
- Distinguish general guidance from verified information.
- Do not present estimates as guaranteed facts.
- If information is uncertain, explicitly say that official verification is required.
- Do not claim to have checked current official requirements unless you actually have reliable current information.

RESPONSE FORMAT:

Return ONLY valid JSON with exactly these six string fields:

{
  "matchedUniversity": "Relevant university recommendations and reasons for their suitability",
  "fitLevel": "High Fit, Moderate Fit, or Low Fit",
  "fitAssessment": "Overall compatibility, budget assessment, advantages, limitations, and uncertainties",
  "academicCheck": "Relevant academic prerequisites and qualifications to verify",
  "englishReq": "Relevant English or local-language requirements and indicative test scores",
  "visaRoute": "Appropriate student visa category and important verification guidance"
}


OUTPUT LENGTH AND CONTENT RULES:

1. matchedUniversity:
   - Recommend a maximum of 3 universities.
   - Include university name, relevant programme, teaching language,
     estimated annual tuition and a short reason for the match.
   - Maximum 3–4 lines per university.

2. fitLevel:
   - Return only High Fit, Moderate Fit, or Low Fit.


3. fitAssessment:
   - Maximum 2 short sentences.
   - Explain how well the selected education level, destination,
     specialization, and budget match.
   - Mention one key advantage and one limitation.
   - Do not repeat university recommendations or academic requirements.


4. academicCheck:
   - Maximum 2 short sentences.
   - Mention only the most relevant academic requirements.

5. englishReq:
   - Maximum 2 short sentences.
   - Mention relevant language tests and indicative requirements.

6. visaRoute:
   - Maximum 2 short sentences.
   - Mention the correct visa category and essential guidance.

GENERAL RULES:

- Use simple, student-friendly language.
- Use bullet points where appropriate.
- Avoid lengthy explanations and repeated information.
- Do not add information unrelated to the selected profile.
- Never recommend another country when a specific country is selected.
- Use only the four submitted profile values.
- Return concise, useful information rather than lengthy paragraphs.
- Return ONLY valid JSON with exactly the six required string fields.

`;

  const completion = await client().chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content:
          "You are Aeterna UniCompass's international education and study-abroad compatibility evaluator. Follow the student's submitted profile carefully, prioritize accuracy, avoid unsupported claims, and return only valid JSON matching the requested schema.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.3,
  });

  const response = completion.choices[0]?.message?.content;

  if (!response || typeof response !== "string") {
    throw new Error("Groq returned an empty profile evaluation");
  }

  return parseJson(response);
};

// Chat Types

export interface ChatHistoryItem {
  sender: "ai" | "user";
  text: string;
}

export interface StudentChatContext {
  education?: string;
  field?: string;
  budget?: string;
  destination?: string;
}

const cleanPlainText = (text: string): string => {
  return (
    text
      // Convert HTML line breaks into actual new lines
      .replace(/<br\s*\/?>/gi, "\n")

      // Remove other HTML tags
      .replace(/<[^>]*>/g, "")

      // Remove Markdown code fences and backticks
      .replace(/```[\w]*\n?/g, "")
      .replace(/```/g, "")
      .replace(/`/g, "")

      // Remove Markdown headings
      .replace(/^\s{0,3}#{1,6}\s*/gm, "")

      // Remove bold and italic formatting
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/__(.*?)__/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/_(.*?)_/g, "$1")

      // Remove Markdown table separator rows
      .replace(/^\s*\|?[\s:-]+\|[\s|:-]*$/gm, "")

      // Convert table column separators into readable separators
      .replace(/\s*\|\s*/g, " : ")

      // Convert Markdown links into readable text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")

      // Remove excessive blank lines
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
};

// Generate Chat Reply

export const generateChatReply = async (
  message: string,
  filters?: StudentChatContext,
  history: ChatHistoryItem[] = [],
): Promise<string> => {
  const previous = history.slice(-10).map((item) => ({
    role: item.sender === "ai" ? ("assistant" as const) : ("user" as const),
    content: item.text,
  }));

  const completion = await client().chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content: `
You are Aeterna UniCompass, a friendly and professional study-abroad AI advisor.

STUDENT PROFILE:
${JSON.stringify(filters ?? {})}

YOUR COMMUNICATION STYLE:
- Respond naturally and professionally.
- Use simple, student-friendly English.
- Answer the exact question asked.
- Keep answers short, clear, and well-organized.
- Avoid lengthy paragraphs, huge tables, and unnecessary details.
- Never use HTML tags such as <br>.
- Use Markdown headings and bullet points only when helpful.

RESPONSE LENGTH:
- Greetings: 1–2 sentences.
- General questions: 3–6 short bullet points.
- Country or course information: concise sections with essential details.
- Give detailed explanations only when the student requests them.

STUDY ABROAD GUIDANCE:
When relevant, cover:
1. Suitable programmes and universities.
2. Admission requirements.
3. Estimated tuition and living costs.
4. Language requirements.
5. Student visa information.

PROFILE PERSONALIZATION:
- Use the student's available filters when relevant.
- Respect their selected education level, destination, field, and budget.
- Do not assume information they have not provided.
- Do not recommend unrelated countries or courses.

ACCURACY:
- Never invent universities, fees, scholarships, or admission requirements.
- Clearly label estimates.
- Do not present outdated exams or visa rules as current.
- Recommend official university and government sources for changing information.
- If unsure, say so honestly.

IMPORTANT:
- Do not repeat an entire study-abroad guide for every question.
- Ask one relevant follow-up question when necessary.
- Keep the conversation friendly and engaging.
`,
      },

      ...previous,
      {
        role: "user",
        content: message,
      },
    ],
    temperature: 0.5,
  });

  const reply = completion.choices[0]?.message?.content;

  return typeof reply === "string" && reply.trim()
    ? cleanPlainText(reply)
    : "Sorry, I could not generate a response.";
};

// GlobalPath Preview Types

export interface GlobalPathInput {
  education: string;
  field: string;
  budget: string;
  destination: string;
}

export interface GlobalPathPreview {
  searchProfile: string;
  academicFit: string;
  trueCostPlanner: string;
  intakeDeadline: string;
  scholarshipDiscovery: string;
  nextSteps: string;
}

const destinationCurrencies: Record<string, string> = {
  Germany: "EUR",
  France: "EUR",
  Italy: "EUR",
  Spain: "EUR",
  Netherlands: "EUR",
  Ireland: "EUR",
  Portugal: "EUR",
  Austria: "EUR",
  Finland: "EUR",
  Belgium: "EUR",

  "United Kingdom": "GBP",
  UK: "GBP",

  Australia: "AUD",
  Canada: "CAD",
  "United States": "USD",
  USA: "USD",
  Japan: "JPY",
  "New Zealand": "NZD",
  Switzerland: "CHF",
  Sweden: "SEK",
  Denmark: "DKK",
  Norway: "NOK",
  Poland: "PLN",
  Singapore: "SGD",
  UAE: "AED",
};

// Generate GlobalPath Preview

interface GlobalPathCostBreakdown {
  tuition: number | null;
  accommodation: number | null;
  livingExpenses: number | null;
  healthInsurance: number | null;
  otherExpenses: number | null;
}

interface GlobalPathAiResponse {
  searchProfile: string;
  academicFit: string;
  intakeDeadline: string;
  scholarshipDiscovery: string;
  nextSteps: string;
  costBreakdown: GlobalPathCostBreakdown;
}

interface FrankfurterRate {
  date: string;
  base: string;
  quote: string;
  rate: number;
}

const getInrExchangeRate = async (
  currency: string,
): Promise<{ rate: number; date: string }> => {
  if (currency === "INR") {
    return { rate: 1, date: "Not applicable" };
  }

  const response = await fetch(
    `https://api.frankfurter.dev/v2/rates?base=${encodeURIComponent(currency)}&quotes=INR`,
  );

  if (!response.ok) {
    throw new Error(`Frankfurter API error: ${response.status}`);
  }

  const data: FrankfurterRate[] = await response.json();

  const inrRate = data.find((item) => item.quote === "INR");

  if (!inrRate || !Number.isFinite(inrRate.rate) || inrRate.rate <= 0) {
    throw new Error(`INR exchange rate unavailable for ${currency}`);
  }

  return {
    rate: inrRate.rate,
    date: inrRate.date,
  };
};

const formatINR = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const generateGlobalPathPreview = async (
  filters: GlobalPathInput,
): Promise<GlobalPathPreview> => {
  const destinationKey = filters.destination.trim().toLowerCase();

  const currencyEntry = Object.entries(destinationCurrencies).find(
    ([country]) => country.toLowerCase() === destinationKey,
  );

  if (!currencyEntry) {
    throw new Error(
      `Currency mapping not available for ${filters.destination}`,
    );
  }

  const destinationCurrency = currencyEntry[1];

  const prompt = `
You are Aeterna UniCompass, an international education advisor.

STUDENT PROFILE:
Education: ${filters.education}
Field: ${filters.field}
Annual Budget: ${filters.budget}
Destination: ${filters.destination}

Generate personalized guidance for all six GlobalPath cards.

COST BREAKDOWN:

Generate approximate annual planning estimates in ${destinationCurrency}.

Provide separate numeric amounts for:
- tuition
- accommodation
- livingExpenses
- healthInsurance
- otherExpenses

IMPORTANT COST RULES:
- All five amounts must be numbers or null.
- Use the destination's currency: ${destinationCurrency}.
- Do not return INR amounts.
- Do not invent exact university fees.
- These are broad annual planning estimates, not verified university quotations.
- If a cost cannot be reliably estimated, return null.
- Never return 0 just because information is unavailable.
- Return 0 only when the expense is genuinely zero.
- Do not use negative amounts.
- Do not include currency symbols in numeric values.

OTHER CARDS:

1. searchProfile:
Summarize the student's selected profile accurately.

2. academicFit:
Explain relevant academic qualifications and prerequisites.
Do not assume grades or eligibility.

3. intakeDeadline:
Explain how to identify relevant university intakes and deadlines.
Do not invent current dates.

4. scholarshipDiscovery:
Explain relevant scholarship opportunities and eligibility factors.
Do not invent scholarship amounts or deadlines.

5. nextSteps:
Provide practical next steps based on the student's profile.

ACCURACY RULES:
- Respect all four selected filters.
- Never change the selected destination.
- Do not invent university names, fees, deadlines, or scholarships.
- Use simple, student-friendly language.
- Keep each card concise.

Return ONLY valid JSON with exactly these fields:

{
  "searchProfile": "",
  "academicFit": "",
  "costBreakdown": {
    "tuition": null,
    "accommodation": null,
    "livingExpenses": null,
    "healthInsurance": null,
    "otherExpenses": null
  },
  "intakeDeadline": "",
  "scholarshipDiscovery": "",
  "nextSteps": ""
}
`;

  const completion = await client().chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content:
          "You are Aeterna UniCompass's study-abroad guidance assistant. Follow the requested JSON schema and never present estimates as verified facts.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.3,
  });

  const response = completion.choices[0]?.message?.content;

  if (!response || typeof response !== "string") {
    throw new Error("Groq returned an empty GlobalPath preview");
  }

  const cleaned = response
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start < 0 || end < start) {
    throw new Error("Groq returned invalid GlobalPath JSON");
  }

  const aiData = JSON.parse(
    cleaned.slice(start, end + 1),
  ) as GlobalPathAiResponse;

  const costs = aiData.costBreakdown;

  if (!costs || typeof costs !== "object") {
    throw new Error("Groq returned an invalid cost breakdown");
  }

  const costValues = [
    costs?.tuition,
    costs?.accommodation,
    costs?.livingExpenses,
    costs?.healthInsurance,
    costs?.otherExpenses,
  ];

  if (
    costValues.some(
      (amount) =>
        amount !== null &&
        (typeof amount !== "number" || !Number.isFinite(amount) || amount < 0),
    )
  ) {
    throw new Error("Groq returned invalid cost estimates");
  }

  // Fetch the actual reference exchange rate.
  const exchange = await getInrExchangeRate(destinationCurrency);


  // Convert each expense into INR.
  const convertToINR = (amount: number | null): number | null => {
    if (amount === null) return null;

    return Math.round(amount * exchange.rate);
  };

  const formatCost = (amount: number | null): string => {
    if (amount === null) return "Not available";

    return formatINR(amount);
  };

  const tuition = convertToINR(costs.tuition);
  const accommodation = convertToINR(costs.accommodation);
  const livingExpenses = convertToINR(costs.livingExpenses);
  const healthInsurance = convertToINR(costs.healthInsurance);
  const otherExpenses = convertToINR(costs.otherExpenses);

  const allCostsAvailable = [
    tuition,
    accommodation,
    livingExpenses,
    healthInsurance,
    otherExpenses,
  ].every((amount) => amount !== null);

  const total = allCostsAvailable
    ? [
        tuition,
        accommodation,
        livingExpenses,
        healthInsurance,
        otherExpenses,
      ].reduce<number>((sum, amount) => sum + (amount ?? 0), 0)
    : null;

  const trueCostPlanner = [
    `Tuition: ${formatCost(tuition)}`,
    `Accommodation: ${formatCost(accommodation)}`,
    `Living expenses: ${formatCost(livingExpenses)}`,
    `Health insurance: ${formatCost(healthInsurance)}`,
    `Other expenses: ${formatCost(otherExpenses)}`,
    `Total estimated cost: ${formatCost(total)}`,
    `Original currency: ${destinationCurrency}`,
    `Exchange rate: 1 ${destinationCurrency} = ${exchange.rate} INR`,
    `Exchange rate date: ${exchange.date}`,
    "All available expenses are approximate planning estimates, not verified university fees.",
  ].join(" | ");

  return {
    searchProfile: aiData.searchProfile,
    academicFit: aiData.academicFit,
    trueCostPlanner,
    intakeDeadline: aiData.intakeDeadline,
    scholarshipDiscovery: aiData.scholarshipDiscovery,
    nextSteps: aiData.nextSteps,
  };
};
