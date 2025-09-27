import axiosClient from "../../axiosClient";

const ClientPackageApis = {};

ClientPackageApis.all = async (type, filterParams = {},id) => {
  try {
    // Build query parameters
    const queryParams = new URLSearchParams();

    // Add type parameter
    queryParams.append("type", type);

    if (filterParams.q) {
      queryParams.append("q", filterParams.q);
    }

    // Add filter parameters if they exist
    if (filterParams.duration_start) {
      queryParams.append("duration_start", filterParams.duration_start);
    }
    if (filterParams.duration_end) {
      queryParams.append("duration_end", filterParams.duration_end);
    }
    if (
      filterParams.min_price !== undefined &&
      filterParams.min_price !== null
    ) {
      queryParams.append("min_price", filterParams.min_price);
    }
    if (filterParams.max_price) {
      queryParams.append("max_price", filterParams.max_price);
    }

    if (filterParams.rating) {
      queryParams.append("min_rating", filterParams.rating)
    }

    // ✅ Update for policies (now object: { policyName: true/false })
    if (filterParams.policies && typeof filterParams.policies === "object") {
      Object.entries(filterParams.policies).forEach(([policyName, value]) => {
        queryParams.append(`${policies[policyName]}`, value);
      });
    }

    if (filterParams.destinations?.length) {
      filterParams.destinations.forEach((destination) =>
        queryParams.append("destinations", destination)
      );
    }
    if (filterParams.residences?.length) {
      filterParams.residences.forEach((residence) =>
        queryParams.append("residence_types", residence)
      );
    }
    if (filterParams.mealPlans?.length) {
      filterParams.mealPlans.forEach((mealPlan) =>
        queryParams.append("meal_plans", mealPlan)
      );
    }
    if (filterParams.popularAreas?.length) {
      filterParams.popularAreas.forEach((area) =>
        queryParams.append("area_types", area)
      );
    }
    if (filterParams.searchQuery) {
      queryParams.append("search", filterParams.searchQuery);
    }
    if (filterParams.languages?.length) {
      filterParams.languages.forEach((language) =>
        queryParams.append("languages", language)
      );
    }

    const url = `/api/package?user_id=${id}&${queryParams.toString()}`;

    const res = await axiosClient
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        if (error.response) {
          return {
            errors: error.response.data.errors || null,
            message:
              error.response.data.message ||
              "An error occurred on the server.",
          };
        } else {
          return { message: "An error occurred while fetching packages." };
        }
      });
    return res;
  } catch (error) {
    console.error("Error in ClientPackageApis.all:", error);
    throw error;
  }
};

ClientPackageApis.getOne = async (id) => {
  const url = `/api/package/${id}`;
  const res = await axiosClient
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        return {
          errors: error.response.data.errors || null,
          message:
            error.response.data.message ||
            "An error occurred on the server.",
        };
      } else {
        return { message: "An error occurred while fetching packages." };
      }
    });
  return res;
};

export default ClientPackageApis;
