const apiurl = 'https://www.dnd5eapi.co/api/'
$(document).ready(function(){
    function getRaces () {
        $.ajax({
            type: 'GET',
            url: `${apiurl}races`,
            dataType: 'json',
            success: function(data){
                let selectEl = $(`<select></select>`)
                for (i = 0; i < data.results.length; i++){
                   let divContainer = $(`#divDrop`)
                   let optionEl = $(`<option value='${data.results[i].index}'>${data.results[i].name}</option>`)
                   divContainer.append(selectEl)
                   selectEl.append(optionEl)
                }
            }
        })
    }
    getRaces()
})