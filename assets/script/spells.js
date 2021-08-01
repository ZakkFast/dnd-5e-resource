const apiurl = 'https://www.dnd5eapi.co/api/'
$(document).ready(function(){
    function getSpell () {
        $.ajax({
            type: 'GET',
            url: `${apiurl}spells`,
            dataType: 'json',
            success: function(data){
                // console.log(data.results)
                console.log(data.results.length)
                // console.log(data.results[0].index)
                // console.log(data.results[0].name)
                let selectEl = $(`<select></select>`)
                for (i = 0; i < data.results.length; i++){
                   let divContainer = $(`#divDrop`)
                   let optionEl = $(`<option value='${data.results[i].index}'>${data.results[i].name}</option>`)
                   divContainer.append(selectEl)
                   selectEl.append(optionEl)
                }
                $('#divDrop').change(function(){
                    let selectedVal = $(this).find(':selected').val()
                    console.log(selectedVal)
                    $.ajax({
                        type: 'GET',
                        url: `${apiurl}spells/${selectedVal}`,
                        dataType: 'json',
                        success: function(data){
                            console.log(data)
                            $('#contentContainer').html(`
                            <div class="container">
                                <h3>Spell: ${data.name}</h3>
                                <p>Level: ${data.level}</p>
                                <p>School: ${data.school.name}</p>
                                <p>Casting Time: ${data.casting_time}</p>
                                <p>Duration: ${data.duration}
                                <p>Range: ${data.range}</p>
                                <p>Spell Description: ${data.desc[0]}</p>
                            </div>
                            `)
                            if(data.desc.length > 1){
                                $('.container').append(`<p>Spell Effect: ${data.desc[1]}</p>`)
                            }
                        }
                    })
                })
            }
        })
    }
    getSpell()
})
