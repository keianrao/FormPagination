/* copyright

FormPagination - Test Cordova app with three pages around a form
Written in 2024 by Keian Rao <keian.rao@gmail.com>

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

copyright */

//  ---%-@-%---

function getProjects()
{
    let json = window.sessionStorage.getItem("projects");
    return json == null ? [] : JSON.parse(json);
}

function addProjectVersion(projectName, semanticVersion)
{
    let projects = getProjects();
    
    let nameMatches = p => p.name == projectName;
    let existingProject = projects.find(nameMatches);
    let alreadyListsVersion =
        existingProject
        && existingProject.versions.includes(semanticVersion);

    if (existingProject && alreadyListsVersion)
    {
        return "That version for that project is already recorded.";
    }
    else if (existingProject)
    {
        existingProject.versions.push(semanticVersion);
    }
    else
    {
        projects.push({
            "name": projectName,
            "versions": [
                semanticVersion
            ]
        });
    }
    
    let json = JSON.stringify(projects);
    window.sessionStorage.setItem("projects", json);
}