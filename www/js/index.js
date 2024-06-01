/* copyright

FormPagination - Test Cordova app with three pages around a form
Written in 2024 by Keian Rao <keian.rao@gmail.com>

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

copyright */

var loadStatus, projectsBox, headerBox, actionsBox;

//  ---%-@-%---

function displayStatus(text, type = null, override = false)
{
    if (loadStatus.getAttribute("class") == "error")
        if (!override) return;
    
    loadStatus.innerText = text;
    loadStatus.setAttribute("class", type);
}

function renderProjects()
{
    displayStatus("Reading from client-side database...");
    let projects = getProjects();
    
    if (projects.length == 0)
    {
        displayStatus("First time on page - no projects exist.");
        return;
    }

    displayStatus("Listing projects...");
    for (let project of projects)
    {
        let nameHeader = document.createElement("h3");
        nameHeader.setAttribute("class", "projname");
        let nameText = document.createTextNode(project.name);
        nameHeader.appendChild(nameText);

        let versionsBox = document.createElement("div");
        versionsBox.setAttribute("class", "versions");
        for (let version of project.versions)
        {
            let versionItem = document.createElement("div");
            versionItem.setAttribute("class", "version");
            let versionText = document.createTextNode(version);
            versionItem.appendChild(versionText);
            versionsBox.appendChild(versionItem);
        }
        
        projectsBox.appendChild(nameHeader);
        projectsBox.appendChild(versionsBox);
    }
    displayStatus(projects.length + " projects found.");
}

function addProjectVersionFromParams(queryString)
{
    let params = new URLSearchParams(queryString);
    
    displayStatus("Adding project...");
    let error = addProjectVersion(
        params.get("projname"), params.get("semver"));
    if (error) displayStatus(error, "error");
}

//  ---%-@-%---

function onCordovaDeviceReady()
{
    console.log(
        'Running cordova-' + cordova.platformId
        + '@' + cordova.version + ".");
}

function onPageLoad()
{
    loadStatus = document.getElementById("loadStatus");
    projectsBox = document.getElementById("projects");
    //headerBox = document.getElementById("header");
    //actionsBox = document.getElementById("actions");

    if (window.location.search)
        addProjectVersionFromParams(window.location.search);
    
    renderProjects();
}

document.addEventListener('deviceready', onCordovaDeviceReady, false);
window.addEventListener('load', onPageLoad);
