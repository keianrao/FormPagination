/* copyright

This file is part of FormPagination.
Written in 2024 by Keian Rao <keian.rao@gmail.com>

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

copyright */

var titlebar;

function onPageLoad()
{
    titlebar = document.getElementById("titlebar");
    
    titlebar.innerText = document.title;
}

window.addEventListener('load', onPageLoad);
/*
* Is it actually safe to use the same function name across
* multiple imported scripts like this? Since we add the event
* listener immediately it seems even if the function statement
* just overrides it'll work out.
*/