// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const onView = (url: string) => {
  // @ts-ignore
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
// @ts-ignore
export const event = ({ action, category, label, value }) => {
  // @ts-ignore
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};