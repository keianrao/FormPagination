/* copyright

FormPagination - Test Cordova app with three pages around a form
Written in 2024 by Keian Rao <keian.rao@gmail.com>

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

copyright */

const loadStatus = document.getElementById("loadStatus");
const projectsBox = document.getElementsByTagName("main")[0];

//  ---%-@-%---

function getProjects()
{
    let json = window.sessionStorage.getItem("projects");
    return json == null ? [] : JSON.parse(json);
}

function addProject(project)
{
    let projects = getProjects();
    projects.push(project);
    
    let json = JSON.stringify(projects);
    window.sessionStorage.setItem("projects", json);
}

function renderProjects()
{
    loadStatus.innerText = "Reading from client-side database...";
    let projects = getProjects();
    
    if (projects.length == 0)
    {
        loadStatus.innerText = "First time on page - no projects exist.";
        return;
    }

    loadStatus.innerText = "Listing projects...";
    for (let project of projects)
    {
        let nameHeader = document.createElement("h3");
        let nameText = document.createTextNode(project.name);
        nameHeader.appendChild(nameText);

        let versionsBox = document.createElement("div");
        versionsBox.setAttribute("class", "versions");
        for (let version of project.versions)
        {
            let versionItem = document.createElement("version");
            let versionText = document.createTextNode(version);
            versionItem.appendChild(versionText);
            versionsBox.appendChild(versionItem);
        }
        
        projectsBox.appendChild(nameHeader);
        projectsBox.appendChild(versionsBox);
    }
    loadStatus.innerText = projects.length + " projects found.";
}

function addProjectFromParams(queryString)
{
    let params = new URLSearchParams(queryString);
    
    loadStatus.innerText = "Adding project...";
    addProject({
        "name": params.get("projname"),
        "versions": [ params.get("semver") ]
    });
}

//  ---%-@-%---

function onCordovaDeviceReady()
{
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version + ".");
}

function onPageLoad()
{
    if (window.location.search)
        addProjectFromParams(window.location.search);
    
    renderProjects();
}

document.addEventListener('deviceready', onCordovaDeviceReady, false);
window.addEventListener('load', onPageLoad);
