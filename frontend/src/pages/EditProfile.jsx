import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import ContentWrapper from "../components/contentWrapper";
import Loading from "../components/loading/Loading";
import ConfirmDialog from "../components/modal/ConfirmDialog";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser, faBriefcase, faLocationDot, faPhone, faLanguage,
  faImage, faPenNib, faArrowRight, faLock, faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Field = ({ label, type = "text", icon, placeholder, error, grid = "col-span-2", value, onChange }) => (
  <div className={`space-y-1.5 ${grid}`}>
    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">{label}</label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-[#327878] transition-colors">
        <FontAwesomeIcon icon={icon} size="xs" />
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-[#FBFCFC] border ${error ? "border-red-300" : "border-gray-100"} rounded-2xl pl-11 pr-4 py-3.5 text-[13px] focus:outline-none focus:border-[#327878] focus:bg-white transition-all`}
      />
    </div>
    {error && <p className="text-[9px] text-red-500 font-bold ml-1 uppercase">{error}</p>}
  </div>
);

export default function EditProfile() {
  const { user, token, refreshUser, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState({
    name: "", surname: "", position: "", description: "", phone: "",
    location: "", linkedin: "", facebook: "", instagram: "", languages: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/register");
      return;
    }
    if (user) {
      setForm({
        name: user.name ?? "",
        surname: user.surname ?? "",
        position: user.position ?? "",
        description: user.description ?? "",
        phone: user.phone ?? "",
        location: user.location ?? "",
        linkedin: user.linkedin ?? "",
        facebook: user.facebook ?? "",
        instagram: user.instagram ?? "",
        languages: (user.languages || []).join(", "),
      });
    }
  }, [user, token, navigate]);

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const saveProfileHandler = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("surname", form.surname);
    formData.append("position", form.position);
    formData.append("description", form.description);
    formData.append("phone", form.phone);
    formData.append("location", form.location);
    if (form.linkedin) formData.append("linkedin", form.linkedin);
    if (form.facebook) formData.append("facebook", form.facebook);
    if (form.instagram) formData.append("instagram", form.instagram);
    form.languages.split(",").map((l) => l.trim()).filter(Boolean).forEach((lang) => formData.append("languages", lang));
    if (avatarFile) formData.append("avatar", avatarFile);

    try {
      const result = await fetch(`${API_BASE_URL}/api/edit-user`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await result.json();

      if (!result.ok) {
        const errs = data.errors
          ? data.errors.reduce((acc, err) => ({ ...acc, [err.path || err.field || "general"]: err.msg }), {})
          : { general: data.message };
        setErrors(errs);
        toast.error(data.message || "Could not update profile.");
        return;
      }

      refreshUser(data.user);
      toast.success("Profile updated successfully.");
    } catch {
      toast.error("Server connection failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const changePasswordHandler = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!passwordForm.currentPassword) errs.currentPassword = "Current password is required.";
    if (!passwordForm.newPassword || passwordForm.newPassword.length < 6) errs.newPassword = "New password must be at least 6 characters.";
    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) errs.confirmNewPassword = "Passwords do not match.";

    if (Object.keys(errs).length > 0) {
      setPasswordErrors(errs);
      return;
    }

    setPasswordErrors({});
    setIsPasswordLoading(true);

    try {
      const result = await fetch(`${API_BASE_URL}/api/change-password`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });
      const data = await result.json();

      if (!result.ok) {
        setPasswordErrors({ general: data.message });
        toast.error(data.message || "Could not change password.");
        return;
      }

      setPasswordForm({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
      toast.success("Password changed successfully.");
    } catch {
      toast.error("Server connection failed.");
    } finally {
      setIsPasswordLoading(false);
    }
  };

  const deleteAccountHandler = async () => {
    if (!deletePassword) {
      setDeleteError("Password is required to confirm deletion.");
      return;
    }
    setIsDeleting(true);
    setDeleteError("");

    try {
      const result = await fetch(`${API_BASE_URL}/api/delete-user`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ password: deletePassword }),
      });
      const data = await result.json();

      if (!result.ok) {
        setDeleteError(data.message || "Could not delete account.");
        setIsDeleting(false);
        return;
      }

      toast.success("Account deleted. We're sorry to see you go.");
      logout();
      navigate("/");
    } catch {
      setDeleteError("Server connection failed.");
      setIsDeleting(false);
    }
  };

  if (!user) {
    return <div className="pt-40"><Loading loadingText="Loading profile" /></div>;
  }

  return (
    <section className="min-h-screen bg-[#FBFCFC] pt-32 pb-20">
      <ContentWrapper>
        <div className="max-w-4xl mx-auto space-y-10">

          <div className="text-center space-y-4 flex flex-col">
            <span className="bg-[#327878] mx-auto w-[180px] text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full">
              Account Settings
            </span>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Edit Profile</h1>
            <p className="text-gray-400 font-medium max-w-lg mx-auto">
              Update your public agent profile, contact details, and account security.
            </p>
          </div>

          <form onSubmit={saveProfileHandler} className="bg-white rounded-4xl p-8 md:p-10 border border-gray-100 shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-gray-50">
              <img
                src={avatarPreview || `${API_BASE_URL}/assets/${user.avatar}`}
                alt={user.name}
                className="w-24 h-24 rounded-3xl object-cover shadow-lg ring-2 ring-[#f0f5f5]"
              />
              <label className="flex items-center gap-3 bg-[#f0f7f7] border border-dashed border-[#327878]/30 rounded-2xl px-5 py-3.5 cursor-pointer hover:bg-[#e8f2f2] transition-colors">
                <FontAwesomeIcon icon={faImage} className="text-[#327878]" />
                <span className="text-[11px] font-bold text-[#327878]">Change profile picture...</span>
                <input type="file" accept="image/png,image/jpg,image/jpeg" className="hidden" onChange={handleAvatarChange} />
              </label>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              <Field label="First Name" icon={faUser} grid="col-span-1" value={form.name} onChange={set("name")} error={errors.name} />
              <Field label="Last Name" icon={faUser} grid="col-span-1" value={form.surname} onChange={set("surname")} error={errors.surname} />
              <Field label="Title / Position" icon={faBriefcase} value={form.position} onChange={set("position")} error={errors.position} />
              <Field label="Location" icon={faLocationDot} grid="col-span-1" value={form.location} onChange={set("location")} error={errors.location} />
              <Field label="Phone Number" icon={faPhone} grid="col-span-1" value={form.phone} onChange={set("phone")} error={errors.phone} />
              <Field label="Languages (comma separated)" icon={faLanguage} value={form.languages} onChange={set("languages")} />

              <div className="col-span-2 space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">About Profile</label>
                <div className="relative group">
                  <div className="absolute top-4 left-4 text-gray-300 group-focus-within:text-[#327878] transition-colors">
                    <FontAwesomeIcon icon={faPenNib} size="xs" />
                  </div>
                  <textarea
                    rows="3"
                    value={form.description}
                    onChange={set("description")}
                    className={`w-full bg-[#FBFCFC] border ${errors.description ? "border-red-300" : "border-gray-100"} rounded-2xl pl-11 pr-4 py-3.5 text-xs focus:outline-none focus:border-[#327878] transition-all resize-none`}
                  />
                </div>
                {errors.description && <p className="text-[9px] text-red-500 font-bold ml-1 uppercase">{errors.description}</p>}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-50">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-[#327878] block mb-4 text-center italic">Social Network Links</label>
              <div className="grid grid-cols-3 gap-4">
                <Field label="" icon={faLinkedinIn} grid="col-span-1" value={form.linkedin} onChange={set("linkedin")} error={errors.linkedin} placeholder="LinkedIn URL" />
                <Field label="" icon={faInstagram} grid="col-span-1" value={form.instagram} onChange={set("instagram")} placeholder="Instagram URL" />
                <Field label="" icon={faFacebookF} grid="col-span-1" value={form.facebook} onChange={set("facebook")} placeholder="Facebook URL" />
              </div>
            </div>

            {errors.general && (
              <div className="bg-red-50 p-4 rounded-xl text-red-600 text-[10px] font-black uppercase tracking-wider text-center">
                {errors.general}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#327878] transition-all flex items-center justify-center gap-3 group shadow-xl shadow-slate-200"
            >
              {isLoading ? <Loading /> : (
                <>
                  Save Changes
                  <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <form onSubmit={changePasswordHandler} className="bg-white rounded-4xl p-8 md:p-10 border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
              <div className="w-10 h-10 rounded-full bg-[#327878]/10 flex items-center justify-center text-[#327878]">
                <FontAwesomeIcon icon={faLock} />
              </div>
              <h3 className="font-black uppercase tracking-widest text-xs text-slate-800">Change Password</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Field
                label="Current Password" type="password" icon={faLock} grid="col-span-1"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))}
                error={passwordErrors.currentPassword}
              />
              <Field
                label="New Password" type="password" icon={faLock} grid="col-span-1"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))}
                error={passwordErrors.newPassword}
              />
              <Field
                label="Confirm New Password" type="password" icon={faLock} grid="col-span-1"
                value={passwordForm.confirmNewPassword}
                onChange={(e) => setPasswordForm((p) => ({ ...p, confirmNewPassword: e.target.value }))}
                error={passwordErrors.confirmNewPassword}
              />
            </div>

            {passwordErrors.general && (
              <div className="bg-red-50 p-4 rounded-xl text-red-600 text-[10px] font-black uppercase tracking-wider text-center">
                {passwordErrors.general}
              </div>
            )}

            <button
              type="submit"
              disabled={isPasswordLoading}
              className="bg-[#327878] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#286161] transition-all"
            >
              {isPasswordLoading ? "..." : "Update Password"}
            </button>
          </form>

          <div className="bg-white rounded-4xl p-8 md:p-10 border border-red-100 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                <FontAwesomeIcon icon={faTriangleExclamation} />
              </div>
              <h3 className="font-black uppercase tracking-widest text-xs text-red-500">Danger Zone</h3>
            </div>
            <p className="text-gray-400 text-sm font-medium">
              Deleting your account permanently removes your profile and all of your property listings. This cannot be undone.
            </p>
            <button
              onClick={() => setIsDeleteOpen(true)}
              className="bg-red-50 text-red-500 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
            >
              Delete Account
            </button>
          </div>

        </div>
      </ContentWrapper>

      <ConfirmDialog
        open={isDeleteOpen}
        title="Delete your account?"
        description="Enter your password to permanently delete your account and all of your listings. This cannot be undone."
        confirmLabel="Delete Account"
        isLoading={isDeleting}
        onConfirm={deleteAccountHandler}
        onCancel={() => { setIsDeleteOpen(false); setDeletePassword(""); setDeleteError(""); }}
      >
        <input
          type="password"
          value={deletePassword}
          onChange={(e) => setDeletePassword(e.target.value)}
          placeholder="Your password"
          className="w-full bg-[#FBFCFC] border border-gray-100 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-red-300 transition-all"
        />
        {deleteError && <p className="text-[10px] text-red-500 font-bold mt-2 uppercase">{deleteError}</p>}
      </ConfirmDialog>
    </section>
  );
}
