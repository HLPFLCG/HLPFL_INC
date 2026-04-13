/**
 * Web3Forms — Free contact-form submission handler.
 *
 * How it works:
 *  1. Sign up at https://web3forms.com/ (free, no credit card).
 *  2. You receive an access key tied to your email.
 *  3. Set the NEXT_PUBLIC_WEB3FORMS_KEY environment variable, or
 *     replace the fallback below with your key.
 *  4. Every form submission is emailed to you — no backend needed.
 *
 * Docs: https://docs.web3forms.com/
 */

const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "YOUR_ACCESS_KEY_HERE";

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export interface Web3FormsPayload {
  [key: string]: string;
}

export interface Web3FormsResult {
  success: boolean;
  message: string;
}

/**
 * Submit a form to Web3Forms.
 * Returns { success, message }.
 */
export async function submitForm(
  data: Web3FormsPayload
): Promise<Web3FormsResult> {
  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New inquiry from ${data.businessName || data.yourName || "Website"}`,
        from_name: "HLPFL Contact Form",
        ...data,
      }),
    });

    const result = await response.json();

    return {
      success: result.success === true,
      message: result.message || "Something went wrong.",
    };
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[web3forms] submission failed:", err);
    }
    return {
      success: false,
      message: "Network error. Please try WhatsApp instead.",
    };
  }
}
