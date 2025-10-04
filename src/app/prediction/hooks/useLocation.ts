import { useState } from "react";

export const useLocation = () => {
  const [location, setLocation] = useState<
    { latitude: number; longitude: number } | string | null
  >(null);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({
          latitude,
          longitude,
        });
        console.log("Latitude: ", latitude, "Longitude: ", longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
        setLocation("Location access denied.");
      }
    );
  };

  return { location, getLocation };
};
