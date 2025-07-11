import React from 'react';
import Script from 'next/script';

const HubSpotWidget = ({ name, email }: { name?: string; email?: string }) => {
  const hubspotBaseUrl = "https://meetings-na3.hubspot.com/israfil?embed=true";

  const getUrlWithOptions = () => {
    let url = hubspotBaseUrl;
    const params: { [key: string]: string } = {};

    // --- THIS IS THE NEW NAME-SPLITTING LOGIC ---
    if (name) {
      const trimmedName = name.trim(); // Remove leading/trailing spaces
      const lastSpaceIndex = trimmedName.lastIndexOf(' ');

      if (lastSpaceIndex === -1) {
        // Handles single-word names like "Cher"
        params.firstname = trimmedName;
      } else {
        // Handles multi-word names like "Mary Anne Jones"
        // Everything before the last space is the first name
        params.firstname = trimmedName.substring(0, lastSpaceIndex);
        // Everything after the last space is the last name
        params.lastname = trimmedName.substring(lastSpaceIndex + 1);
      }
    }

    if (email) params.email = email;

    const query = new URLSearchParams(params).toString();

    if (query) {
      url = `${url}&${query}`;
    }
    
    return url;
  };

  return (
    <>
      <div
        className="meetings-iframe-container"
        data-src={getUrlWithOptions()}
      ></div>
      <Script
        id="hubspot-meetings-script"
        strategy="afterInteractive"
        type="text/javascript"
        src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
      />
    </>
  );
};

export default HubSpotWidget;