/**
 * getDegreeInfo function fetches web server to pull degree information that is being hosted.
 * @returns promise data from fetch request
 */
async function getDegreeInfo() {

    // url variable of where the JSON file is being hosted on via Glitch
    let url = ('https://met-cs601-hw5-farmer.glitch.me/json/my_degrees.json');

    try {
        // call fetch on the url and await the return of the promise and store it in a 
        // response variable
        let response = await fetch(url);

        // log the status code of the response
        console.log('status code: ', response.status);

        // check to see if the status code is valid - should be 200-299
        // if repsonse is not valid then log to console and throw an error
        if (!response.ok) {
            console.log(response);
            // response has an invalid status to fetch data from
            throw new Error(`Error! status: ${response.status}`);
          }
        else {
            // else if the status is ok then return the promise using 
            // response.json()
            return await response.json();
        }
    }
    // catch any other errors that might occur and log to console
    catch (error) {
        console.log(error);
    }
}

/**
 * loadDegreeInfo function calls getDegreeInfo to grab JSON data from web server and 
 * manipulates the DOM to insert into the table on the page.
 */
async function loadDegreeInfo() {

    // create degrees variable and call getDegreeInfo() function
    // to fetch JSON data from server
    let degrees = await getDegreeInfo();
    // create an empty string variable that will hold html code
    let html = '';
    // re-enable button if the page has been refreshed so it can be used again
    document.getElementById("button").enabled = true;

    // call degrees variable and loop through each item inside of it
    degrees.forEach(degree => {

        // pull the school, program name, program type, and year conferred
        // data from degrees and insert into the table format for html
        let degreeHTML = `<tr>
                            <td>${degree.school}</td>
                            <td>${degree.programName}</td>
                            <td>${degree.programType}</td>
                            <td>${degree.yearConferred}</td>
                          </tr>`;
        html += degreeHTML;
    });

    // grab the current table and add each degree data to it
    let table = document.getElementById("degree_table");
    table.innerHTML += html;
    // disable button so the table cannot be added to over and over
    // once the data is loaded the first time
    document.getElementById("button").disabled = true;
}