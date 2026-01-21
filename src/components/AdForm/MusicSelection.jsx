import React, { useState } from "react";
import { Music, Upload, Ban, Check, X, AlertCircle } from "lucide-react";
import { validateMusicId } from "../../services/mockApi";
import toast from "react-hot-toast";
import { ERROR_MESSAGES } from "../../utils/errorMessages";

const MusicSelection = ({
  register,
  errors,
  watch,
  setValue,
  selectedObjective,
}) => {
  const [validatingMusicId, setValidatingMusicId] = useState(false);
  const [musicIdStatus, setMusicIdStatus] = useState(null);
  const selectedMusicOption = watch("musicOption");
  const musicIdValue = watch("musicId");

  // Handle music option selection
  const handleMusicOptionSelect = (option) => {
    setValue("musicOption", option, { shouldValidate: true });
    setMusicIdStatus(null);

    // Clear music ID if not using existing music
    if (option !== "existing") {
      setValue("musicId", "");
    }
  };

  // Validate existing music ID
  const handleValidateMusicId = async () => {
    if (!musicIdValue || musicIdValue.trim().length < 5) {
      toast.error("Please enter a valid Music ID (at least 5 characters)");
      return;
    }

    setValidatingMusicId(true);

    try {
      const isValid = await validateMusicId(musicIdValue);

      if (isValid) {
        setMusicIdStatus({
          type: "valid",
          message: "Music ID is valid and ready to use",
        });
        toast.success("Music ID validated successfully!");
      } else {
        setMusicIdStatus({
          type: "invalid",
          message: ERROR_MESSAGES.music.invalid_id,
        });
        toast.error("Invalid Music ID. Please check and try again.");
      }
    } catch (error) {
      toast.error("Failed to validate Music ID");
    } finally {
      setValidatingMusicId(false);
    }
  };

  // Handle custom music upload simulation
  const handleUploadCustomMusic = () => {
    // Create a file input element
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "audio/*";

    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          toast.error("File size must be less than 10MB");
          return;
        }

        // Generate mock music ID
        const mockMusicId = `custom_${Date.now()}`;
        setValue("musicId", mockMusicId);
        setValue("musicOption", "custom", { shouldValidate: true });

        toast.success(`Custom music uploaded! Mock ID: ${mockMusicId}`);

        setMusicIdStatus({
          type: "custom",
          message: `Uploaded: ${file.name}`,
          fileName: file.name,
        });
      }
    };

    fileInput.click();
  };

  // Render status indicator
  const renderStatus = () => {
    if (!musicIdStatus) return null;

    if (musicIdStatus.type === "valid") {
      return (
        <div className="flex items-center gap-2 text-green-600 mt-2">
          <Check className="w-5 h-5" />
          <span className="text-sm">{musicIdStatus.message}</span>
        </div>
      );
    }

    if (musicIdStatus.type === "invalid") {
      return (
        <div className="flex items-center gap-2 text-red-600 mt-2">
          <X className="w-5 h-5" />
          <span className="text-sm">{musicIdStatus.message}</span>
        </div>
      );
    }

    if (musicIdStatus.type === "custom") {
      return (
        <div className="flex items-center gap-2 text-purple-600 mt-2">
          <Upload className="w-5 h-5" />
          <span className="text-sm">{musicIdStatus.message}</span>
        </div>
      );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Music Selection
        </h3>
        <p className="text-gray-600 mb-4">
          Choose how you want to add music to your TikTok ad
        </p>
      </div>

      {/* Option 1: Existing Music ID */}
      <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
        <div className="flex items-center gap-3">
          <input
            type="radio"
            id="music-existing"
            {...register("musicOption")}
            value="existing"
            className="h-5 w-5 text-purple-600 focus:ring-purple-500"
            checked={selectedMusicOption === "existing"}
            onChange={() => handleMusicOptionSelect("existing")}
          />
          <label htmlFor="music-existing" className="flex-1 cursor-pointer">
            <div className="flex items-center gap-2">
              <Music className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-gray-900">
                Use Existing Music ID
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Enter a TikTok Music ID from the library
            </p>
          </label>
        </div>

        {selectedMusicOption === "existing" && (
          <div className="mt-4 space-y-3 animate-fade-in">
            <div>
              <input
                type="text"
                placeholder="Enter TikTok Music ID (e.g., 123456789)"
                {...register("musicId", {
                  required: "Music ID is required for existing music",
                  minLength: {
                    value: 5,
                    message: "Music ID must be at least 5 characters",
                  },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {errors.musicId && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.musicId.message}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleValidateMusicId}
              disabled={validatingMusicId || !musicIdValue}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {validatingMusicId ? "Validating..." : "Validate Music ID"}
            </button>

            {renderStatus()}
          </div>
        )}
      </div>

      {/* Option 2: Upload Custom Music */}
      <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
        <div className="flex items-center gap-3">
          <input
            type="radio"
            id="music-custom"
            {...register("musicOption")}
            value="custom"
            className="h-5 w-5 text-purple-600 focus:ring-purple-500"
            checked={selectedMusicOption === "custom"}
            onChange={() => handleMusicOptionSelect("custom")}
          />
          <label htmlFor="music-custom" className="flex-1 cursor-pointer">
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-gray-900">
                Upload Custom Music
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Upload your own audio file
            </p>
          </label>
        </div>

        {selectedMusicOption === "custom" && (
          <div className="mt-4 animate-fade-in">
            <button
              type="button"
              onClick={handleUploadCustomMusic}
              className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors flex flex-col items-center justify-center gap-2"
            >
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="text-gray-700 font-medium">
                Click to upload audio file
              </span>
              <span className="text-sm text-gray-500">
                MP3, WAV, AAC up to 10MB
              </span>
            </button>

            {musicIdStatus?.type === "custom" && (
              <div className="mt-3 p-3 bg-green-50 rounded-lg">
                <p className="text-green-800 text-sm">
                  Custom music uploaded! Mock ID:{" "}
                  <span className="font-mono">{musicIdValue}</span>
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Option 3: No Music */}
      <div
        className={`border border-gray-200 rounded-lg p-4 transition-colors ${
          selectedObjective === "conversions"
            ? "bg-gray-50 opacity-70"
            : "hover:border-purple-300"
        }`}
      >
        <div className="flex items-center gap-3">
          <input
            type="radio"
            id="music-none"
            {...register("musicOption", {
              validate: (value) => {
                if (value === "none" && selectedObjective === "conversions") {
                  return ERROR_MESSAGES.music.required_for_conversions;
                }
                return true;
              },
            })}
            value="none"
            className="h-5 w-5 text-purple-600 focus:ring-purple-500"
            checked={selectedMusicOption === "none"}
            onChange={() => {
              if (selectedObjective !== "conversions") {
                handleMusicOptionSelect("none");
              }
            }}
            disabled={selectedObjective === "conversions"}
          />
          <label
            htmlFor="music-none"
            className={`flex-1 ${selectedObjective === "conversions" ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ban
                  className={`w-5 h-5 ${
                    selectedObjective === "conversions"
                      ? "text-gray-400"
                      : "text-purple-600"
                  }`}
                />
                <span
                  className={`font-medium ${
                    selectedObjective === "conversions"
                      ? "text-gray-500"
                      : "text-gray-900"
                  }`}
                >
                  Create Ad Without Music
                </span>
              </div>
              {selectedObjective === "conversions" && (
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                  Not Allowed
                </span>
              )}
            </div>
            <p
              className={`text-sm mt-1 ${
                selectedObjective === "conversions"
                  ? "text-gray-400"
                  : "text-gray-600"
              }`}
            >
              {selectedObjective === "conversions"
                ? "Music is required for Conversion campaigns"
                : "Run your ad without background music"}
            </p>
          </label>
        </div>
      </div>

      {/* Error message for music option */}
      {errors.musicOption && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-600">{errors.musicOption.message}</p>
          </div>
        </div>
      )}

      {/* Help text based on objective */}
      {selectedObjective && (
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong>{" "}
            {selectedObjective === "traffic"
              ? "Music is optional for Traffic campaigns but recommended for better engagement."
              : "Music is required for Conversion campaigns to maximize performance."}
          </p>
        </div>
      )}
    </div>
  );
};

export default MusicSelection;
