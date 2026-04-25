import Constants from "expo-constants";
import { Driver, MarkerData } from "@/types/type";

const directionsAPI =
  process.env.EXPO_PUBLIC_GOOGLE_API_KEY ||
  Constants.expoConfig?.extra?.EXPO_PUBLIC_GOOGLE_API_KEY;

export const generateMarkersFromData = ({
  data,
  userLatitude,
  userLongitude,
}: {
  data: Driver[];
  userLatitude: number;
  userLongitude: number;
}): MarkerData[] => {
  return data.map((driver) => {
    const latOffset = (Math.random() - 0.5) * 0.01; // Random offset between -0.005 and 0.005
    const lngOffset = (Math.random() - 0.5) * 0.01; // Random offset between -0.005 and 0.005

    return {
      latitude: userLatitude + latOffset,
      longitude: userLongitude + lngOffset,
      title: `${driver.first_name} ${driver.last_name}`,
      ...driver,
    };
  });
};

export const calculateRegion = ({
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude?: number | null;
  destinationLongitude?: number | null;
}) => {
  if (userLatitude == null || userLongitude == null) {
    return {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  if (destinationLatitude == null || destinationLongitude == null) {
    return {
      latitude: userLatitude,
      longitude: userLongitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  const minLat = Math.min(userLatitude, destinationLatitude);
  const maxLat = Math.max(userLatitude, destinationLatitude);
  const minLng = Math.min(userLongitude, destinationLongitude);
  const maxLng = Math.max(userLongitude, destinationLongitude);

  const latitudeDelta = Math.max((maxLat - minLat) * 1.3, 0.01); // Adding some padding and a minimum delta
  const longitudeDelta = Math.max((maxLng - minLng) * 1.3, 0.01); // Adding some padding and a minimum delta

  const latitude = (userLatitude + destinationLatitude) / 2;
  const longitude = (userLongitude + destinationLongitude) / 2;

  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  };
};

const getRouteDuration = (data: any) => {
  if (!data) {
    throw new Error("Directions API returned no data.");
  }

  if (data.status === "ZERO_RESULTS") {
    return 0; // Handle zero results gracefully
  }

  if (data.status !== "OK") {
    const status = data?.status || "NO_STATUS";
    const errorMessage = data?.error_message || data?.errorMessage || "unknown error";
    throw new Error(
      `Directions API returned invalid route data: ${status} - ${errorMessage}`,
    );
  }

  if (
    !Array.isArray(data.routes) ||
    !data.routes[0] ||
    !Array.isArray(data.routes[0].legs) ||
    !data.routes[0].legs[0] ||
    !data.routes[0].legs[0].duration ||
    typeof data.routes[0].legs[0].duration.value !== "number"
  ) {
    throw new Error("Directions API returned invalid route data.");
  }

  return data.routes[0].legs[0].duration.value;
};

export const calculateDriverTimes = async ({
  markers,
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  markers: MarkerData[];
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
}) => {
  if (
    !userLatitude ||
    !userLongitude ||
    !destinationLatitude ||
    !destinationLongitude
  ) {
    return markers.map((marker) => ({ ...marker, time: 0, price: "0.00" }));
  }

  if (!directionsAPI) {
    console.error(
      "Google Directions API key is missing. Check app config or .env setup.",
    );
    return markers.map((marker) => ({ ...marker, time: 0, price: "0.00" }));
  }

  try {
    // Calculate time from user to destination once
    const responseToDestination = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${userLatitude},${userLongitude}&destination=${destinationLatitude},${destinationLongitude}&key=${directionsAPI}`,
    );
    const dataToDestination = await responseToDestination.json();
    const timeToDestination = getRouteDuration(dataToDestination); // Time in seconds

    const timesPromises = markers.map(async (marker) => {
      try {
        const responseToUser = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${marker.latitude},${marker.longitude}&destination=${userLatitude},${userLongitude}&key=${directionsAPI}`,
        );
        const dataToUser = await responseToUser.json();
        const timeToUser = getRouteDuration(dataToUser); // Time in seconds

        const totalTime = (timeToUser + timeToDestination) / 60; // Total time in minutes
        const price = (totalTime * 0.5).toFixed(2); // Calculate price based on time

        return { ...marker, time: totalTime, price };
      } catch (error) {
        console.error(
          `Error calculating time for driver ${marker.id}:`,
          error,
        );
        return { ...marker, time: 0, price: "0.00" };
      }
    });

    return await Promise.all(timesPromises);
  } catch (error) {
    console.error("Error calculating driver times:", error);
    return markers.map((marker) => ({ ...marker, time: 0, price: "0.00" }));
  }
};