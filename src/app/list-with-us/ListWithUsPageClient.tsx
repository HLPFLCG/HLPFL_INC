"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LOCATIONS = ["Cahuita", "Puerto Viejo", "Playa Cocles", "Punta Uva", "Manzanillo", "Talamanca / Other"];

export default function ListWithUsPageClient() {
  const { t } = useLanguage();
  const listWithUs = t("listWithUs");

  const [formState, setFormState] = useState({
    businessName: "",
    category: "",
    location: "",
    email: "",
    phone: "",
    description: "",
    website: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.businessName.trim()) newErrors.businessName = "Business name is required.";
    if (!formState.category) newErrors.category = "Please select a category.";
    if (!formState.location) newErrors.location = "Please select a location.";
    if (!formState.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email))
      newErrors.email = "A valid email address is required.";
    if (!formState.description.trim()) newErrors.description = "A short description is required.";
    if (formState.description.length > 200) newErrors.description = "Description must be 200 characters or less.";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    // Simulate async submission (client-side only)
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div
        className="py-20 px-4 text-center text-white"
        style={{ background: "linear-gradient(135deg, #0E9AA7 0%, #1B4332 100%)" }}
      >
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
          {listWithUs.pageTitle}
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto text-lg">
          {listWithUs.pageSubtitle}
        </p>
      </div>

      <div className="section bg-sandy-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="font-display text-2xl font-bold text-jungle mb-6">
                {listWithUs.formTitle}
              </h2>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-turquoise/10 flex items-center justify-center mx-auto mb-4">
                    <Check className="text-turquoise w-8 h-8" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-jungle mb-2">
                    {listWithUs.successTitle}
                  </h3>
                  <p className="text-gray-600">{listWithUs.successDesc}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Business Name */}
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-semibold text-dark mb-1">
                      {listWithUs.businessName} <span className="text-coral" aria-label="required">*</span>
                    </label>
                    <input
                      id="businessName"
                      name="businessName"
                      type="text"
                      value={formState.businessName}
                      onChange={handleChange}
                      className={`w-full border rounded-lg px-4 py-2.5 text-sm text-dark focus:outline-none focus:border-turquoise ${errors.businessName ? "border-coral" : "border-gray-200"}`}
                      aria-describedby={errors.businessName ? "businessName-error" : undefined}
                      aria-required="true"
                    />
                    {errors.businessName && (
                      <p id="businessName-error" className="text-coral text-xs mt-1" role="alert">{errors.businessName}</p>
                    )}
                  </div>

                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-semibold text-dark mb-1">
                      {listWithUs.category} <span className="text-coral" aria-label="required">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formState.category}
                      onChange={handleChange}
                      className={`w-full border rounded-lg px-4 py-2.5 text-sm text-dark bg-white focus:outline-none focus:border-turquoise ${errors.category ? "border-coral" : "border-gray-200"}`}
                      aria-required="true"
                    >
                      <option value="">— Select —</option>
                      {listWithUs.categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-coral text-xs mt-1" role="alert">{errors.category}</p>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <label htmlFor="location" className="block text-sm font-semibold text-dark mb-1">
                      {listWithUs.locationLabel} <span className="text-coral" aria-label="required">*</span>
                    </label>
                    <select
                      id="location"
                      name="location"
                      value={formState.location}
                      onChange={handleChange}
                      className={`w-full border rounded-lg px-4 py-2.5 text-sm text-dark bg-white focus:outline-none focus:border-turquoise ${errors.location ? "border-coral" : "border-gray-200"}`}
                      aria-required="true"
                    >
                      <option value="">— Select —</option>
                      {LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                    {errors.location && (
                      <p className="text-coral text-xs mt-1" role="alert">{errors.location}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-dark mb-1">
                      {listWithUs.email} <span className="text-coral" aria-label="required">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      className={`w-full border rounded-lg px-4 py-2.5 text-sm text-dark focus:outline-none focus:border-turquoise ${errors.email ? "border-coral" : "border-gray-200"}`}
                      aria-required="true"
                    />
                    {errors.email && (
                      <p className="text-coral text-xs mt-1" role="alert">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-dark mb-1">
                      {listWithUs.phone}
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-dark focus:outline-none focus:border-turquoise"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-dark mb-1">
                      {listWithUs.description} <span className="text-coral" aria-label="required">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formState.description}
                      onChange={handleChange}
                      rows={4}
                      maxLength={200}
                      placeholder={listWithUs.descriptionPlaceholder}
                      className={`w-full border rounded-lg px-4 py-2.5 text-sm text-dark focus:outline-none focus:border-turquoise resize-none ${errors.description ? "border-coral" : "border-gray-200"}`}
                      aria-required="true"
                    />
                    <div className="flex justify-between">
                      {errors.description && (
                        <p className="text-coral text-xs mt-1" role="alert">{errors.description}</p>
                      )}
                      <p className="text-gray-400 text-xs ml-auto mt-1">
                        {formState.description.length}/200
                      </p>
                    </div>
                  </div>

                  {/* Website */}
                  <div>
                    <label htmlFor="website" className="block text-sm font-semibold text-dark mb-1">
                      {listWithUs.website}
                    </label>
                    <input
                      id="website"
                      name="website"
                      type="url"
                      value={formState.website}
                      onChange={handleChange}
                      placeholder="https://"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-dark focus:outline-none focus:border-turquoise"
                    />
                  </div>

                  {/* Logo upload placeholder */}
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1">
                      {listWithUs.logoPhoto}
                    </label>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center text-gray-400 text-sm">
                      <p>{listWithUs.logoPhotoDesc}</p>
                      <p className="text-xs mt-1 text-gray-300">(Upload functionality coming soon)</p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full py-3 text-base disabled:opacity-60"
                  >
                    {submitting ? listWithUs.submitting : listWithUs.submit}
                  </button>
                </form>
              )}
            </div>

            {/* Pricing Tiers */}
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold text-jungle">
                {listWithUs.pricingTitle}
              </h2>

              {/* Free tier */}
              <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-xl font-bold text-jungle">
                    {listWithUs.pricingFreeTitle}
                  </h3>
                  <span className="bg-turquoise/10 text-turquoise font-bold text-lg px-3 py-1 rounded-lg">
                    Free
                  </span>
                </div>
                <ul className="space-y-3">
                  {listWithUs.pricingFreeFeatures.map((feat) => (
                    <li key={feat} className="flex gap-2 text-gray-600 text-sm">
                      <Check size={16} className="text-turquoise shrink-0 mt-0.5" aria-hidden="true" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Featured tier */}
              <div className="bg-jungle rounded-2xl shadow-lg border-2 border-turquoise p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-xl font-bold text-sandy">
                    {listWithUs.pricingFeaturedTitle}
                  </h3>
                  <span className="bg-turquoise text-white font-bold text-lg px-3 py-1 rounded-lg">
                    {listWithUs.pricingFeaturedPrice}
                  </span>
                </div>
                <ul className="space-y-3">
                  {listWithUs.pricingFeaturedFeatures.map((feat) => (
                    <li key={feat} className="flex gap-2 text-white/80 text-sm">
                      <Check size={16} className="text-turquoise-light shrink-0 mt-0.5" aria-hidden="true" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
