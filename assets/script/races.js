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
                $('#divDrop').change(function(){
                    let selectedVal = $(this).find(':selected').val()
                    $.ajax({
                        type: 'GET',
                        url: `${apiurl}races/${selectedVal}`,
                        dataType: 'json',
                        success: function(data){
                            console.log(data)
                            $('#contentContainer').html(`
                            <div class='container'>
                                <h3>${data.name}</h3>
                                <p>Size: ${data.size}</p>
                                <p>Age: ${data.age}</p>
                                <p>Speed: ${data.speed}
                                <p>Languages: ${data.language_desc}
                                <p>Alignment: ${data.alignment}</p>
                            </div>
                            `)
                        }
                    })
                })
            }
        })
    }
    getRaces()
})