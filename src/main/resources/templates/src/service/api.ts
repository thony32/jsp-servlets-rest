// First, import Axios to make HTTP requests
import axios from "axios"

// Define the base URL for your Spring Boot backend API
const API_BASE_URL = "http://localhost:8081/api"

// Create an Axios instance configured for your API
const api = axios.create({
    baseURL: API_BASE_URL,
})

// This object will contain all the functions to interact with your API
const employeeApiService = {
    // Fetch all employees from the backend
    getAllEmployees: async () => {
        // Makes a GET request to /api/employees to retrieve all employees
        return api.get("/employees")
    },

    // Get a single employee by their unique ID
    getEmployeeById: async (id: number) => {
        // Makes a GET request to /api/employees/{id} to find an employee by ID
        return api.get(`/employees/${id}`)
    },

    // searchEmployees: async ({ codeEmployee, lastName, firstName }: Employee) => {
    //     return api.get('/search', {
    //         params: { codeEmployee, lastName, firstName },
    //     });
    // },

    // Create a new employee
    createEmployee: async (employeeData: any) => {
        // Makes a POST request to /api/employees to create a new employee
        // The employee data is sent in the request body
        return api.post("/employees", employeeData)
    },

    // Update an existing employee
    updateEmployee: async (id: number, employeeData: any) => {
        // Makes a PUT request to /api/employees/{id} to update an employee
        // The updated employee data is sent in the request body
        return api.put(`/employees/${id}`, employeeData)
    },

    // Delete an employee by their ID
    deleteEmployee: async (id: number) => {
        // Makes a DELETE request to /api/employees/{id} to remove an employee
        return api.delete(`/employees/${id}`)
    },
}

const placeApiService = {
    // Fetch all places from the backend
    getAllPlaces: async () => {
        // Makes a GET request to /api/places to retrieve all places
        return api.get("/places")
    },

    // Get a single place by its unique ID
    getPlaceById: async (id: number) => {
        // Makes a GET request to /api/places/{id} to find a place by ID
        return api.get(`/places/${id}`)
    },

    // Create a new place
    createPlace: async (placeData: any) => {
        // Makes a POST request to /api/places to create a new place
        // The place data is sent in the request body
        return api.post("/places", placeData)
    },

    // Update an existing place
    updatePlace: async (id: number, placeData: any) => {
        // Makes a PUT request to /api/places/{id} to update a place
        // The updated place data is sent in the request body
        return api.put(`/places/${id}`, placeData)
    },

    // Delete a place by its ID
    deletePlace: async (id: number) => {
        // Makes a DELETE request to /api/places/{id} to remove a place
        return api.delete(`/places/${id}`)
    },
}

const affectApiService = {
    // Fetch all affects from the backend
    getAllAffects: async () => {
        // Makes a GET request to /api/affects to retrieve all affects
        return api.get("/affects")
    },

    // Get a single affect by its unique ID
    getAffectById: async (id: number) => {
        // Makes a GET request to /api/affects/{id} to find an affect by ID
        return api.get(`/affects/${id}`)
    },

    // Create a new affect
    createAffect: async (affectData: any) => {
        // Makes a POST request to /api/affects to create a new affect
        // The affect data is sent in the request body
        return api.post("/affects", affectData)
    },

    // Update an existing affect
    updateAffect: async (id: number, affectData: any) => {
        // Makes a PUT request to /api/affects/{id} to update an affect
        // The updated affect data is sent in the request body
        return api.put(`/affects/${id}`, affectData)
    },

    // Delete an affect by its ID
    deleteAffect: async (id: number) => {
        // Makes a DELETE request to /api/affects/{id} to remove an affect
        return api.delete(`/affects/${id}`)
    },
}

// Export the service so it can be imported and used in your React components
export { employeeApiService, placeApiService, affectApiService }
