// Show sidebar
function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
}

// Hide sidebar
function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
}

// API
const url = "https://json-server-vercel-zeta-seven.vercel.app/db.json";

const statsMap = {
  totalPopulation: {
    headers: [
      "Year",
      "Total Population (Jan 1st)",
      "Total Population (Jul 1st)",
      "Male Population (Jul 1st)",
      "Female Population (Jul 1st)",
      "Average Age (Jul 1st)",
      "Population Growth Percentage",
    ],
    keys: [
      "year",
      "totalpop1jan1k",
      "totalpop1jul1k",
      "mpop1jul1k",
      "fpop1jul1k",
      "avgage1jul",
      "popgrowthpercentage",
    ],
  },
  birthRates: {
    headers: [
      "Year",
      "Births",
      "Birth Rate (per 1k)",
      "Births per Woman",
      "Childbearing Age",
    ],
    keys: ["year", "births", "births1k", "birthsperw", "childbearingage"],
  },
  deathRates: {
    headers: [
      "Year",
      "Total Deaths",
      "Male Deaths",
      "Female Deaths",
      "Death Rate (per 1k)",
      "Mortality before Age 60 (per 1k)",
      "Male Mortality before Age 60 (per 1k)",
      "Female Mortality before Age 60 (per 1k)",
    ],
    keys: [
      "year",
      "totaldeaths",
      "mdeaths",
      "fdeaths",
      "deathrate1k",
      "mortalityage601k",
      "mmortalityage601k",
      "fmortalityage601k",
    ],
  },
  lifeExpectancy: {
    headers: [
      "Year",
      "Life Expectancy",
      "Male Life Expectancy",
      "Female Life Expectancy",
    ],
    keys: ["year", "lifeexp", "mlifeexp", "flifeexp"],
  },
};

const regions = [
  "EUROPE",
  "AFRICA",
  "ASIA",
  "NORTHERN AMERICA",
  "OCEANIA",
  "LATIN AMERICA AND THE CARIBBEAN",
];

function showStats(statType, tableId) {
  const selectedRegion = document.getElementById("regionSelect").value;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const regionData = data.filter(
        (item) => item.countryname === selectedRegion
      );
      if (regionData.length > 0 && statsMap[statType]) {
        const { headers, keys } = statsMap[statType];
        const rows = regionData
          .map((entry) => {
            return `
                        <tr>
                        ${keys
                          .map((key, index) => {
                            if (
                              key === "year" ||
                              key === "birthsperw" ||
                              key === "births1k" ||
                              key === "deathrate1k" ||
                              key === "popgrowthpercentage"
                            ) {
                              return `<td data-header="${headers[index]}">${entry[key]}</td>`;
                            } else if (
                              key.includes("pop") ||
                              key.includes("births") ||
                              key.includes("death")
                            ) {
                              const population = parseFloat(
                                entry[key]
                                  .trim()
                                  .replace(/\s/g, "")
                                  .replace(/,/g, "")
                              );
                              return `<td data-header="${headers[index]}">${(
                                population * 1000
                              ).toLocaleString()}</td>`;
                            } else {
                              const value = entry[key].trim();
                              const numericValue = parseFloat(
                                value.replace(/\s/g, "").replace(/,/g, "")
                              );
                              return `<td data-header="${headers[index]}">${
                                !isNaN(numericValue)
                                  ? numericValue.toLocaleString()
                                  : value
                              }</td>`;
                            }
                          })
                          .join("")}
                        </tr>
                    `;
          })
          .join("");
        document.querySelector(`#${tableId} .tableHeaders`).innerHTML = headers
          .map((header) => `<th>${header}</th>`)
          .join("");
        document.querySelector(`#${tableId} .tableRows`).innerHTML = rows;
        document.getElementById(tableId).style.display = "block"; // Show the table
      }
    })
    .catch((error) => console.error(error));
}
showStats("totalPopulation", "totalPopulationTable");

document.querySelectorAll(".clickable").forEach((item) => {
  item.addEventListener("click", (event) => {
    // Hide all tables
    document.querySelectorAll(".table").forEach((table) => {
      table.style.display = "none";
    });

    const span = event.target;
    const [statTypeParam, tableId] = span.getAttribute("onclick").split(",");

    // Show the clicked table
    showStats(statTypeParam, tableId);
  });
});
