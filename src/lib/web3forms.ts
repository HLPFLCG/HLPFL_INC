/**
 * Web3Forms — Free contact-form submission handler.
 *
 * How it works:
 *  1. Sign up at https://web3forms.com/ (free, no credit card).
 *  2. You receive an access key tied to your email.
 *  3. Replace the placeholder below with that key.
 *  4. Every form submission is emailed to you — no backend needed.
 *
 * Docs: https://docs.web3forms.com/
 */

export const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE"; // ← replace with your key from web3forms.com

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
  } catch {
    return {
      success: false,
      message: "Network error. Please try WhatsApp instead.",
    };
  }
}
