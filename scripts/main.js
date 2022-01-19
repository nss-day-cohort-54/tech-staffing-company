/*
    1. See if any candidates have the skills that each employer needs
    2. If there are, create a new data structure that stores the primary
        key of the employer, and an array of matching candidates
    3. Display each company name, the name of the matching candidates
        a message if the company can fill their needs
*/

// Get the data
import { getCandidates, getCompanies } from "./database.js";

const companies = getCompanies()
const candidates = getCandidates()

// Initialize an array of company candidates
const companiesWithMatchingCandidates = []

// Iterate the array of company objects
for (const company of companies) {

    // Create an object that stores company id and empty
    // array for candidates
    const companyMatch = {
        companyId: company.id,
        matchingCandidates: []
    }

    // Within above loop, iterate candidate objects array
    for (const candidate of candidates) {
        // If statement checking to see if company skill needed
        // equals the candidate skill
        if (company.skillNeeded === candidate.skill) {
            // If true, add to array of matches created above
            companyMatch.matchingCandidates.push(candidate)
        }
    }

    // Add companyMatch to companiesWithMatchingCandidates array
    companiesWithMatchingCandidates.push(companyMatch)
}

// Iterate company object array
let templateString = ""
for (const company of companies) {

    // Iterate company candidates array
    for (const matches of companiesWithMatchingCandidates) {

        // If companyId matches company id
        if (company.id === matches.companyId) {
            // If true, print company name
            templateString += `<h2>${company.company}</h2>`
            // Iterate array of matching candidates
            templateString += "<h3>Candidates</h3>"

            let listTemplate = "<ol>"
            for (const candidate of matches.matchingCandidates) {
                listTemplate += `<li>${candidate.first_name} ${candidate.last_name}</li>`
            }
            listTemplate += "</ol>"

            templateString += listTemplate
            /*
                Check if length of matching candidates array is
                greater than or equal to the engineersNeeded
                property on the company object

                If true, display "can staff" message
                Else display "cannot staff" message
            */
            if (matches.matchingCandidates.length >= company.engineersNeeded) {
                templateString += "We are able to fulfill your staffing needs"
            }
            else {
                templateString += "We are unable to fulfill your staffing needs"
            }
        }
    }
}

// Put it in the inner HTML
const matchingNodes = document.querySelectorAll(".container")

.innerHTML += templateString