/* copyright

This file is part of FormPagination.
Written in 2024 by Keian Rao <keian.rao@gmail.com>

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

copyright */

const SEMVER_REGEX = new RegExp(
    "^(0|[1-9]\\d*)"
    + "\.(0|[1-9]\\d*)"
    + "\.(0|[1-9]\\d*)"
    + "(?:-"
    + "("
    + "(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)"
    + "(?:\\.(?:0|[1-9]\\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*"
    + ")"
    + ")?"
    + "(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?$", "g");
    // From Semantic Versioning spec.

const ENGLISH_ALNUM = /^\w[\w\-]*$/;

//  ---%-@-%---

function getProjects()
{
    let json = window.sessionStorage.getItem("projects");
    return json == null ? [] : JSON.parse(json);
}

function addProjectVersion(projectName, semanticVersion)
{
    if (!isValidProjectName(projectName))
        return "Project name is not valid.";
    if (!isSemanticVersion(semanticVersion))
        return "Given version is not a valid semantic version.";

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

function isValidProjectName(string)
{
    return string.match(ENGLISH_ALNUM) != null;
}

function isSemanticVersion(string)
{    
    let captureGroups = string.match(SEMVER_REGEX);
    return captureGroups != null;
}
