import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { FaEdit } from "react-icons/fa";
import { LuTrash2 } from "react-icons/lu";
import Swal from "sweetalert2";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../Components/ui/select";
import { UserServices } from "~/userServices/user.services";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TablePagination,
} from "@mui/material";
import { getAllCountries } from "countries-and-timezones";

const useCountryData = () => {
  return useMemo(() => {
    const countriesData = getAllCountries();
    const countries = Object.values(countriesData)
      .map((country) => ({
        id: country.id,
        name: country.name,
        alpha2: country.id,
      }))
      .filter((country) => country.name && country.name.trim() !== "");

    return { countries };
  }, []);
};

export default function PackagePlaces() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editServiceId, setEditServiceId] = useState(null);
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    type: "meetingPoint",
    name: "",
    description: "",
    country: "",
    city: "",
    address: "",
  });

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { countries: allCountries } = useCountryData();
  const [cities, setCities] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [loadingCities, setLoadingCities] = useState(false);

  // Fetch services
  const fetchPlaces = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/place`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setServices(response.data?.data || []);
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : err.message || "Something went wrong";

      setError(errorMessage);
      Swal.fire("Error", errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  // Fetch cities from Geonames API
  const fetchCitiesForCountry = async (countryCode, countryName) => {
    setLoadingCities(true);
    try {
      // Using Geonames API (free tier)
      const response = await axios.get(`http://api.geonames.org/searchJSON`, {
        params: {
          country: countryCode,
          featureClass: "P", // Populated places
          maxRows: 1000, // Maximum allowed by free tier
          username: "mirazh661",
        },
      });

      if (response.data && response.data.geonames) {
        const cityNames = response.data.geonames
          .map((city) => city.name)
          .filter((city) => city && city.trim() !== "")
          .sort();

        setCities(cityNames);
      } else {
        setCities([]);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
      // Fallback: Use a local dataset or show manual input
      setCities([]);
      Swal.fire(
        "Info",
        `Could not load cities for ${countryName}. Please enter the city manually.`,
        "info"
      );
    } finally {
      setLoadingCities(false);
    }
  };

  // Handle country change to fetch cities
  const handleCountryChange = async (countryName) => {
    setFormData((prev) => ({ ...prev, country: countryName, city: "" }));

    // Find the country code from the country name
    const country = allCountries.find((c) => c.name === countryName);
    if (country) {
      setSelectedCountryCode(country.id);
      await fetchCitiesForCountry(country.id, countryName);
    } else {
      setCities([]);
      setSelectedCountryCode("");
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editServiceId) {
        await UserServices.updatePackagePlaces(editServiceId, formData);
        Swal.fire("Success", "Place updated successfully", "success");
      } else {
        await UserServices.createPackagePlaces(formData);
        Swal.fire("Success", "Place created successfully", "success");
      }

      setFormData({
        latitude: "",
        longitude: "",
        type: "meetingPoint",
        name: "",
        description: "",
        country: "",
        city: "",
        address: "",
      });

      setEditServiceId(null);
      setCities([]);
      setSelectedCountryCode("");
      fetchPlaces();
    } catch (err) {
      await Swal.fire("Error", err.message, "error");
    }
  };

  // Handle edit
  const handleEdit = async (service) => {
    setEditServiceId(service.id);
    setFormData({
      latitude: service.latitude,
      longitude: service.longitude,
      type: service.type,
      name: service.name || "",
      description: service.description || "",
      country: service.country || "",
      city: service.city || "",
      address: service.address || "",
    });

    // When editing, try to load cities for the selected country
    if (service.country) {
      await handleCountryChange(service.country);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle delete
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await UserServices.deletePackagePlace(id);
      Swal.fire("Deleted", "Place has been deleted", "success");
      fetchPlaces();
      setPage(0);
    } catch (err) {
      await Swal.fire("Error", err.message, "error");
    }
  };

  const handleCancelEdit = () => {
    setEditServiceId(null);
    setFormData({
      latitude: "",
      longitude: "",
      type: "meetingPoint",
      name: "",
      description: "",
      country: "",
      city: "",
      address: "",
    });
    setCities([]);
    setSelectedCountryCode("");
  };

  return (
    <div className="p-6">
      <Helmet>
        <title>Around 360 - Package Places</title>
      </Helmet>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg mb-6 shadow-md"
      >
        <h3 className="text-2xl font-semibold mb-4">
          {editServiceId ? "Edit Place" : "Add New Place"}
        </h3>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border rounded outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-2 border rounded outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Country</label>
            <Select
              value={formData.country}
              onValueChange={handleCountryChange}
            >
              <SelectTrigger className="py-5">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                {allCountries.map((country) => (
                  <SelectItem key={country.id} value={country.name}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block mb-1">City</label>
            {loadingCities ? (
              <div className="w-full p-2 border rounded bg-gray-100">
                <div className="flex items-center">
                  <CircularProgress size={16} className="mr-2" />
                  Loading cities...
                </div>
              </div>
            ) : (
              <Select
                value={formData.city}
                onValueChange={(value) =>
                  setFormData({ ...formData, city: value })
                }
                disabled={!formData.country || cities.length === 0}
              >
                <SelectTrigger className="py-5">
                  <SelectValue
                    placeholder={
                      !formData.country
                        ? "Select country first"
                        : cities.length === 0
                        ? "No cities available"
                        : "Select City"
                    }
                  />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                  {cities.length > 0 ? (
                    cities.map((city, index) => (
                      <SelectItem key={index} value={city}>
                        {city}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="px-2 py-1.5 text-sm text-gray-500">
                      {formData.country
                        ? "No cities found or enter manually"
                        : "Please select a country first"}
                    </div>
                  )}
                </SelectContent>
              </Select>
            )}
          </div>

          <div>
            <label className="block mb-1">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full p-2 border rounded outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Type</label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full px-2 py-3 border rounded"
              required
            >
              <option value="meetingPoint">Meeting Point</option>
              <option value="pickupPoint">Pickup Point</option>
              <option value="endPoint">End Point</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Latitude</label>
            <input
              type="text"
              value={formData.latitude}
              onChange={(e) =>
                setFormData({ ...formData, latitude: e.target.value })
              }
              className="w-full p-2 border rounded outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Longitude</label>
            <input
              type="text"
              value={formData.longitude}
              onChange={(e) =>
                setFormData({ ...formData, longitude: e.target.value })
              }
              className="w-full p-2 border rounded outline-none"
              required
            />
          </div>
        </div>

        <div className="flex gap-2">
          {editServiceId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {editServiceId ? "Update" : "Save"}
          </button>
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-[#080613] mb-4">
          Package Places
        </h3>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <CircularProgress />
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>Error: {error}</p>
            <button
              onClick={fetchPlaces}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        ) : services.length === 0 ? (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            <p>No places found. Add your first place above.</p>
          </div>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Country</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Coordinates</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {services
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((service) => (
                      <TableRow key={service.id}>
                        <TableCell>{service.name}</TableCell>
                        <TableCell>{service.description}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {service.type}
                          </span>
                        </TableCell>
                        <TableCell>{service.country}</TableCell>
                        <TableCell>{service.city}</TableCell>
                        <TableCell>{service.address}</TableCell>
                        <TableCell>
                          {service.latitude && service.longitude
                            ? `${parseFloat(service.latitude).toFixed(
                                4
                              )}, ${parseFloat(service.longitude).toFixed(4)}`
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          <div className="flex">
                            <button
                              type="button"
                              className="text-blue-500 text-lg hover:text-blue-700"
                              onClick={() => handleEdit(service)}
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              type="button"
                              className="text-red-600 hover:text-red-700 transform duration-300 ml-4"
                              onClick={() => handleDelete(service.id)}
                              title="Delete"
                            >
                              <LuTrash2 className="text-lg" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={services.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
