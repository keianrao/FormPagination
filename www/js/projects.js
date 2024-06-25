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
    + "(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?$");
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
        existingProject.versions.sort(semanticVersionComparator);
    }
    else
    {
        projects.push({
            "name": projectName,
            "versions": [ semanticVersion ]
        });
    }
    
    let json = JSON.stringify(projects);
    window.sessionStorage.setItem("projects", json);
}

function semanticVersionComparator(a, b)
{
    function convertGroups(groups)
    {
        groups[1] = parseInt(groups[1]);
        groups[2] = parseInt(groups[2]);
        groups[3] = parseInt(groups[3]);
        // Leave the remaining groups be.
    }    
    let aGroups = isSemanticVersion(a);
    let bGroups = isSemanticVersion(b);
    convertGroups(aGroups);
    convertGroups(bGroups);

    let majorDiff = aGroups[1] - bGroups[1];
    let minorDiff = aGroups[2] - bGroups[2];
    let patchDiff = aGroups[3] - bGroups[3];
    if (majorDiff) return majorDiff;
    if (minorDiff) return minorDiff;
    if (patchDiff) return patchDiff;

    /*
    * If all are identical then we're supposed to lexically
    * compare the pre-release version or build metadata.
    * But I'm not sure how to do that given our capture
    * group situation (I wanted to substring past the primary
    * version string). So I'll just consider them equal in
    * this app.
    */
    return 0;
}

function isValidProjectName(string)
{
    return string.match(ENGLISH_ALNUM);
}

function isSemanticVersion(string)
{
    return string.match(SEMVER_REGEX);
}
