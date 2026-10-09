import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { BusinessSidebar } from '../../components/dashboard/BusinessSidebar';
import { Button } from '../../components/common/Button';
import { Building2, Save, CheckCircle2, Globe, MapPin } from 'lucide-react';

export const BusinessProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const { getBusinessProfile, updateBusinessProfile } = useData();
  const { success } = useToast();

  const profile = currentUser ? getBusinessProfile(currentUser.id) : undefined;

  const [businessName, setBusinessName] = useState(profile?.businessName || '');
  const [tagline, setTagline] = useState(profile?.tagline || '');
  const [description, setDescription] = useState(profile?.description || '');
  const [industry, setIndustry] = useState(profile?.industry || '');
  const [website, setWebsite] = useState(profile?.website || '');
  const [location, setLocation] = useState(profile?.location || 'Delhi NCR');
  const [logo, setLogo] = useState(profile?.logo || '');

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setIsSaving(true);
    updateBusinessProfile(currentUser.id, {
      businessName: businessName.trim(),
      tagline: tagline.trim(),
      description: description.trim(),
      industry: industry.trim(),
      website: website.trim(),
      location: location.trim(),
      logo: logo.trim(),
    });

    setIsSaving(false);
    success('Company Profile Updated!', 'Your business profile has been updated.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 text-left">
        <BusinessSidebar />

        <div className="flex-1 space-y-6 min-w-0">
          <div>
            <h1 className="text-2xl font-black text-navy-800 tracking-tight">
              Company Profile
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Customize your startup branding visible on project listings and applicant pages.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-subtle space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
              <img
                src={logo || 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=256&q=80'}
                alt="Logo preview"
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 shadow-sm flex-shrink-0"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-navy-800">{businessName || 'Your Business Name'}</h3>
                  {profile?.verified && (
                    <span className="flex items-center gap-1 text-[10px] bg-highlight/20 text-highlight-hover px-2 py-0.5 rounded-full font-bold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Verified Startup</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">{tagline || 'Tagline / Short description'}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy-800 mb-1">Company / Brand Name</label>
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-800 mb-1">Industry / Sector</label>
                  <input
                    type="text"
                    required
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. D2C, Software, Fintech, EdTech"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-800 mb-1">Company Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Fast-moving D2C branding and modern consumer products"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-800 mb-1">About Company Description</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your startup missions, what you build, and why students love working with you..."
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-navy-800 mb-1">Website URL</label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yourstartup.in"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy-800 mb-1">Headquarters Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Cyber City, Gurugram, Haryana"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-800 mb-1">Company Logo Image URL</label>
                <input
                  type="url"
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-slate-800"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <Button
                type="submit"
                variant="accent"
                size="md"
                isLoading={isSaving}
                leftIcon={<Save className="w-4 h-4" />}
              >
                Save Company Profile
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
