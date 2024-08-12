import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getOTP, verifyOtp, passwordChanged } from "../redux/actions/userActions";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOtpValid, setIsOtpValid] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loadingSendOtp, setLoadingSendOtp] = useState(false);
  const [loadingVerifyOtp, setLoadingVerifyOtp] = useState(false);
  const [loadingSubmitPassword, setLoadingSubmitPassword] = useState(false);

  const dispatch = useDispatch();
  const { validEmail } = useSelector((state) => state.custom3);
  const { validOtp } = useSelector((state) => state.custom4);

  const sendOtp = async () => {
    setLoadingSendOtp(true);
    try {
      await dispatch(getOTP({ email }));
    } catch (error) {
      console.error("Failed to send OTP:", error);
      alert("Failed to send OTP.");
    } finally {
      setLoadingSendOtp(false);
    }
  };

  const verifyOtpCode = async () => {
    setLoadingVerifyOtp(true);
    try {
      await dispatch(verifyOtp({ email, otp }));
    } catch (error) {
      console.error("Failed to verify OTP:", error);
      alert("Failed to verify OTP.");
    } finally {
      setLoadingVerifyOtp(false);
    }
  };

  useEffect(() => {
    setIsOtpValid(validOtp);
  }, [validOtp]);

  const submitPassword = async () => {
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoadingSubmitPassword(true);
    try {
      await dispatch(passwordChanged({ email, newPassword }));
    } catch (error) {
      console.error("Failed to change password:", error);
      alert("Failed to change password.");
    } finally {
      setLoadingSubmitPassword(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Forgot Password
          </h2>

          {!validEmail ? (
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Enter your email address:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button
                type="button"
                onClick={sendOtp}
                className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                disabled={loadingSendOtp}
              >
                {loadingSendOtp ? "Sending..." : "Get OTP"}
              </button>
            </div>
          ) : (
            <div>
              {!isOtpValid ? (
                <div className="mb-4">
                  <label htmlFor="otp" className="block text-gray-700 mb-3">
                    OTP has been sent to your email address.
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <button
                    type="button"
                    onClick={verifyOtpCode}
                    className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    disabled={loadingVerifyOtp}
                  >
                    {loadingVerifyOtp ? "Verifying..." : "Verify OTP"}
                  </button>
                </div>
              ) : (
                <div>
                  <div className="mb-4 relative">
                    <label htmlFor="newPassword" className="block text-gray-700 mb-2">
                      New Password:
                    </label>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full p-2 border border-gray-300 rounded pr-10"
                    />
                  
                    <span
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className=" absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      style={{ paddingTop: '30px' }}
                    >
                      <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                    </span>
                  </div>
                  <div className="mb-4 relative">
                    <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
                      Confirm Password:
                    </label>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full p-2 border border-gray-300 rounded pr-10"
                    />
                    <span
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      style={{ paddingTop: '30px' }}
                    >
                      <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={submitPassword}
                    className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    disabled={loadingSubmitPassword}
                  >
                    {loadingSubmitPassword ? "Submitting..." : "Submit Password"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}

export default ForgotPassword;
