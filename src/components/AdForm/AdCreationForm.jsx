import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import CampaignNameField from "./CampaignNameField";
import ObjectiveField from "./ObjectiveField";
import AdTextField from "./AdTextField";
import CTAField from "./CTAField";
import MusicSelection from "./MusicSelection";
import ErrorBanner from "../UI/ErrorBanner";
import { mockSubmitAd } from "../../services/mockApi";

const AdCreationForm = ({ accessToken }) => {
  const [systemError, setSystemError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      campaignName: "",
      objective: "",
      adText: "",
      cta: "",
      musicOption: "none",
      musicId: "",
      customMusic: null,
    },
  });

  const selectedObjective = watch("objective");
  const selectedMusicOption = watch("musicOption");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSystemError(null);

    try {
      // Validate music selection based on objective
      if (
        selectedObjective === "conversions" &&
        selectedMusicOption === "none"
      ) {
        toast.error("Music is required for Conversion campaigns");
        setIsSubmitting(false);
        return;
      }

      const result = await mockSubmitAd(data, accessToken);

      if (result.success) {
        toast.success("Ad created successfully!");
        reset();
      } else {
        setSystemError(result.error);
      }
    } catch (error) {
      setSystemError({
        type: "api_error",
        message: "Failed to submit ad. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create TikTok Ad</h1>
        <p className="text-gray-600 mt-2">
          Fill in the details below to create your ad
        </p>
      </div>

      {systemError && (
        <ErrorBanner
          error={systemError}
          onDismiss={() => setSystemError(null)}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <CampaignNameField
          register={register}
          error={errors.campaignName}
          watch={watch}
        />

        <ObjectiveField
          register={register}
          error={errors.objective}
          watch={watch}
        />

        <AdTextField register={register} error={errors.adText} watch={watch} />

        <CTAField register={register} error={errors.cta} />

        <MusicSelection
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          selectedObjective={selectedObjective}
        />

        <div className="pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl hover:from-purple-700 hover:to-pink-600 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Creating Ad...
              </span>
            ) : (
              "Submit Ad for Review"
            )}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Your ad will go through TikTok's review process before going live
          </p>
        </div>
      </form>
    </div>
  );
};

export default AdCreationForm;
