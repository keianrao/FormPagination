/* copyright

This file is part of FormPagination.
Written in 2024 by Keian Rao <keian.rao@gmail.com>

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

copyright */

projectNameField = document.getElementById("projname");
versionField = document.getElementById("semver");
submitStatus = document.getElementById("submitStatus");
form = document.getElementsByTagName("form")[0];
fieldset = document.getElementsByTagName("fieldset")[0];

form.addEventListener("submit", attemptSubmit);

function attemptSubmit()
{
    submitError.setAttribute("hidden", null)
    form.removeAttribute("class");
    fieldset.setAttribute("disabled", null);
    
    let projectName = projectNameField.value;
    let semanticVersion = versionField.value;

    let error = addProjectVersion(projectName, semanticVersion);
    if (error)
    {
        submitError.innerText = error;
        submitError.removeAttribute("hidden");
        form.setAttribute("class", "error");
        fieldset.removeAttribute("disabled");
    }
    else
    {
        let params = new URLSearchParams();
        params.set("result", "success");
        params.set("projname", projectName);
        params.set("semver", semanticVersion);

        let dest = "index.html?" + params.toString();
        window.location.assign(dest);
    }
}