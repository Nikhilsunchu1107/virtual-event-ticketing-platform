const REFERRAL_KEY = 'referral_source';

export const setReferralSource = () => {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get('ref') || params.get('utm_source') || params.get('utm_medium') || params.get('utm_campaign');
  
  if (ref) {
    localStorage.setItem(REFERRAL_KEY, ref);
  }
};

export const getReferralSource = () => {
  return localStorage.getItem(REFERRAL_KEY);
};

export const clearReferralSource = () => {
  localStorage.removeItem(REFERRAL_KEY);
};

export const getReferralForAPI = () => {
  return getReferralSource() || 'direct';
};